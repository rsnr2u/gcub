<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class HolidaysContent extends ResourceController
{
    protected $modelName = 'App\Models\HolidaysContentModel';
    protected $format = 'json';

    public function index()
    {
        // Always return the single record (ID = 1)
        $data = $this->model->first();
        if (!$data) {
            return $this->failNotFound('Content not found');
        }
        return $this->respond($data);
    }

    public function update()
    {
        $data = $this->request->getJSON(true);

        // Always update the first record
        $existing = $this->model->first();
        if (!$existing) {
            return $this->failNotFound('Content not found');
        }

        if ($this->model->update($existing['id'], $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($this->model->errors());
    }
}
