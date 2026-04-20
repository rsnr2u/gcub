<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddOrderToBranches extends Migration
{
    public function up()
    {
        $fields = [
            'display_order' => [
                'type'       => 'INT',
                'constraint' => 11,
                'default'    => 0,
                'null'       => false,
            ],
        ];
        $this->forge->addColumn('branches', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('branches', 'display_order');
    }
}
