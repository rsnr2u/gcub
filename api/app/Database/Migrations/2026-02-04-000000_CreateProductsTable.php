<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateProductsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'name' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'slug' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'unique'     => true,
            ],
            'category' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'hero_description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'long_description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'features' => [
                'type' => 'JSON',
                'null' => true,
            ],
            'eligibility' => [
                'type' => 'JSON',
                'null' => true,
            ],
            'documents' => [
                'type' => 'JSON',
                'null' => true,
            ],
            'icon_type' => [
                'type'       => 'VARCHAR',
                'constraint' => '50',
                'null'      => true,
            ],
            'icon_value' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'      => true,
            ],
            'image_path' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'      => true,
            ],
            'status' => [
                'type'       => 'TINYINT',
                'constraint' => 1,
                'default'    => 1,
            ],
            'terms_heading' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'      => true,
            ],
            'terms_content' => [
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
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('products');
    }

    public function down()
    {
        $this->forge->dropTable('products');
    }
}
