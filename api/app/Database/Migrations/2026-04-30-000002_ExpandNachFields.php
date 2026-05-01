<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ExpandNachFields extends Migration
{
    public function up()
    {
        $fields = [
            'mandate_form_json' => ['type' => 'LONGTEXT', 'null' => true, 'after' => 'sidebar_mandate_text'],
        ];
        $this->forge->addColumn('svc_nach', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('svc_nach', 'mandate_form_json');
    }
}
