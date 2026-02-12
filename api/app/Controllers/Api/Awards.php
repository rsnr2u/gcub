<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Awards extends ResourceController
{
    protected $modelName = 'App\Models\AwardModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('created_at', 'DESC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Award not found');
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
            // Save to BACKEND public folder
            $file->move(FCPATH . 'uploads/awards', $newName);
            $data['image_path'] = 'uploads/awards/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update_item($id = null)
    {
        $data = $this->request->getPost();

        // Handle Image Upload (Optional)
        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            // Save to BACKEND public folder
            $file->move(FCPATH . 'uploads/awards', $newName);
            $data['image_path'] = 'uploads/awards/' . $newName;
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
