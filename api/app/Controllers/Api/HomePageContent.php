<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class HomePageContent extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new \App\Models\HomePageContentModel();
    }

    public function index()
    {
        // Always return the single record (ID = 1)
        $data = $this->model->first();
        if (!$data) {
            return $this->failNotFound('Content not found');
        }
        return $this->respond($data);
    }

    public function update($id = null)
    {
        $contentType = $this->request->getHeaderLine('Content-Type');
        if (strpos($contentType, 'application/json') !== false) {
            $data = $this->request->getJSON(true);
        } else {
            $data = $this->request->getPost();
        }

        if (empty($data)) {
            return $this->fail('No data received');
        }

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
