<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Ombudsman extends ResourceController
{
    protected $modelName = 'App\Models\OmbudsmanModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('created_at', 'DESC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Item not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->fail('No valid JSON data received.', 400);
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->fail('No valid JSON data received.', 400);
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
