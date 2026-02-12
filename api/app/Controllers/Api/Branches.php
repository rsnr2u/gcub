<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BranchModel;

class Branches extends ResourceController
{
    protected $modelName = 'App\Models\BranchModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('is_head_office', 'DESC')->orderBy('name', 'ASC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Branch not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = [
            'name' => $this->request->getVar('name'),
            'region' => $this->request->getVar('region'),
            'ifsc' => $this->request->getVar('ifsc'),
            'micr' => $this->request->getVar('micr'),
            'contact' => $this->request->getVar('contact'),
            'email' => $this->request->getVar('email'),
            'address' => $this->request->getVar('address'),
            'google_maps_link' => $this->request->getVar('google_maps_link'),
            'status' => $this->request->getVar('status') ?? 'active',
            'is_head_office' => $this->request->getVar('is_head_office') ?? 0,
        ];

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();

        // Handle FormData-like structure or JSON
        $updateData = [];
        $fields = ['name', 'region', 'ifsc', 'micr', 'contact', 'email', 'address', 'google_maps_link', 'status', 'is_head_office'];

        foreach ($fields as $field) {
            if ($this->request->getVar($field) !== null) {
                $updateData[$field] = $this->request->getVar($field);
            }
        }

        if (empty($updateData)) {
            $updateData = $data;
        }

        if ($this->model->update($id, $updateData)) {
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
