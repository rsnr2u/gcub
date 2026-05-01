<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSchemesToProducts extends Migration
{
    public function up()
    {
        $fields = [
            'schemes' => [
                'type' => 'JSON',
                'null' => true,
                'after' => 'terms_content'
            ],
        ];
        $this->forge->addColumn('products', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('products', 'schemes');
    }
}
