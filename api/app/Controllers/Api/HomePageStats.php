<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class HomePageStats extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new \App\Models\HomePageStatModel();
    }

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function create()
    {
        $contentType = $this->request->getHeaderLine('Content-Type');
        $data = strpos($contentType, 'application/json') !== false
            ? $this->request->getJSON(true)
            : $this->request->getPost();

        if (empty($data)) {
            return $this->fail('No data received');
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $contentType = $this->request->getHeaderLine('Content-Type');
        $data = strpos($contentType, 'application/json') !== false
            ? $this->request->getJSON(true)
            : $this->request->getPost();

        if (empty($data)) {
            return $this->fail('No data received');
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
