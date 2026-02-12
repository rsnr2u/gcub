<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMissedCallBankingContentTable extends Migration
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
            'header_title' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'header_description' => [
                'type' => 'TEXT',
            ],
            'note_text' => [
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
        $this->forge->createTable('missed_call_banking_content');

        // Seed initial data
        $db = \Config\Database::connect();
        $db->table('missed_call_banking_content')->insert([
            'header_title' => 'How it works?',
            'header_description' => 'Register your mobile number with your branch. Give a missed call to the designated numbers from your registered mobile number to get instant SMS alerts.',
            'note_text' => 'Note: Regular SMS charges may apply depending on your mobile network provider for the confirmation SMS received. This service is available 24x7.',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }

    public function down()
    {
        $this->forge->dropTable('missed_call_banking_content');
    }
}
