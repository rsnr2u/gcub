<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class BankingServicesSeeder extends Seeder
{
    public function run()
    {
        $services = [
            ['title' => 'RTGS & NEFT', 'slug' => 'neft-rtgs', 'short_description' => 'Fast and secure fund transfers across India.'],
            ['title' => 'Mobile Banking', 'slug' => 'mobile-banking', 'short_description' => 'Banking on the go, anytime, anywhere.'],
            ['title' => 'ATM', 'slug' => 'atm', 'short_description' => '24/7 access to your cash with our wide ATM network.'],
            ['title' => 'UPI', 'slug' => 'upi', 'short_description' => 'Instant real-time payment system simplified.'],
            ['title' => 'Toll Free Banking', 'slug' => 'toll-free-banking', 'short_description' => 'Easy banking services with a simple phone call.'],
            ['title' => 'E-Statements', 'slug' => 'e-statements', 'short_description' => 'Go green with paperless digital statements.'],
            ['title' => 'Positive Pay System', 'slug' => 'positive-pay-system', 'short_description' => 'Enhanced security for your high-value cheques.'],
            ['title' => 'Any Branch Banking', 'slug' => 'any-branch-banking', 'short_description' => 'Access your account from any of our branches.'],
            ['title' => 'APBS Service', 'slug' => 'apbs-service', 'short_description' => 'Aadhaar Payment Bridge System for seamless transfers.'],
            ['title' => 'NACH - Credit & Debit', 'slug' => 'nach', 'short_description' => 'Automated clearing house for recurring payments.'],
        ];

        foreach ($services as $index => $service) {
            $data = [
                'title' => $service['title'],
                'slug' => $service['slug'],
                'short_description' => $service['short_description'],
                'content' => '<h2>Welcome to ' . $service['title'] . '</h2><p>This is a CMS-managed service page for ' . $service['title'] . '. You can edit this content from the admin panel using the Rich Text Editor.</p>',
                'status' => 1,
                'sort_order' => $index + 1,
            ];
            $this->db->table('banking_services')->insert($data);
        }
    }

}
