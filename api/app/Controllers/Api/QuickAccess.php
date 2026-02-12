<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class QuickAccess extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new \App\Models\QuickAccessModel();
    }


    /**
     * Get all items (admin) or active items (public)
     */
    public function index()
    {
        // If request has 'admin' parameter, return all items
        $isAdmin = $this->request->getGet('admin') === 'true';

        if ($isAdmin) {
            $items = $this->model->getAllOrdered();
        } else {
            $items = $this->model->getActiveItems();
        }

        return $this->respond($items);
    }

    /**
     * Get single item
     */
    public function show($id = null)
    {
        $item = $this->model->find($id);

        if (!$item) {
            return $this->failNotFound('Item not found');
        }

        return $this->respond($item);
    }

    /**
     * Create new item
     */
    public function create()
    {
        $contentType = $this->request->getHeaderLine('Content-Type');
        $data = strpos($contentType, 'application/json') !== false
            ? $this->request->getJSON(true)
            : $this->request->getPost();

        if (empty($data)) {
            return $this->fail('No data received');
        }

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respondCreated([
            'status' => 'success',
            'message' => 'Quick access item created successfully',
            'id' => $this->model->getInsertID()
        ]);
    }

    /**
     * Update item
     */
    public function update($id = null)
    {
        $item = $this->model->find($id);

        if (!$item) {
            return $this->failNotFound('Item not found');
        }

        $contentType = $this->request->getHeaderLine('Content-Type');
        $data = strpos($contentType, 'application/json') !== false
            ? $this->request->getJSON(true)
            : $this->request->getPost();

        if (empty($data)) {
            return $this->fail('No data received');
        }

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Quick access item updated successfully'
        ]);
    }

    /**
     * Delete item
     */
    public function delete($id = null)
    {
        $item = $this->model->find($id);

        if (!$item) {
            return $this->failNotFound('Item not found');
        }

        if (!$this->model->delete($id)) {
            return $this->fail('Failed to delete item');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Quick access item deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleStatus($id = null)
    {
        $item = $this->model->find($id);

        if (!$item) {
            return $this->failNotFound('Item not found');
        }

        $newStatus = $item['is_active'] ? 0 : 1;

        if (!$this->model->update($id, ['is_active' => $newStatus])) {
            return $this->fail('Failed to update status');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Status updated successfully',
            'is_active' => $newStatus
        ]);
    }

    /**
     * Reorder items
     */
    public function reorder()
    {
        $contentType = $this->request->getHeaderLine('Content-Type');
        $data = strpos($contentType, 'application/json') !== false
            ? $this->request->getJSON(true)
            : $this->request->getPost();

        if (empty($data) || !isset($data['items']) || !is_array($data['items'])) {
            return $this->fail('Invalid data format or no data received');
        }

        $db = \Config\Database::connect();
        $db->transStart();

        foreach ($data['items'] as $item) {
            if (isset($item['id']) && isset($item['sort_order'])) {
                $this->model->update($item['id'], ['sort_order' => $item['sort_order']]);
            }
        }

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->fail('Failed to reorder items');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Items reordered successfully'
        ]);
    }
}
