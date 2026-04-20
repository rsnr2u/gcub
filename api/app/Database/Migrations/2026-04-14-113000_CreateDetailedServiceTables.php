<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateDetailedServiceTables extends Migration
{
    public function up()
    {
        // 1. Mobile Banking
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'mobile-banking'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'feature_1_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'feature_1_desc' => ['type' => 'TEXT'],
            'feature_2_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'feature_2_desc' => ['type' => 'TEXT'],
            'key_features_json' => ['type' => 'LONGTEXT'], // Array of {title, desc}
            'play_store_url' => ['type' => 'VARCHAR', 'constraint' => 255],
            'app_store_url' => ['type' => 'VARCHAR', 'constraint' => 255],
            'sidebar_tips_json' => ['type' => 'LONGTEXT'], // Array of strings
            'helpdesk_phone' => ['type' => 'VARCHAR', 'constraint' => 50],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_mobile_banking');

        // 2. ATM Services
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'atm-services'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'highlights_json' => ['type' => 'LONGTEXT'], // 3 cards: {icon, title, desc}
            'features_json' => ['type' => 'LONGTEXT'], // List of strings
            'security_tips_json' => ['type' => 'LONGTEXT'], // List of strings
            'sidebar_locator_link' => ['type' => 'VARCHAR', 'constraint' => 255],
            'sidebar_emergency_phone' => ['type' => 'VARCHAR', 'constraint' => 50],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_atm_service');

        // 3. Toll Free Banking
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'toll-free-banking'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'helpline_number' => ['type' => 'VARCHAR', 'constraint' => 50],
            'services_offered_json' => ['type' => 'LONGTEXT'],
            'emergency_services_json' => ['type' => 'LONGTEXT'],
            'sidebar_balance_enquiry' => ['type' => 'VARCHAR', 'constraint' => 50],
            'sidebar_card_blocking' => ['type' => 'VARCHAR', 'constraint' => 50],
            'sidebar_download_url' => ['type' => 'VARCHAR', 'constraint' => 255],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_toll_free');

        // 4. E-Statements
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'e-statements'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'benefits_json' => ['type' => 'LONGTEXT'],
            'subscription_methods_json' => ['type' => 'LONGTEXT'],
            'sidebar_note' => ['type' => 'TEXT'],
            'sidebar_support_phone' => ['type' => 'VARCHAR', 'constraint' => 50],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_e_statements');

        // 5. Positive Pay System
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'positive-pay-system'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_desc_1' => ['type' => 'TEXT'],
            'intro_desc_2' => ['type' => 'TEXT'],
            'eligibility_text' => ['type' => 'TEXT'],
            'req_info_json' => ['type' => 'LONGTEXT'],
            'channels_json' => ['type' => 'LONGTEXT'],
            'sidebar_protection_text' => ['type' => 'TEXT'],
            'sidebar_phone' => ['type' => 'VARCHAR', 'constraint' => 50],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_positive_pay');

        // 6. Any Branch Banking
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'any-branch-banking'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'facilities_json' => ['type' => 'LONGTEXT'],
            'guidelines_json' => ['type' => 'LONGTEXT'],
            'txn_table_json' => ['type' => 'LONGTEXT'],
            'sidebar_locator_text' => ['type' => 'TEXT'],
            'sidebar_phone' => ['type' => 'VARCHAR', 'constraint' => 50],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_any_branch');

        // 7. APBS Service
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'apbs-service'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'beneficiary_benefits_json' => ['type' => 'LONGTEXT'],
            'objectives_json' => ['type' => 'LONGTEXT'],
            'linking_steps_json' => ['type' => 'LONGTEXT'],
            'sidebar_dbt_text' => ['type' => 'TEXT'],
            'sidebar_status_url' => ['type' => 'VARCHAR', 'constraint' => 255],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_apbs');

        // 8. NACH Service
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'nach-service'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'nach_credit_json' => ['type' => 'LONGTEXT'],
            'nach_debit_json' => ['type' => 'LONGTEXT'],
            'why_use_nach_json' => ['type' => 'LONGTEXT'],
            'sidebar_mandate_text' => ['type' => 'TEXT'],
            'sidebar_mms_text' => ['type' => 'TEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_nach');

        // 9. IMPS
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'imps'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'features_json' => ['type' => 'LONGTEXT'],
            'txn_limits_json' => ['type' => 'LONGTEXT'],
            'sidebar_links_json' => ['type' => 'LONGTEXT'],
            'sidebar_assistance_text' => ['type' => 'TEXT'],
            'sidebar_download_text' => ['type' => 'TEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_imps');

        // 10. UPI
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'upi'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'benefits_json' => ['type' => 'LONGTEXT'],
            'registration_steps_json' => ['type' => 'LONGTEXT'],
            'sidebar_links_json' => ['type' => 'LONGTEXT'],
            'sidebar_download_text' => ['type' => 'TEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_upi');

        // 11. RuPay
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'rupay'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'card_types_json' => ['type' => 'LONGTEXT'],
            'safety_tips_json' => ['type' => 'LONGTEXT'],
            'sidebar_links_json' => ['type' => 'LONGTEXT'],
            'sidebar_lost_card_text' => ['type' => 'TEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_rupay');

        // 12. NEFT / RTGS
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'neft-rtgs'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'neft_info' => ['type' => 'TEXT'],
            'rtgs_info' => ['type' => 'TEXT'],
            'comparison_json' => ['type' => 'LONGTEXT'],
            'req_info_json' => ['type' => 'LONGTEXT'],
            'sidebar_links_json' => ['type' => 'LONGTEXT'],
            'sidebar_ifsc_text' => ['type' => 'TEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_neft_rtgs');

        // 13. Net Banking
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255, 'default' => 'net-banking'],
            'meta_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'meta_description' => ['type' => 'TEXT'],
            'meta_keywords' => ['type' => 'TEXT'],
            'hero_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'hero_description' => ['type' => 'TEXT'],
            'intro_title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'intro_description' => ['type' => 'TEXT'],
            'features_json' => ['type' => 'LONGTEXT'],
            'registration_info' => ['type' => 'TEXT'],
            'security_tips_json' => ['type' => 'LONGTEXT'],
            'sidebar_login_links_json' => ['type' => 'LONGTEXT'],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('svc_net_banking');
    }

    public function down()
    {
        $tables = [
            'svc_mobile_banking', 'svc_atm_service', 'svc_toll_free', 'svc_e_statements',
            'svc_positive_pay', 'svc_any_branch', 'svc_apbs', 'svc_nach', 'svc_imps',
            'svc_upi', 'svc_rupay', 'svc_neft_rtgs', 'svc_net_banking'
        ];
        foreach ($tables as $table) {
            $this->forge->dropTable($table);
        }
    }
}
