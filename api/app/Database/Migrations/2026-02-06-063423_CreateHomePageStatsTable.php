<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateHomePageStatsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'label' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
            ],
            'value' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
            ],
            'display_order' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('home_page_stats');

        // Seed default statistics
        $db = \Config\Database::connect();
        $stats = [
            ['label' => 'YEARS', 'value' => '75+', 'display_order' => 1],
            ['label' => 'BRANCHES', 'value' => '22', 'display_order' => 2],
            ['label' => 'BUSINESS', 'value' => '₹1000Cr+', 'display_order' => 3],
            ['label' => 'CUSTOMERS', 'value' => '50k+', 'display_order' => 4],
        ];

        foreach ($stats as $stat) {
            $stat['created_at'] = date('Y-m-d H:i:s');
            $stat['updated_at'] = date('Y-m-d H:i:s');
            $db->table('home_page_stats')->insert($stat);
        }
    }

    public function down()
    {
        $this->forge->dropTable('home_page_stats');
    }
}
