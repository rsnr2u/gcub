<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddMissingSettings extends Migration
{
    public function up()
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
            // Check if key exists first to avoid duplicates if migration is re-run (though CI handles it)
            $exists = $this->db->table('site_settings')->where('setting_key', $setting['setting_key'])->countAllResults();
            if ($exists === 0) {
                $this->db->table('site_settings')->insert($setting);
            }
        }
    }

    public function down()
    {
        $keys = [
            'domain_name',
            'popup_enabled',
            'popup_title',
            'popup_subtitle',
            'popup_description',
            'popup_image',
            'popup_cta_text',
            'popup_cta_link'
        ];

        $this->db->table('site_settings')->whereIn('setting_key', $keys)->delete();
    }
}
