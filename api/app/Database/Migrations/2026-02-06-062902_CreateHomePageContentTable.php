<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateHomePageContentTable extends Migration
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
            'section_title' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'main_heading' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'description' => [
                'type' => 'TEXT',
            ],
            'cta_button_text' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'cta_button_link' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'stat_years' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
                'null' => true,
            ],
            'stat_branches' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
                'null' => true,
            ],
            'stat_business' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
                'null' => true,
            ],
            'stat_customers' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
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
        $this->forge->createTable('home_page_content');

        // Seed initial data
        $db = \Config\Database::connect();
        $db->table('home_page_content')->insert([
            'section_title' => 'OUR LEGACY',
            'main_heading' => 'Welcome to The Guntur Co-operative Urban Bank Ltd.',
            'description' => 'We are a premier co-operative bank in Andhra Pradesh, synonymous with trust and service excellence since 1947. From humble beginnings as a consumers co-operative society to a modern urban bank, our journey is defined by our commitment to our customers.',
            'cta_button_text' => 'Read Our Story',
            'cta_button_link' => '/about-us',
            'stat_years' => '75+',
            'stat_branches' => '22',
            'stat_business' => '₹1000Cr+',
            'stat_customers' => '50k+',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }

    public function down()
    {
        $this->forge->dropTable('home_page_content');
    }
}
