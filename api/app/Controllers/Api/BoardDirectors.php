<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class BoardDirectors extends ResourceController
{
    protected $modelName = 'App\Models\BoardDirectorModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Director not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getPost();

        // Handle Image Upload
        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/directors', $newName);
            $data['image_path'] = 'uploads/directors/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        // Note: For file uploads with PUT/PATCH, CodeIgniter sometimes has issues with getRawInput if not spoofed.
        // Usually, we use POST with _method=PUT for files, or just separate route.
        // But for simplicity in this project's pattern, if it's a FormData POST update, we might route to a specific update method or handle it as POST.

        // However, looking at other controllers (AdminChairman), they use POST for updates specifically to handle files easier.
        // Let's check AdminChairman pattern again.
        // It uses `api/chairman/update/${editingId}` with POST.
        // So I will align with that pattern and use a custom `update_post` method or just use `create` logic but with update.

        // Actually, ResourceController maps `update` to PUT/PATCH. 
        // I will implement a separate method `updatePost` for POST updates to handle files easily, 
        // or just rely on the fact that CI4 request->getFile() works with POST.
        // I'll stick to the standard `update` method but I might need to adjust routes if I want to use POST for updates.
        // Re-reading AdminChairman.jsx: 
        // const url = editingId ? `http://localhost:8080/api/chairman/update/${editingId}` : ...
        // It uses a specific endpoint for update.

        // I will create a specific `updateData` method to handle POST updates with files.

        return $this->fail('Use updatePost for file support');
    }

    // Custom update method to handle FormData with files (POST request)
    public function update_item($id = null)
    {
        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/directors', $newName);
            $data['image_path'] = 'uploads/directors/' . $newName;
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }

        return $this->fail($this->model->errors());
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 'success']);
        }
        return $this->fail('Delete failed');
    }
}
