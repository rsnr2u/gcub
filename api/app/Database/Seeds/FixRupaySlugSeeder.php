<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class FixRupaySlugSeeder extends Seeder
{
    public function run()
    {
        $db = \Config\Database::connect();
        $db->table('services')->where('slug', 'rupay')->update(['slug' => 'rupay-cards']);
        $db->table('svc_rupay')->where('slug', 'rupay')->update(['slug' => 'rupay-cards']);
    }
}
