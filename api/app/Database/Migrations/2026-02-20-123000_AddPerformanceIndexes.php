<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddPerformanceIndexes extends Migration
{
    public function up()
    {
        $queries = [
            "CREATE INDEX idx_setting_key ON site_settings(setting_key)",
            "CREATE INDEX idx_products_slug ON products(slug)",
            "CREATE INDEX idx_products_status ON products(status)",
            "CREATE INDEX idx_products_category ON products(category)",
            "CREATE INDEX idx_sliders_active ON sliders(is_active)",
            "CREATE INDEX idx_news_created ON news(created_at)"
        ];

        foreach ($queries as $query) {
            try {
                $this->db->query($query);
            } catch (\Throwable $e) {
                // Ignore exceptions like duplicate key
            }
        }
    }

    public function down()
    {
        $this->db->query("DROP INDEX idx_setting_key ON site_settings");
        $this->db->query("DROP INDEX idx_products_slug ON products");
        $this->db->query("DROP INDEX idx_products_status ON products");
        $this->db->query("DROP INDEX idx_products_category ON products");
        $this->db->query("DROP INDEX idx_sliders_active ON sliders");
        $this->db->query("DROP INDEX idx_news_created ON news");
    }
}
