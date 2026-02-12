<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Highlights extends ResourceController
{
    protected $modelName = 'App\Models\HighlightModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->orderBy('created_at', 'DESC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Highlight not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getPost();

        // Handle boolean conversion
        if (isset($data['is_active'])) {
            $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update_item($id = null)
    {
        $data = $this->request->getPost();

        // Handle boolean conversion
        if (isset($data['is_active'])) {
            $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
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
