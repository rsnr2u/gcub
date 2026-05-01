<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UpiDataSeeder extends Seeder
{
    public function run()
    {
        $db = \Config\Database::connect();
        
        // Clean up duplicates
        $db->table('svc_upi')->where('id >', 1)->delete();

        $data = [
            'slug' => 'upi',
            'meta_title' => 'UPI - Unified Payments Interface | GCUB',
            'meta_description' => 'Experience seamless 24/7 money transfers with UPI. Scan and pay easily at any merchant using Guntur Co-operative Urban Bank account.',
            'meta_keywords' => 'upi, unified payments interface, bhim, scan and pay, mobile payments, gcub upi',
            'hero_title' => 'UPI',
            'hero_description' => 'Unified Payments Interface - The future of mobile payments.',
            'hero_breadcrumb_text' => 'Home / Services / UPI',
            'intro_title' => 'Overview',
            'intro_heading' => 'What is UPI?',
            'intro_description' => 'Unified Payments Interface (UPI) is a system that powers multiple bank accounts into a single mobile application (of any participating bank), merging several banking features, seamless fund routing & merchant payments into one hood. It also caters to the "Peer to Peer" collect request which can be scheduled and paid as per requirement and convenience.',
            'benefits_json' => json_encode([
                ['icon' => 'shield-check', 'title' => 'Secure Transactions', 'desc' => 'Two Factor Authentication with a single click. No need to share bank details.'],
                ['icon' => 'bolt', 'title' => 'Real-Time Payment', 'desc' => 'Immediate money transfer 24*7*365 through your mobile device.'],
                ['icon' => 'qrcode', 'title' => 'Scan & Pay', 'desc' => 'Pay merchants easily by scanning QR codes at shops and online.'],
                ['icon' => 'mobile-alt', 'title' => 'Single App', 'desc' => 'Access multiple bank accounts in a single mobile application.']
            ]),
            'registration_steps_json' => json_encode([
                'Download App: Download any UPI enabled app (Google Pay, PhonePe, BHIM, etc.).',
                'Verify Mobile: App will verify your mobile number via SMS.',
                'Link Account: Select \'Guntur Co-operative Urban Bank\' from the bank list.',
                'Set PIN: Create your unique UPI PIN using your Debit Card details.',
                'Start Transacting: You are now ready to send and receive money!'
            ]),
            'sidebar_links_json' => json_encode([
                ['label' => 'IMPS Transfer', 'url' => '/imps'],
                ['label' => 'RuPay Cards', 'url' => '/rupay-cards'],
                ['label' => 'Mobile Banking', 'url' => '/mobile-banking']
            ]),
            'downloads_box_json' => json_encode([
                'title' => 'Download Forms',
                'desc' => 'Get application forms for mobile banking registration.',
                'link_text' => 'Go to Downloads',
                'link_url' => '/downloads'
            ]),
            'section_visibility_json' => json_encode([
                'hero' => true,
                'intro' => true,
                'benefits' => true,
                'registration' => true,
                'help' => false,
                'promo' => false
            ])
        ];

        $db->table('svc_upi')->where('id', 1)->update($data);
    }
}
