<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateDeafAccountsTable extends Migration
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
            'full_name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'account_number' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
            ],
            'urn_number' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
            ],
            'account_type' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
            ],
            'branch_name' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'status' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'default' => 'Identified for DEAF',
            ],
            'remarks' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('deaf_accounts');
    }

    public function down()
    {
        $this->forge->dropTable('deaf_accounts');
    }
}
