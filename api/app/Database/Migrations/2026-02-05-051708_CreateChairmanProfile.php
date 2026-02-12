<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateChairmanProfile extends Migration
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
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'designation' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'education' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'tenure_start' => [
                'type' => 'DATE',
                'null' => true,
            ],
            'experience' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'image_path' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'message' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'achievement_branches' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'achievement_growth' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive', 'draft'],
                'default' => 'draft',
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
        $this->forge->createTable('chairman_profile');
    }

    public function down()
    {
        $this->forge->dropTable('chairman_profile');
    }
}
