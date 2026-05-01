<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AddRupayToServicesSeeder extends Seeder
{
    public function run()
    {
        $db = \Config\Database::connect();
        
        $data = [
            'title' => 'RuPay Cards',
            'slug' => 'rupay-cards',
            'excerpt' => 'Experience the power of India\'s own card network with RuPay Debit cards.',
            'content' => 'RuPay is an Indian domestic card scheme conceived and launched by the National Payments Corporation of India (NPCI).',
            'status' => 'active',
            'meta_title' => 'RuPay Cards - GCUB',
            'meta_description' => 'Secure and reliable RuPay cards for all your banking needs.',
            'meta_keywords' => 'rupay, debit cards, gcub'
        ];

        // Check if exists first
        $existing = $db->table('services')->where('slug', 'rupay-cards')->get()->getRow();
        if (!$existing) {
            $db->table('services')->insert($data);
        }
    }
}
