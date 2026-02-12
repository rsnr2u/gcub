<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSeoSettings extends Migration
{
    public function up()
    {
        // Insert SEO-related settings
        $data = [
            [
                'setting_key' => 'seo_site_title',
                'setting_value' => 'The Guntur Co-Operative Urban Bank Limited - GCUB',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_meta_description',
                'setting_value' => 'GCUB - A premier co-operative bank in Andhra Pradesh since 1947. Offering savings accounts, fixed deposits, gold loans, housing loans, and comprehensive banking services.',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_meta_keywords',
                'setting_value' => 'GCUB, Guntur Co-operative Bank, Urban Bank, Savings Account, Fixed Deposits, Gold Loans, Housing Loans, Andhra Pradesh Bank',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_og_image',
                'setting_value' => '/assets/images/gcublogo.png',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_twitter_handle',
                'setting_value' => '@gcub',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_facebook_url',
                'setting_value' => 'https://www.facebook.com/gcub',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_twitter_url',
                'setting_value' => 'https://twitter.com/gcub',
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'setting_key' => 'seo_linkedin_url',
                'setting_value' => 'https://www.linkedin.com/company/gcub',
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->db->table('site_settings')->insertBatch($data);
    }

    public function down()
    {
        // Remove SEO settings
        $keys = [
            'seo_site_title',
            'seo_meta_description',
            'seo_meta_keywords',
            'seo_og_image',
            'seo_twitter_handle',
            'seo_facebook_url',
            'seo_twitter_url',
            'seo_linkedin_url'
        ];

        $this->db->table('site_settings')->whereIn('setting_key', $keys)->delete();
    }
}
