<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateQuickAccessItemsTable extends Migration
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
            'icon' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'link' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'sort_order' => [
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
        $this->forge->createTable('quick_access_items');

        // Seed default quick access items
        $db = \Config\Database::connect();
        $items = [
            ['title' => 'Net Banking', 'icon' => 'fas fa-laptop-code', 'link' => '/net-banking', 'sort_order' => 1, 'is_active' => 1],
            ['title' => 'Gold Loan', 'icon' => 'fas fa-coins', 'link' => '/gold-loans', 'sort_order' => 2, 'is_active' => 1],
            ['title' => 'Housing Loan', 'icon' => 'fas fa-house-chimney', 'link' => '/housing-loans', 'sort_order' => 3, 'is_active' => 1],
            ['title' => 'Education Loan', 'icon' => 'fas fa-graduation-cap', 'link' => '/education-loans', 'sort_order' => 4, 'is_active' => 1],
            ['title' => 'Safe Lockers', 'icon' => 'fas fa-vault', 'link' => '/safe-lockers', 'sort_order' => 5, 'is_active' => 1],
            ['title' => 'Fixed Deposit', 'icon' => 'fas fa-piggy-bank', 'link' => '/fixed-deposits', 'sort_order' => 6, 'is_active' => 1],
            ['title' => 'Recurring Deposit', 'icon' => 'fas fa-clock', 'link' => '/recurring-deposits', 'sort_order' => 7, 'is_active' => 1],
            ['title' => 'IMPS', 'icon' => 'fas fa-bolt', 'link' => '/imps', 'sort_order' => 8, 'is_active' => 1],
            ['title' => 'UPI Payments', 'icon' => 'fas fa-qrcode', 'link' => '/upi', 'sort_order' => 9, 'is_active' => 1],
        ];

        foreach ($items as $item) {
            $item['created_at'] = date('Y-m-d H:i:s');
            $item['updated_at'] = date('Y-m-d H:i:s');
            $db->table('quick_access_items')->insert($item);
        }
    }

    public function down()
    {
        $this->forge->dropTable('quick_access_items');
    }
}
