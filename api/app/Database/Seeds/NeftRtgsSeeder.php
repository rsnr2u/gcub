<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class NeftRtgsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'slug' => 'neft-rtgs',
            'meta_title' => 'NEFT / RTGS - Electronic Funds Transfer | GCUB',
            'meta_description' => 'Fast and secure electronic fund transfers including NEFT and RTGS services at The Guntur Co-operative Urban Bank.',
            'meta_keywords' => 'NEFT, RTGS, Funds Transfer, Electronic Banking, GCUB Services',
            'hero_title' => 'NEFT / RTGS',
            'hero_description' => 'Safe and secure electronic fund transfers for high-value transactions.',
            'neft_info' => 'National Electronic Funds Transfer (NEFT) is a nation-wide payment system facilitating one-to-one funds transfer. Under this Scheme, individuals, firms and corporates can electronically transfer funds to any individual, firm or corporate having an account with any other bank agency in the country participating in the Scheme.',
            'neft_note' => 'Note: NEFT transactions are settled in batches.',
            'rtgs_info' => "\"'RTGS' stands for Real Time Gross Settlement, which can be defined as the continuous (real-time) settlement of funds transfers individually on an order by order basis (without netting). 'Real Time' means the processing of instructions at the time they are received rather than at some later time.\"",
            'rtgs_note' => 'Minimum Limit: The minimum amount to be remitted through RTGS is ₹ 2,00,000.',
            'comparison_json' => json_encode([
                ['feature' => 'Minimum Amount', 'neft' => '< ₹ 1', 'rtgs' => '₹ 2,00,000'],
                ['feature' => 'Maximum Amount', 'neft' => 'No Limit', 'rtgs' => 'No Limit'],
                ['feature' => 'Settlement Type', 'neft' => 'Batches (Half hourly)', 'rtgs' => 'Real Time'],
            ]),
            'req_info_description' => 'To initiate a transfer, you need the following details of the beneficiary:',
            'req_info_json' => json_encode([
                'Beneficiary Name',
                'Beneficiary Account No',
                'Beneficiary Bank Name & Branch',
                'Beneficiary Bank IFSC Code'
            ]),
            'sidebar_links_json' => json_encode([
                ['label' => 'IMPS', 'url' => '/imps'],
                ['label' => 'UPI Payments', 'url' => '/upi']
            ]),
            'sidebar_ifsc_text' => 'Search for IFSC codes of all our branches.',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        // Check if record exists
        $db = \Config\Database::connect();
        $builder = $db->table('svc_neft_rtgs');
        $existing = $builder->where('slug', 'neft-rtgs')->get()->getRow();

        if ($existing) {
            $builder->where('slug', 'neft-rtgs')->update($data);
        } else {
            $builder->insert($data);
        }
    }
}
