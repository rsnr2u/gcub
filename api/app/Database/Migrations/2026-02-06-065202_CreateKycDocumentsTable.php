<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateKycDocumentsTable extends Migration
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
                'type' => 'ENUM',
                'constraint' => ['identity', 'address', 'company'],
            ],
            'document_name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
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
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('kyc_documents');

        // Seed default documents
        $db = \Config\Database::connect();

        // Identity documents
        $identityDocs = [
            'PAN Card',
            'Aadhaar Card',
            'Voter ID Card',
            'Driving License',
            'Passport',
            'Identity Card issued by Govt/PSU',
        ];

        foreach ($identityDocs as $index => $doc) {
            $db->table('kyc_documents')->insert([
                'category' => 'identity',
                'document_name' => $doc,
                'display_order' => $index + 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        // Address documents
        $addressDocs = [
            'Aadhaar Card',
            'Voter ID Card',
            'Driving License',
            'Passport',
            'Utility Bill (Electricity/Water/Gas) - not more than 3 months old',
            'Property Tax Bill',
        ];

        foreach ($addressDocs as $index => $doc) {
            $db->table('kyc_documents')->insert([
                'category' => 'address',
                'document_name' => $doc,
                'display_order' => $index + 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        // Company documents
        $companyDocs = [
            'Registration Certificate',
            'Partnership Deed (for firms)',
            'Memorandum & Articles of Association (for companies)',
            'Resolution of Board of Directors',
            'PAN Card of the Company/Firm',
        ];

        foreach ($companyDocs as $index => $doc) {
            $db->table('kyc_documents')->insert([
                'category' => 'company',
                'document_name' => $doc,
                'display_order' => $index + 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }

    public function down()
    {
        $this->forge->dropTable('kyc_documents');
    }
}
