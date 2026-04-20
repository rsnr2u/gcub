<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSignaturePathToChairmanProfile extends Migration
{
    public function up()
    {
        $this->forge->addColumn('chairman_profile', [
            'signature_path' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
                'after' => 'image_path'
            ],
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('chairman_profile', 'signature_path');
    }
}
