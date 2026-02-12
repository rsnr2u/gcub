<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\InterestRatesModel;

class InterestRates extends ResourceController
{
    protected $modelName = 'App\Models\InterestRatesModel';
    protected $format = 'json';

    public function index()
    {
        $tables = $this->model->orderBy('order_index', 'ASC')->findAll();

        // Return decoded JSON for frontend convenience if needed, 
        // but it's usually better to just pass the raw JSON string if it's already structured correctly.
        // Let's decode columns and rows for transparency.
        foreach ($tables as &$table) {
            $table['columns'] = json_decode($table['columns'], true) ?? [];
            $table['rows'] = json_decode($table['rows'], true) ?? [];
        }

        return $this->respond($tables);
    }

    public function show($id = null)
    {
        $table = $this->model->find($id);
        if (!$table) {
            return $this->failNotFound('Table not found');
        }

        $table['columns'] = json_decode($table['columns'], true) ?? [];
        $table['rows'] = json_decode($table['rows'], true) ?? [];

        return $this->respond($table);
    }

    public function create()
    {
        $data = [
            'title' => $this->request->getVar('title'),
            'accent_color' => $this->request->getVar('accent_color') ?? 'blue',
            'columns' => $this->request->getVar('columns'), // Expected JSON string
            'rows' => $this->request->getVar('rows'),    // Expected JSON string
            'order_index' => $this->request->getVar('order_index') ?? 0,
            'status' => $this->request->getVar('status') ?? 'active'
        ];

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }

        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $table = $this->model->find($id);
        if (!$table) {
            return $this->failNotFound('Table not found');
        }

        $data = $this->request->getRawInput();

        // Handle FormData-like structure if needed, but usually getRawInput is for JSON/PUT.
        // CodeIgniter 4 request var works for both POST and PUT if configured.
        $updateData = [];
        if ($this->request->getVar('title'))
            $updateData['title'] = $this->request->getVar('title');
        if ($this->request->getVar('accent_color'))
            $updateData['accent_color'] = $this->request->getVar('accent_color');
        if ($this->request->getVar('columns'))
            $updateData['columns'] = $this->request->getVar('columns');
        if ($this->request->getVar('rows'))
            $updateData['rows'] = $this->request->getVar('rows');
        if ($this->request->getVar('order_index'))
            $updateData['order_index'] = $this->request->getVar('order_index');
        if ($this->request->getVar('status'))
            $updateData['status'] = $this->request->getVar('status');

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
