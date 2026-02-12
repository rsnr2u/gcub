<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Holidays extends ResourceController
{
    protected $modelName = 'App\Models\HolidayModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('holiday_date', 'ASC')->findAll());
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
