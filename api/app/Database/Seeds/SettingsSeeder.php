<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'setting_key' => 'domain_name',
                'setting_value' => 'http://localhost:3000',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_enabled',
                'setting_value' => 'off',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_title',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_subtitle',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_description',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_image',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_cta_text',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'popup_cta_link',
                'setting_value' => '',
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        foreach ($data as $setting) {
            $exists = $this->db->table('site_settings')->where('setting_key', $setting['setting_key'])->countAllResults();
            if ($exists === 0) {
                echo "Inserting key: " . $setting['setting_key'] . "\n";
                $this->db->table('site_settings')->insert($setting);
            } else {
                echo "Key already exists: " . $setting['setting_key'] . "\n";
            }
        }
    }
}
