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
        $db = \Config\Database::connect();

        foreach ($data as $key => $value) {
            $builder = $db->table($this->table);
            $exists = $builder->where('setting_key', $key)->get()->getRow();

            if ($exists) {
                $db->table($this->table)->where('setting_key', $key)->update([
                    'setting_value' => $value,
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            } else {
                $db->table($this->table)->insert([
                    'setting_key' => $key,
                    'setting_value' => $value,
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            }
        }
        return true;
    }
}
