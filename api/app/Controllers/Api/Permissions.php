<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Permissions extends ResourceController
{
    protected $modelName = 'App\Models\PermissionModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function grouped()
    {
        return $this->respond($this->model->getGroupedByModule());
    }

    public function getByRole($roleId = null)
    {
        $db = \Config\Database::connect();
        $permissions = $db->table('role_permissions')
            ->select('permissions.*')
            ->join('permissions', 'permissions.id = role_permissions.permission_id')
            ->where('role_permissions.role_id', $roleId)
            ->get()
            ->getResultArray();

        return $this->respond($permissions);
    }
}
