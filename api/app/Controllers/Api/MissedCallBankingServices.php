<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class MissedCallBankingServices extends ResourceController
{
    protected $modelName = 'App\Models\MissedCallBankingServiceModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

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
