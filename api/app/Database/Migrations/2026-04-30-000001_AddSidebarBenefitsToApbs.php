<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSidebarBenefitsToApbs extends Migration
{
    public function up()
    {
        $fields = [
            'sidebar_benefits_json' => ['type' => 'LONGTEXT', 'null' => true, 'after' => 'sidebar_dbt_text'],
        ];
        $this->forge->addColumn('svc_apbs', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('svc_apbs', 'sidebar_benefits_json');
    }
}
