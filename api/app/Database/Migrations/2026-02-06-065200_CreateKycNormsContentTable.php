<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateKycNormsContentTable extends Migration
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
            'header_subtitle' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'companies_title' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
            ],
            'companies_subtitle' => [
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
        $this->forge->createTable('kyc_norms_content');

        // Seed initial data
        $db = \Config\Database::connect();
        $db->table('kyc_norms_content')->insert([
            'header_title' => 'What is KYC?',
            'header_description' => 'KYC (Know Your Customer) is a process by which banks obtain information about the identity and address of the customers. This process helps to innovative services and prevent money laundering.',
            'header_subtitle' => 'Please submit one document from each of the following lists for account opening:',
            'companies_title' => 'For Companies / Firms',
            'companies_subtitle' => 'Additional documents required:',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }

    public function down()
    {
        $this->forge->dropTable('kyc_norms_content');
    }
}
