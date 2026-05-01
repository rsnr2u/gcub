<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UpdateMobileBankingTable extends Migration
{
    public function up()
    {
        $fields = [
            'hero_breadcrumb_text' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'after' => 'hero_title'
            ],
            'intro_heading' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'after' => 'hero_description'
            ],
            'highlights_json' => [
                'type' => 'LONGTEXT',
                'after' => 'intro_description'
            ],
            'helpbox_json' => [
                'type' => 'LONGTEXT',
                'after' => 'sidebar_tips_json'
            ],
            'download_section_json' => [
                'type' => 'LONGTEXT',
                'after' => 'app_store_url'
            ],
            'section_visibility_json' => [
                'type' => 'LONGTEXT',
                'after' => 'helpdesk_phone'
            ],
        ];
        $this->forge->addColumn('svc_mobile_banking', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('svc_mobile_banking', [
            'hero_breadcrumb_text',
            'intro_heading',
            'highlights_json',
            'helpbox_json',
            'download_section_json',
            'section_visibility_json'
        ]);
    }
}
