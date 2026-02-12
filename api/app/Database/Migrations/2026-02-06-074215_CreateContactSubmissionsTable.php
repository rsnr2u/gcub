<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateContactSubmissionsTable extends Migration
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
            'request_type' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'full_name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
                'null' => true,
            ],
            'subject' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'message' => [
                'type' => 'TEXT',
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['new', 'in_progress', 'resolved'],
                'default' => 'new',
            ],
            'admin_notes' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'submitted_at' => [
                'type' => 'DATETIME',
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('contact_submissions');
    }

    public function down()
    {
        $this->forge->dropTable('contact_submissions');
    }
}
