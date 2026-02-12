<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMissedCallBankingServicesTable extends Migration
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
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'description' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'phone_number' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
            ],
            'display_order' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'is_active' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 1,
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
        $this->forge->createTable('missed_call_banking_services');

        // Seed default services
        $db = \Config\Database::connect();
        $services = [
            ['title' => 'Balance Inquiry', 'description' => 'Check your account balance instantly.', 'phone_number' => '09223009999', 'display_order' => 1],
            ['title' => 'Mini Statement', 'description' => 'Get last 5 transactions via SMS.', 'phone_number' => '09223009998', 'display_order' => 2],
            ['title' => 'Block Debit Card', 'description' => 'Lost your card? Block it immediately.', 'phone_number' => '09223009997', 'display_order' => 3],
        ];

        foreach ($services as $service) {
            $service['created_at'] = date('Y-m-d H:i:s');
            $service['updated_at'] = date('Y-m-d H:i:s');
            $db->table('missed_call_banking_services')->insert($service);
        }
    }

    public function down()
    {
        $this->forge->dropTable('missed_call_banking_services');
    }
}
