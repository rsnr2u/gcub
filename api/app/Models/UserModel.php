<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['name', 'email', 'password', 'role_id', 'is_active', 'last_login', 'auth_token', 'token_expiry'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[100]',
        'email' => 'required|valid_email|is_unique[users.email,id,{id}]',
        'password' => 'permit_empty|min_length[6]',
        'role_id' => 'required|integer',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    protected $beforeInsert = ['hashPassword'];
    protected $beforeUpdate = ['hashPassword'];

    protected function hashPassword(array $data)
    {
        if (isset($data['data']['password']) && !empty($data['data']['password'])) {
            $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT);
        } else {
            unset($data['data']['password']);
        }
        return $data;
    }

    // Get user with role information
    public function getUserWithRole($userId)
    {
        $user = $this->select('users.*, roles.name as role_name, roles.description as role_description')
            ->join('roles', 'roles.id = users.role_id')
            ->find($userId);

        return $user;
    }

    // Get all users with role information
    public function getAllWithRoles()
    {
        return $this->select('users.*, roles.name as role_name')
            ->join('roles', 'roles.id = users.role_id')
            ->orderBy('users.created_at', 'DESC')
            ->findAll();
    }
}
