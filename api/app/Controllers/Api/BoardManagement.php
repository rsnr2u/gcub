<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class BoardManagement extends ResourceController
{
    protected $modelName = 'App\Models\BoardManagementModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Member not found');
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
            $file->move(FCPATH . 'uploads/management', $newName);
            $data['image_path'] = 'uploads/management/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        return $this->fail('Use updatePost for file support');
    }

    // Custom update method to handle FormData with files (POST request)
    public function update_item($id = null)
    {
        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/management', $newName);
            $data['image_path'] = 'uploads/management/' . $newName;
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
