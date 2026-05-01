<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ExpandNeftRtgsFields extends Migration
{
    public function up()
    {
        // Check if table exists, if not create it
        if (!$this->db->tableExists('svc_neft_rtgs')) {
            $this->forge->addField([
                'id' => [
                    'type'           => 'INT',
                    'constraint'     => 11,
                    'unsigned'       => true,
                    'auto_increment' => true,
                ],
                'slug' => [
                    'type'       => 'VARCHAR',
                    'constraint' => 100,
                    'unique'     => true,
                ],
                'meta_title' => [
                    'type'       => 'VARCHAR',
                    'constraint' => 255,
                    'null'       => true,
                ],
                'meta_description' => [
                    'type'       => 'TEXT',
                    'null'       => true,
                ],
                'meta_keywords' => [
                    'type'       => 'TEXT',
                    'null'       => true,
                ],
                'hero_title' => [
                    'type'       => 'VARCHAR',
                    'constraint' => 255,
                    'null'       => true,
                ],
                'hero_description' => [
                    'type'       => 'TEXT',
                    'null'       => true,
                ],
                'neft_info' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'neft_note' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'rtgs_info' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'rtgs_note' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'comparison_json' => [
                    'type' => 'JSON',
                    'null' => true,
                ],
                'req_info_description' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'req_info_json' => [
                    'type' => 'JSON',
                    'null' => true,
                ],
                'sidebar_links_json' => [
                    'type' => 'JSON',
                    'null' => true,
                ],
                'sidebar_ifsc_text' => [
                    'type' => 'TEXT',
                    'null' => true,
                ],
                'updated_at' => [
                    'type' => 'DATETIME',
                    'null' => true,
                ],
                'created_at' => [
                    'type' => 'DATETIME',
                    'null' => true,
                ],
            ]);
            $this->forge->addKey('id', true);
            $this->forge->createTable('svc_neft_rtgs');
        } else {
            // Table exists, add missing fields
            $fields = [
                'neft_note' => [
                    'type' => 'TEXT',
                    'null' => true,
                    'after' => 'neft_info'
                ],
                'rtgs_note' => [
                    'type' => 'TEXT',
                    'null' => true,
                    'after' => 'rtgs_info'
                ],
                'req_info_description' => [
                    'type' => 'TEXT',
                    'null' => true,
                    'after' => 'comparison_json'
                ],
            ];
            
            // Add fields if they don't exist
            foreach ($fields as $fieldName => $fieldConfig) {
                if (!$this->db->fieldExists($fieldName, 'svc_neft_rtgs')) {
                    $this->forge->addColumn('svc_neft_rtgs', [$fieldName => $fieldConfig]);
                }
            }
        }
    }

    public function down()
    {
        // Not dropping table to avoid data loss
    }
}
