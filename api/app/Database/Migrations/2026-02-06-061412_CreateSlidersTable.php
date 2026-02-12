<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSlidersTable extends Migration
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
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'button_name' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
            ],
            'button_link' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'image_path' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
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
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('sliders');
    }

    public function down()
    {
        $this->forge->dropTable('sliders');
    }
}
