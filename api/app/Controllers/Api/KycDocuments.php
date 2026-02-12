<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class KycDocuments extends ResourceController
{
    protected $modelName = 'App\Models\KycDocumentModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('category, display_order', 'ASC')->findAll());
    }

    public function getByCategory($category = null)
    {
        if (!in_array($category, ['identity', 'address', 'company'])) {
            return $this->fail('Invalid category');
        }

        $data = $this->model->where('category', $category)->orderBy('display_order', 'ASC')->findAll();
        return $this->respond($data);
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
