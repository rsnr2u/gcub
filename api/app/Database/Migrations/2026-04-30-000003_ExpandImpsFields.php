<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ExpandImpsFields extends Migration
{
    public function up()
    {
        $fields = [
            'assistance_box_json' => ['type' => 'LONGTEXT', 'null' => true, 'after' => 'sidebar_links_json'],
            'downloads_box_json' => ['type' => 'LONGTEXT', 'null' => true, 'after' => 'assistance_box_json'],
        ];
        $this->forge->addColumn('svc_imps', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('svc_imps', 'assistance_box_json');
        $this->forge->dropColumn('svc_imps', 'downloads_box_json');
    }
}
