<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddPerformanceIndexes extends Migration
{
    public function up()
    {
        // site_settings index
        $this->db->query("CREATE INDEX idx_setting_key ON site_settings(setting_key)");

        // products indexes
        $this->db->query("CREATE INDEX idx_products_slug ON products(slug)");
        $this->db->query("CREATE INDEX idx_products_status ON products(status)");
        $this->db->query("CREATE INDEX idx_products_category ON products(category)");

        // sliders index
        $this->db->query("CREATE INDEX idx_sliders_active ON sliders(is_active)");

        // news indexes
        $this->db->query("CREATE INDEX idx_news_status ON news(status)");
        $this->db->query("CREATE INDEX idx_news_created ON news(created_at)");

        // branches index
        $this->db->query("CREATE INDEX idx_branches_status ON branches(status)");
    }

    public function down()
    {
        $this->db->query("DROP INDEX idx_setting_key ON site_settings");
        $this->db->query("DROP INDEX idx_products_slug ON products");
        $this->db->query("DROP INDEX idx_products_status ON products");
        $this->db->query("DROP INDEX idx_products_category ON products");
        $this->db->query("DROP INDEX idx_sliders_active ON sliders");
        $this->db->query("DROP INDEX idx_news_status ON news");
        $this->db->query("DROP INDEX idx_news_created ON news");
        $this->db->query("DROP INDEX idx_branches_status ON branches");
    }
}
