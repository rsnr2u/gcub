<?php

namespace App\Models;

use CodeIgniter\Model;

class AdminModel extends Model
{
    protected $table = 'admin_users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['username', 'password', 'full_name', 'email', 'phone', 'profile_pic'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = ''; // We don't have updated_at in admin_users yet, but created_at is there.

    public function login($username, $password)
    {
        $user = $this->where('username', $username)->first();
        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            return $user;
        }
        return false;
    }
}
