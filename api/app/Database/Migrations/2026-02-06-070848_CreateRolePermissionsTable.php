<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateRolePermissionsTable extends Migration
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
            'role_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'permission_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('role_id', 'roles', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('permission_id', 'permissions', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('role_permissions');

        // Seed role-permission mappings
        $db = \Config\Database::connect();

        // Super Administrator (role_id = 1) - All permissions
        $allPermissions = $db->table('permissions')->select('id')->get()->getResultArray();
        foreach ($allPermissions as $perm) {
            $db->table('role_permissions')->insert([
                'role_id' => 1,
                'permission_id' => $perm['id'],
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }

        // Content Manager (role_id = 2) - Content and Products only
        $contentPermissions = ['manage_content', 'view_content', 'delete_content', 'manage_products', 'view_products'];
        foreach ($contentPermissions as $permName) {
            $perm = $db->table('permissions')->where('name', $permName)->get()->getRowArray();
            if ($perm) {
                $db->table('role_permissions')->insert([
                    'role_id' => 2,
                    'permission_id' => $perm['id'],
                    'created_at' => date('Y-m-d H:i:s'),
                ]);
            }
        }

        // Viewer (role_id = 3) - View only permissions
        $viewPermissions = ['view_users', 'view_content', 'view_products', 'view_settings', 'view_reports'];
        foreach ($viewPermissions as $permName) {
            $perm = $db->table('permissions')->where('name', $permName)->get()->getRowArray();
            if ($perm) {
                $db->table('role_permissions')->insert([
                    'role_id' => 3,
                    'permission_id' => $perm['id'],
                    'created_at' => date('Y-m-d H:i:s'),
                ]);
            }
        }
    }

    public function down()
    {
        $this->forge->dropTable('role_permissions');
    }
}
