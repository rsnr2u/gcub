<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class FinancialIndicators extends ResourceController
{
    protected $modelName = 'App\Models\FinancialIndicatorModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Indicator not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getPost(); // Allows simple JSON or FormData

        // Handle boolean conversion if coming from FormData string
        if (isset($data['is_positive_growth'])) {
            $data['is_positive_growth'] = filter_var($data['is_positive_growth'], FILTER_VALIDATE_BOOLEAN);
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        // For simple data updates, getRawInput works fine for JSON/PUT
        // But if using FormData to POST to update endpoint:
        // We often use POST for updates in this project.
        // Let's create an explicit `update_item` to match other controllers pattern if needed, 
        // or just rely on standard update call.

        $data = $this->request->getRawInput();

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($this->model->errors());
    }

    // POST Update support
    public function update_item($id = null)
    {
        $data = $this->request->getPost();
        if (isset($data['is_positive_growth'])) {
            $data['is_positive_growth'] = filter_var($data['is_positive_growth'], FILTER_VALIDATE_BOOLEAN);
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
