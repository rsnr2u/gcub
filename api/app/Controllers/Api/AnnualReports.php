<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class AnnualReports extends ResourceController
{
    protected $modelName = 'App\Models\AnnualReportModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('year', 'DESC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Report not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getPost();

        // Handle File Upload
        $file = $this->request->getFile('file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/reports', $newName);
            $data['file_path'] = 'uploads/reports/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }

        return $this->fail($this->model->errors());
    }

    public function update_item($id = null)
    {
        $data = $this->request->getPost();

        // Handle File Upload (Optional during update)
        $file = $this->request->getFile('file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/reports', $newName);
            $data['file_path'] = 'uploads/reports/' . $newName;
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
