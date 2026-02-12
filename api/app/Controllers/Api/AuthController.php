<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class AuthController extends BaseController
{
    use ResponseTrait;

    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function login()
    {
        $json = $this->request->getJSON(true);
        $email = $json['email'] ?? '';
        $password = $json['password'] ?? '';

        if (empty($email) || empty($password)) {
            return $this->fail('Email and password are required', 400);
        }

        $user = $this->userModel->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid credentials');
        }

        if (!$user['is_active']) {
            return $this->failForbidden('Account is deactivated');
        }

        // Generate token
        $token = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', strtotime('+24 hours'));

        // Update user with token
        $this->userModel->update($user['id'], [
            'auth_token' => $token,
            'token_expiry' => $expiry,
            'last_login' => date('Y-m-d H:i:s')
        ]);

        unset($user['password']);
        $user['auth_token'] = $token;
        $user['token_expiry'] = $expiry;

        return $this->respond([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => $user
        ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        if (preg_match('/Bearer\s+(.*)$/i', $token, $matches)) {
            $token = $matches[1];
            $user = $this->userModel->where('auth_token', $token)->first();
            if ($user) {
                $this->userModel->update($user['id'], [
                    'auth_token' => null,
                    'token_expiry' => null
                ]);
            }
        }

        return $this->respond(['status' => 'success', 'message' => 'Logged out successfully']);
    }
}
