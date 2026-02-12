<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Users extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->getAllWithRoles());
    }

    public function show($id = null)
    {
        $user = $this->model->getUserWithRole($id);
        if (!$user) {
            return $this->failNotFound('User not found');
        }

        // Remove password from response
        unset($user['password']);
        return $this->respond($user);
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

        // If password is empty, remove it from update
        if (isset($data['password']) && empty($data['password'])) {
            unset($data['password']);
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($this->model->errors());
    }

    public function delete($id = null)
    {
        // Prevent deleting yourself (would need session check)
        // Prevent deleting the default admin
        $user = $this->model->find($id);
        if ($user && $user['email'] === 'admin@gcub.com') {
            return $this->fail('Cannot delete default administrator');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 'success']);
        }
        return $this->fail('Delete failed');
    }

    public function toggleStatus($id = null)
    {
        $user = $this->model->find($id);
        if (!$user) {
            return $this->failNotFound('User not found');
        }

        // Prevent deactivating default admin
        if ($user['email'] === 'admin@gcub.com') {
            return $this->fail('Cannot deactivate default administrator');
        }

        $newStatus = $user['is_active'] ? 0 : 1;
        if ($this->model->update($id, ['is_active' => $newStatus])) {
            return $this->respond(['status' => 'success', 'is_active' => $newStatus]);
        }
        return $this->fail('Update failed');
    }
}
