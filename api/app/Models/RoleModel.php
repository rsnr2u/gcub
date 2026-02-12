<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['name', 'description', 'is_active'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[50]|is_unique[roles.name,id,{id}]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Get role with permissions
    public function getRoleWithPermissions($roleId)
    {
        $role = $this->find($roleId);
        if (!$role) {
            return null;
        }

        $db = \Config\Database::connect();
        $permissions = $db->table('role_permissions')
            ->select('permissions.*')
            ->join('permissions', 'permissions.id = role_permissions.permission_id')
            ->where('role_permissions.role_id', $roleId)
            ->get()
            ->getResultArray();

        $role['permissions'] = $permissions;
        return $role;
    }
}
