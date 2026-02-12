<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class DeafAccounts extends ResourceController
{
    protected $modelName = 'App\Models\DeafAccountModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('created_at', 'DESC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Account list not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true); // Expect JSON input
        log_message('error', 'DeafAccounts create hit with data: ' . json_encode($data));

        if (!$data) {
            return $this->fail('No valid JSON data received. Content-Type must be application/json', 400);
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        log_message('error', 'DeafAccounts update hit for ID ' . $id . ' with data: ' . json_encode($data));

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
