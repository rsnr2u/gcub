<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ServiceContentSeeder extends Seeder
{
    public function run()
    {
        // 1. Mobile Banking
        $this->db->table('svc_mobile_banking')->insert([
            'slug' => 'mobile-banking',
            'meta_title' => 'Mobile Banking - Secure Banking on the Go | GCUB',
            'meta_description' => 'Access your accounts anywhere, anytime with GCUB Mobile Banking App.',
            'meta_keywords' => 'mobile banking, banking app, gcub app',
            'hero_title' => 'Mobile Banking',
            'hero_description' => 'Bank on the go with our secure and user-friendly mobile banking app.',
            'intro_title' => 'Experience Banking at Your Fingertips',
            'intro_description' => 'GCUB Mobile Banking offers you a safe, convenient, and easy way to manage your finances from your smartphone.',
            'feature_1_title' => 'Highly Secure',
            'feature_1_desc' => 'Advanced encryption and binary security to keep your transactions safe.',
            'feature_2_title' => 'Instant Transfers',
            'feature_2_desc' => 'Send money to any bank account instantly using IMPS or NEFT.',
            'key_features_json' => json_encode([
                ['title' => 'Balance Inquiry', 'desc' => 'Real-time update of your account balance.'],
                ['title' => 'Mini Statement', 'desc' => 'View recent transaction history instantly.'],
                ['title' => 'Fund Transfer', 'desc' => 'Within bank or to any other bank accounts.'],
                ['title' => 'Bill Payments', 'desc' => 'Pay utility bills, mobile recharges, and more.']
            ]),
            'play_store_url' => 'https://play.google.com/store/apps/details?id=app.imps.guntur_new',
            'app_store_url' => 'https://apps.apple.com/in/app/guntur-urban-mobile-banking/id1608340285',
            'sidebar_tips_json' => json_encode([
                'Never share your MPIN or OTP with anyone.',
                'Always lock your phone with a password.',
                'Logout of the app immediately after use.'
            ]),
            'helpdesk_phone' => '1800-425-8873'
        ]);

        // 2. ATM Services
        $this->db->table('svc_atm_service')->insert([
            'slug' => 'atm-services',
            'meta_title' => 'ATM Services - 24/7 Cash Access | GCUB',
            'meta_description' => 'Secure, fast, and accessible 24/7.',
            'meta_keywords' => 'ATM, cash withdrawal, gcub atm',
            'hero_title' => 'ATM Services',
            'hero_description' => 'Experience 24/7 convenience with our state-of-the-art ATM network.',
            'intro_title' => 'Banking at Your Convenience',
            'intro_description' => 'Our ATMs are strategically located and provide a range of services beyond just cash withdrawal.',
            'highlights_json' => json_encode([
                ['icon' => 'money-bill-wave', 'title' => 'Fast Cash', 'desc' => 'Quickly withdraw preset amounts of cash.'],
                ['icon' => 'unlock-alt', 'title' => 'PIN Change', 'desc' => 'Change your debit card PIN securely anytime.'],
                ['icon' => 'receipt', 'title' => 'Mini Statements', 'desc' => 'Get a print-out of your latest transactions.']
            ]),
            'features_json' => json_encode(['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'PIN Change Facility']),
            'security_tips_json' => json_encode(['Keep your PIN secret.', 'Shield the keypad.', 'Be wary of strangers.', 'Check for attachments.']),
            'sidebar_locator_link' => '/branch-locator',
            'sidebar_emergency_phone' => '1800-456-7890'
        ]);

        // 3. Toll Free Banking
        $this->db->table('svc_toll_free')->insert([
            'slug' => 'toll-free-banking',
            'meta_title' => 'Toll Free Banking - 24/7 Helpline | GCUB',
            'meta_description' => 'Your direct connection to our customer care team, absolutely free.',
            'meta_keywords' => 'toll free banking, customer care, gcub helpline',
            'hero_title' => 'Toll Free Banking',
            'hero_description' => 'Your direct connection to our customer care team, absolutely free.',
            'intro_title' => 'Assistance Around the Clock',
            'intro_description' => 'Our Toll Free Banking service allows you to get help without any call charges.',
            'helpline_number' => '1800 425 8873',
            'services_offered_json' => json_encode(['Account Balance Inquiry', 'Recent Transaction Details', 'Cheque Book Request', 'Stop Payment']),
            'emergency_services_json' => json_encode(['Block ATM Card', 'Unauthorized Transactions', 'Fraud Alert Reporting']),
            'sidebar_balance_enquiry' => '02249558043',
            'sidebar_card_blocking' => '08045936080',
            'sidebar_download_url' => '/downloads'
        ]);

        // 4. E-Statements
        $this->db->table('svc_e_statements')->insert([
            'slug' => 'e-statements',
            'meta_title' => 'E-Statements - Go Paperless | GCUB',
            'meta_description' => 'Eco-friendly, secure, and fast.',
            'meta_keywords' => 'e-statements, digital statements, gcub e-statement',
            'hero_title' => 'E-Statements',
            'hero_description' => 'Receive your bank statements securely in your email.',
            'intro_title' => 'Switch to Digital Statements',
            'intro_description' => 'E-Statement is an electronic version of your bank statement, delivered as a PDF.',
            'benefits_json' => json_encode([
                ['icon' => 'leaf', 'title' => 'Eco-Friendly', 'desc' => 'Reduce paper waste.'],
                ['icon' => 'bolt', 'title' => 'Instant Delivery', 'desc' => 'No more waiting for the mail.'],
                ['icon' => 'lock', 'title' => 'Secure Storage', 'desc' => 'Password-protected PDF.'],
                ['icon' => 'wallet', 'title' => 'Completely Free', 'desc' => 'Zero cost.']
            ]),
            'subscription_methods_json' => json_encode(['Mobile App', 'Nearest branch', 'SMS \'ESTMT\' to 56767']),
            'sidebar_note' => 'E-Statements are sent as password-protected PDF files.',
            'sidebar_support_phone' => '18001234567'
        ]);

        // 5. Positive Pay
        $this->db->table('svc_positive_pay')->insert([
            'slug' => 'positive-pay-system',
            'meta_title' => 'Positive Pay System - GCUB',
            'meta_description' => 'Enhanced security for your high-value cheque payments.',
            'meta_keywords' => 'positive pay, cheque security, gcub pps',
            'hero_title' => 'Positive Pay System',
            'hero_description' => 'Adding an extra layer of security to high-value check payments.',
            'intro_title' => 'What is Positive Pay System (PPS)?',
            'intro_desc_1' => 'Process of reconfirming key details of high-value cheques.',
            'intro_desc_2' => 'Details are matched with the information provided by the customer.',
            'eligibility_text' => 'Applicable for cheques of ₹ 50,000 and above.',
            'req_info_json' => json_encode(['Cheque Number', 'Cheque Date', 'Amount', 'Beneficiary Name']),
            'channels_json' => json_encode(['Mobile App', 'Any Branch']),
            'sidebar_protection_text' => 'Cheque fraud is a serious threat. Use PPS.',
            'sidebar_phone' => '1800-425-8873'
        ]);

        // 6. Any Branch
        $this->db->table('svc_any_branch')->insert([
            'slug' => 'any-branch-banking',
            'meta_title' => 'Any Branch Banking - GCUB',
            'meta_description' => 'Bank from any of our branches seamlessly.',
            'meta_keywords' => 'any branch banking, gcub branches',
            'hero_title' => 'Any Branch Banking',
            'hero_description' => 'Transact seamlessly across our entire branch network.',
            'intro_title' => 'Banking Without Boundaries',
            'intro_description' => 'Our Core Banking System (CBS) enables you to operate your account from any of our branches.',
            'facilities_json' => json_encode(['Cash Deposit', 'Cash Withdrawal', 'Fund Transfer', 'Cheque deposit']),
            'guidelines_json' => json_encode(['Proper identification', 'Standard charges', 'Daily limits']),
            'txn_table_json' => json_encode([['service' => 'Withdrawal', 'limit' => '₹ 50k'], ['service' => 'Deposit', 'limit' => 'Unlimited']]),
            'sidebar_locator_text' => 'Find our branches.',
            'sidebar_phone' => '1800-425-8873'
        ]);

        // 7. APBS
        $this->db->table('svc_apbs')->insert([
            'slug' => 'apbs-service',
            'meta_title' => 'APBS Service - GCUB',
            'meta_description' => 'Aadhaar Payment Bridge System for government benefits.',
            'meta_keywords' => 'apbs, aadhaar payment, dbt, gcub apbs',
            'hero_title' => 'APBS Service',
            'hero_description' => 'Seamless disbursement of government benefits via Aadhaar.',
            'intro_title' => 'What is APB System?',
            'intro_description' => 'Uses Aadhaar number for electronically channeling government subsidies.',
            'beneficiary_benefits_json' => json_encode(['No delays', 'Direct credit', 'Doorstep banking']),
            'objectives_json' => json_encode(['Digitize disbursement', 'Financial inclusion', 'Transparency']),
            'linking_steps_json' => json_encode(['Visit home branch', 'Submit Aadhaar copy', 'Seed with NPCI']),
            'sidebar_dbt_text' => 'Common benefits: PM-Kisan, Gas Subsidy.',
            'sidebar_status_url' => 'https://uidai.gov.in'
        ]);

        // 8. NACH
        $this->db->table('svc_nach')->insert([
            'slug' => 'nach-service',
            'meta_title' => 'NACH Service - GCUB',
            'meta_description' => 'National Automated Clearing House service.',
            'meta_keywords' => 'nach, auto-debit, gcub nach',
            'hero_title' => 'NACH Credit & Debit',
            'hero_description' => 'Simplified automated clearing for repetitive transactions.',
            'intro_title' => 'What is NACH?',
            'intro_description' => 'Centralized system for interbank electronic transactions.',
            'nach_credit_json' => json_encode(['Dividend', 'Salary', 'Pension']),
            'nach_debit_json' => json_encode(['Utility Bills', 'SIP/Insurance', 'EMI']),
            'why_use_nach_json' => json_encode(['Direct & Fast', 'Reliable', 'Scalable', 'Secure']),
            'sidebar_mandate_text' => 'Sign a one-time mandate.',
            'sidebar_mms_text' => 'Manage active mandates via MMS.'
        ]);

        // 9. IMPS
        $this->db->table('svc_imps')->insert([
            'slug' => 'imps',
            'meta_title' => 'IMPS - Instant Payments | GCUB',
            'meta_description' => 'Instant inter-bank electronic fund transfers, 24/7.',
            'meta_keywords' => 'imps, instant transfer, gcub imps',
            'hero_title' => 'IMPS',
            'hero_description' => 'Immediate Payment Service - Instant inter-bank electronic fund transfers, 24/7.',
            'intro_title' => 'Overview',
            'intro_description' => 'IMPS offers an inter-bank electronic fund transfer service through mobile phones, available 24/7.',
            'features_json' => json_encode([
                ['title' => 'Instant Transfer', 'desc' => 'Funds credited immediately.'],
                ['title' => '24/7 Availability', 'desc' => 'Works round the clock.'],
                ['title' => 'Multiple Channels', 'desc' => 'App, Web, ATM.']
            ]),
            'txn_limits_json' => json_encode([
                ['channel' => 'Mobile Banking', 'per' => '₹ 2,00,000', 'daily' => '₹ 5,00,000'],
                ['channel' => 'Net Banking', 'per' => '₹ 5,00,000', 'daily' => '₹ 10,00,000']
            ]),
            'sidebar_links_json' => json_encode(['/upi' => 'UPI Payments', '/neft-rtgs' => 'NEFT / RTGS']),
            'sidebar_assistance_text' => 'Contact support for failed transactions.',
            'sidebar_download_text' => 'Download IMPS activation form.'
        ]);

        // 10. UPI
        $this->db->table('svc_upi')->insert([
            'slug' => 'upi',
            'meta_title' => 'UPI - GCUB',
            'meta_description' => 'Unified Payments Interface - The future of mobile payments.',
            'meta_keywords' => 'upi, gpay, phonepe, bhim, gcub upi',
            'hero_title' => 'UPI',
            'hero_description' => 'Unified Payments Interface - The future of mobile payments.',
            'intro_title' => 'Overview',
            'intro_description' => 'UPI powers multiple bank accounts into a single mobile application.',
            'benefits_json' => json_encode([
                ['icon' => 'shield-alt', 'title' => 'Secure', 'desc' => '2FA authentication.'],
                ['icon' => 'bolt', 'title' => 'Real-Time', 'desc' => 'Immediate 24*7 transfer.'],
                ['icon' => 'qrcode', 'title' => 'Scan & Pay', 'desc' => 'Merchant payments.']
            ]),
            'registration_steps_json' => json_encode(['Download App', 'Verify Mobile', 'Link Account', 'Set PIN']),
            'sidebar_links_json' => json_encode(['/imps' => 'IMPS Transfer', '/rupay' => 'RuPay Cards']),
            'sidebar_download_text' => 'Get mobile banking forms.'
        ]);

        // 11. RuPay
        $this->db->table('svc_rupay')->insert([
            'slug' => 'rupay',
            'meta_title' => 'RuPay Cards - GCUB',
            'meta_description' => 'India\'s own card payment network.',
            'meta_keywords' => 'rupay, debit card, gcub rupay',
            'hero_title' => 'RuPay Cards',
            'hero_description' => 'World-class privileges on India\'s own card network.',
            'intro_title' => 'Overview',
            'intro_description' => 'Launched by NPCI to fulfill RBI\'s vision of a domestic payment system.',
            'card_types_json' => json_encode([
                ['title' => 'RuPay Classic', 'desc' => 'Everyday shopping.'],
                ['title' => 'RuPay Platinum', 'desc' => 'Higher limits, lounge access.']
            ]),
            'safety_tips_json' => json_encode([
                ['title' => 'Pin Safety', 'desc' => 'Never share your PIN.'],
                ['title' => 'Hide Keypad', 'desc' => 'Cover while entering.']
            ]),
            'sidebar_links_json' => json_encode(['/debit-cards' => 'Debit Cards', '/net-banking' => 'Net Banking']),
            'sidebar_lost_card_text' => 'Immediately block your card if lost.'
        ]);

        // 12. NEFT / RTGS
        $this->db->table('svc_neft_rtgs')->insert([
            'slug' => 'neft-rtgs',
            'meta_title' => 'NEFT / RTGS - GCUB',
            'meta_description' => 'Safe and secure electronic fund transfers.',
            'meta_keywords' => 'neft, rtgs, fund transfer, gcub',
            'hero_title' => 'NEFT / RTGS',
            'hero_description' => 'Safe and secure electronic fund transfers for high-value transactions.',
            'neft_info' => 'Nation-wide payment system facilitating one-to-one funds transfer.',
            'rtgs_info' => 'Real Time Gross Settlement for continuous, individually settled transfers.',
            'comparison_json' => json_encode([
                ['feature' => 'Min Amount', 'neft' => '₹ 1', 'rtgs' => '₹ 2,00,000'],
                ['feature' => 'Settlement', 'neft' => 'Batches', 'rtgs' => 'Real Time']
            ]),
            'req_info_json' => json_encode(['Beneficiary Name', 'Account No', 'IFSC Code']),
            'sidebar_links_json' => json_encode(['/imps' => 'IMPS', '/upi' => 'UPI']),
            'sidebar_ifsc_text' => 'Find IFSC code via branch locator.'
        ]);

        // 13. Net Banking
        $this->db->table('svc_net_banking')->insert([
            'slug' => 'net-banking',
            'meta_title' => 'Internet Banking - GCUB',
            'meta_description' => 'Banking at your fingertips. Anywhere, Anytime.',
            'meta_keywords' => 'net banking, internet banking, gcub web',
            'hero_title' => 'Internet Banking',
            'hero_description' => 'Banking at your fingertips. Anywhere, Anytime.',
            'intro_title' => 'Overview',
            'intro_description' => 'Secure, fast, and easy way to access your bank account 24/7.',
            'features_json' => json_encode(['Account Summary', 'Fund Transfer', 'Cheque Request', 'TDS Enquiry']),
            'registration_info' => 'Visit home branch to submit application form.',
            'security_tips_json' => json_encode(['Use HTTPS', 'Avoid public PCs', 'Change password regularly']),
            'sidebar_login_links_json' => json_encode(['Retail Login', 'Corporate Login'])
        ]);
    }
}
