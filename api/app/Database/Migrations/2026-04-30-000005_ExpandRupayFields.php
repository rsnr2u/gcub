<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ExpandRupayFields extends Migration
{
    public function up()
    {
        $fields = [
            'hero_breadcrumb_text' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'       => true,
                'after'      => 'hero_description'
            ],
            'intro_heading' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'       => true,
                'after'      => 'intro_title'
            ],
            'highlights_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'safety_tips_json'
            ],
            'sidebar_tips_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'sidebar_links_json'
            ],
            'assistance_box_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'sidebar_tips_json'
            ],
            'downloads_box_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'assistance_box_json'
            ],
            'sidebar_promo_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'downloads_box_json'
            ],
            'section_visibility_json' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'sidebar_promo_json'
            ]
        ];

        $this->forge->addColumn('svc_rupay', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('svc_rupay', [
            'hero_breadcrumb_text', 'intro_heading', 'highlights_json', 
            'sidebar_tips_json', 'assistance_box_json', 'downloads_box_json', 
            'sidebar_promo_json', 'section_visibility_json'
        ]);
    }
}
