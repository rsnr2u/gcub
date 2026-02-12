<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateBoardDirectorsTable extends Migration
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
            'tagline' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'bio' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'image_path' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'display_order' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive', 'draft'],
                'default' => 'draft',
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
        $this->forge->createTable('board_directors');
    }

    public function down()
    {
        $this->forge->dropTable('board_directors');
    }
}
