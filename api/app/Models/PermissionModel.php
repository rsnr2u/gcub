<?php

namespace App\Models;

use CodeIgniter\Model;

class PermissionModel extends Model
{
    protected $table = 'permissions';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['name', 'module', 'description'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'name' => 'required|max_length[50]|is_unique[permissions.name,id,{id}]',
        'module' => 'required|max_length[50]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Get permissions grouped by module
    public function getGroupedByModule()
    {
        $permissions = $this->findAll();
        $grouped = [];

        foreach ($permissions as $perm) {
            $module = $perm['module'];
            if (!isset($grouped[$module])) {
                $grouped[$module] = [];
            }
            $grouped[$module][] = $perm;
        }

        return $grouped;
    }
}
