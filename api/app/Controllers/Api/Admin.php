<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AdminModel;
use App\Models\SettingsModel;
use CodeIgniter\API\ResponseTrait;

class Admin extends BaseController
{
    use ResponseTrait;

    protected $adminModel;
    protected $settingsModel;

    public function __construct()
    {
        $this->adminModel = new AdminModel();
        $this->settingsModel = new SettingsModel();
    }

    // Get Admin Profile
    public function profile($id = null)
    {
        if (!$id) {
            return $this->fail('Admin ID is required', 400);
        }

        $admin = $this->adminModel->find($id);
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }

        unset($admin['password']);
        return $this->respond($admin);
    }

    // Update Admin Profile
    public function updateProfile($id = null)
    {
        if (!$id) {
            return $this->fail('Admin ID is required', 400);
        }

        $data = $this->request->getPost();

        // Handle Password Update
        if (!empty($data['new_password'])) {
            $data['password'] = password_hash($data['new_password'], PASSWORD_DEFAULT);
        }
        unset($data['new_password']);

        if ($this->adminModel->update($id, $data)) {
            $updated = $this->adminModel->find($id);
            unset($updated['password']);
            return $this->respond(['status' => 'success', 'message' => 'Profile updated successfully', 'data' => $updated]);
        }

        return $this->fail('Failed to update profile');
    }

    // Get Site Settings
    public function settings()
    {
        $settings = $this->settingsModel->getAllSettings();
        return $this->respond($settings);
    }

    // Update Site Settings
    public function updateSettings()
    {
        $data = $this->request->getPost();

        // Handle File Uploads
        if ($files = $this->request->getFiles()) {
            foreach ($files as $key => $file) {
                if ($file->isValid() && !$file->hasMoved()) {
                    $newName = $file->getRandomName();
                    // Ensure the directory exists
                    $uploadPath = FCPATH . 'assets/uploads';
                    if (!is_dir($uploadPath)) {
                        mkdir($uploadPath, 0777, true);
                    }
                    $file->move($uploadPath, $newName);
                    // Store the relative path in the database
                    $data[$key] = '/assets/uploads/' . $newName;
                }
            }
        }

        if ($this->settingsModel->updateSettings($data)) {
            return $this->respond([
                'status' => 'success',
                'message' => 'Settings updated successfully',
                'data' => $data // Option for frontend to update state with new paths
            ]);
        }
        return $this->fail('Failed to update settings');
    }

    // Get Dashboard Stats
    public function dashboardStats()
    {
        $db = \Config\Database::connect();
        $stats = [
            'total_admins' => $db->table('users')->countAllResults(),
            'news_updates' => $db->table('news')->countAllResults(),
            'branches' => $db->table('branches')->countAllResults(),
            'products' => $db->table('products')->countAllResults(),
            'submissions' => $db->table('contact_submissions')->countAllResults(),
        ];
        return $this->respond($stats);
    }
}
