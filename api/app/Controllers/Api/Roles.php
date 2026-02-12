<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Roles extends ResourceController
{
    protected $modelName = 'App\Models\RoleModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function show($id = null)
    {
        $role = $this->model->getRoleWithPermissions($id);
        if (!$role) {
            return $this->failNotFound('Role not found');
        }
        return $this->respond($role);
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

        // Prevent updating Super Administrator role
        $role = $this->model->find($id);
        if ($role && $role['name'] === 'Super Administrator') {
            return $this->fail('Cannot modify Super Administrator role');
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($this->model->errors());
    }

    public function delete($id = null)
    {
        // Prevent deleting Super Administrator role
        $role = $this->model->find($id);
        if ($role && $role['name'] === 'Super Administrator') {
            return $this->fail('Cannot delete Super Administrator role');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 'success']);
        }
        return $this->fail('Delete failed');
    }

    // Assign permissions to role
    public function assignPermissions($id = null)
    {
        $data = $this->request->getJSON(true);
        $permissionIds = $data['permission_ids'] ?? [];

        $db = \Config\Database::connect();

        // Delete existing permissions
        $db->table('role_permissions')->where('role_id', $id)->delete();

        // Insert new permissions
        foreach ($permissionIds as $permId) {
            $db->table('role_permissions')->insert([
                'role_id' => $id,
                'permission_id' => $permId,
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }

        return $this->respond(['status' => 'success']);
    }
}
