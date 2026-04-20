<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\SettingsModel;
use CodeIgniter\API\ResponseTrait;

class Admin extends BaseController
{
    use ResponseTrait;

    protected $userModel;
    protected $settingsModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->settingsModel = new SettingsModel();
    }

    // Get Admin Profile
    public function profile($id = null)
    {
        if (!$id) {
            return $this->fail('Admin ID is required', 400);
        }

        $admin = $this->userModel->find($id);
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }

        unset($admin['password']);
        $admin['full_name'] = $admin['name'];
        $admin['username'] = $admin['email'];
        return $this->respond($admin);
    }

    // Update Admin Profile
    public function updateProfile($id = null)
    {
        if (!$id) {
            return $this->fail('Admin ID is required', 400);
        }

        $data = $this->request->getPost();

        if (isset($data['full_name'])) {
            $data['name'] = $data['full_name'];
            unset($data['full_name']);
        }
        if (isset($data['phone'])) {
            unset($data['phone']); // phone not in users table yet
        }

        // Handle Password Update - UserModel handles hashing in beforeUpdate hook
        if (!empty($data['new_password'])) {
            $data['password'] = $data['new_password'];
        }
        unset($data['new_password']);

        if ($this->userModel->update($id, $data)) {
            $updated = $this->userModel->find($id);
            unset($updated['password']);
            $updated['full_name'] = $updated['name'];
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
        try {
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
                    'data' => $data
                ]);
            }
            return $this->fail('Failed to update settings');
        } catch (\Exception $e) {
            return $this->fail('An error occurred: ' . $e->getMessage());
        }
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
