<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePermissionsTable extends Migration
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
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'unique' => true,
            ],
            'module' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
            ],
            'description' => [
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
        $this->forge->createTable('permissions');

        // Seed default permissions
        $db = \Config\Database::connect();
        $permissions = [
            // Users Module
            ['name' => 'manage_users', 'module' => 'Users', 'description' => 'Create, edit, and delete users'],
            ['name' => 'view_users', 'module' => 'Users', 'description' => 'View user list'],
            ['name' => 'manage_roles', 'module' => 'Users', 'description' => 'Manage roles and permissions'],

            // Content Module
            ['name' => 'manage_content', 'module' => 'Content', 'description' => 'Create and edit all content'],
            ['name' => 'view_content', 'module' => 'Content', 'description' => 'View content'],
            ['name' => 'delete_content', 'module' => 'Content', 'description' => 'Delete content'],

            // Products Module
            ['name' => 'manage_products', 'module' => 'Products', 'description' => 'Manage products and services'],
            ['name' => 'view_products', 'module' => 'Products', 'description' => 'View products'],

            // Settings Module
            ['name' => 'manage_settings', 'module' => 'Settings', 'description' => 'Edit system settings'],
            ['name' => 'view_settings', 'module' => 'Settings', 'description' => 'View settings'],

            // Reports Module
            ['name' => 'view_reports', 'module' => 'Reports', 'description' => 'View reports and analytics'],
        ];

        foreach ($permissions as $permission) {
            $permission['created_at'] = date('Y-m-d H:i:s');
            $permission['updated_at'] = date('Y-m-d H:i:s');
            $db->table('permissions')->insert($permission);
        }
    }

    public function down()
    {
        $this->forge->dropTable('permissions');
    }
}
