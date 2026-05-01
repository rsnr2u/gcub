<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class RupayDataSeeder extends Seeder
{
    public function run()
    {
        $db = \Config\Database::connect();
        
        // Ensure slug is unique
        $db->table('svc_rupay')->where('slug', 'rupay-cards')->delete();

        $data = [
            'slug' => 'rupay-cards',
            'meta_title' => 'RuPay Cards - Domestic & Global Payment Network | GCUB',
            'meta_description' => 'Discover the benefits of RuPay Classic and Platinum cards. Secure, reliable, and accepted across India with exclusive merchant offers.',
            'meta_keywords' => 'rupay, debit cards, gcub rupay, npci, rupay platinum, rupay classic',
            'hero_title' => 'RuPay Cards',
            'hero_description' => 'India\'s own card payment network. World-class privileges.',
            'hero_breadcrumb_text' => 'Home / Services / RuPay Cards',
            'intro_title' => 'Overview',
            'intro_heading' => 'What is RuPay?',
            'intro_description' => 'RuPay is an Indian domestic card scheme conceived and launched by the National Payments Corporation of India (NPCI). It was created to fulfill the Reserve Bank of India\'s vision of having a domestic, open loop, and multilateral system of payments in India. RuPay facilitates electronic payment at all Indian banks and financial institutions.',
            'card_types_json' => json_encode([
                [
                    'title' => 'RuPay Classic',
                    'desc' => 'Ideal for everyday shopping and cash withdrawals.',
                    'border_color' => 'orange-500',
                    'benefits' => ['Comprehensive Insurance Cover', 'Domestic Merchant Offers']
                ],
                [
                    'title' => 'RuPay Platinum',
                    'desc' => 'Premium card with exclusive benefits and higher limits.',
                    'border_color' => 'blue-900',
                    'benefits' => ['Airport Lounge Access', 'Concierge Services', '5% Cash Back on Utility Bills']
                ]
            ]),
            'safety_tips_json' => json_encode([
                [
                    'title' => 'Never share your PIN',
                    'desc' => 'Your ATM/POS PIN is confidential. Do not share it with anyone, not even bank officials.',
                    'icon' => 'shield-alt'
                ],
                [
                    'title' => 'Hide your PIN',
                    'desc' => 'Always cover the keypad while entering your PIN at ATMs or POS terminals.',
                    'icon' => 'eye-slash'
                ]
            ]),
            'sidebar_links_json' => json_encode([
                ['label' => 'Debit Cards', 'url' => '/debit-cards'],
                ['label' => 'Net Banking', 'url' => '/net-banking']
            ]),
            'sidebar_promo_json' => json_encode([
                'title' => 'Lost your Card?',
                'subtitle' => 'Immediately block your card to prevent misuse.',
                'description' => 'Your safety is our priority. Call our 24/7 helpline or use mobile banking to block your card instantly.',
                'btn_text' => 'Block Card Now',
                'btn_url' => '/block-card',
                'image' => 'rupay-lost.png'
            ]),
            'section_visibility_json' => json_encode([
                'hero' => true,
                'intro' => true,
                'cards' => true,
                'safety' => true,
                'help' => false,
                'promo' => true
            ])
        ];

        // Insert or Update
        $existing = $db->table('svc_rupay')->where('id', 1)->get()->getRow();
        if ($existing) {
            $db->table('svc_rupay')->where('id', 1)->update($data);
        } else {
            $db->table('svc_rupay')->insert($data);
        }
    }
}
