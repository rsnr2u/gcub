<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTokenToUsers extends Migration
{
    public function up()
    {
        $fields = [
            'auth_token' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
                'after' => 'password'
            ],
            'token_expiry' => [
                'type' => 'DATETIME',
                'null' => true,
                'after' => 'auth_token'
            ],
        ];
        $this->forge->addColumn('users', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('users', ['auth_token', 'token_expiry']);
    }
}
