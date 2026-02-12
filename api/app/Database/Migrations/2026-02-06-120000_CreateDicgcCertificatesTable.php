<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateDicgcCertificatesTable extends Migration
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
                'constraint' => '255',
                'null' => true,
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'file_path' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
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
        $this->forge->createTable('dicgc_certificates');
    }

    public function down()
    {
        $this->forge->dropTable('dicgc_certificates');
    }
}
