<?php

namespace App\Models;

use CodeIgniter\Model;

class SettingsModel extends Model
{
    protected $table = 'site_settings';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['setting_key', 'setting_value'];

    protected $useTimestamps = true;
    protected $createdField = '';
    protected $updatedField = 'updated_at';

    public function getAllSettings()
    {
        $settings = $this->findAll();
        $formatted = [];
        foreach ($settings as $setting) {
            $formatted[$setting['setting_key']] = $setting['setting_value'];
        }
        return $formatted;
    }

    public function updateSettings($data)
    {
        foreach ($data as $key => $value) {
            $this->where('setting_key', $key)->set(['setting_value' => $value])->update();
        }
        return true;
    }
}
