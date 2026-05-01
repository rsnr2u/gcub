<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class MobileBankingModel extends Model {
    protected $table = 'svc_mobile_banking';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_breadcrumb_text', 'hero_description', 'intro_title', 'intro_heading', 'intro_description', 'highlights_json', 'feature_1_title', 'feature_1_desc', 'feature_2_title', 'feature_2_desc', 'key_features_json', 'play_store_url', 'app_store_url', 'download_section_json', 'sidebar_tips_json', 'helpbox_json', 'helpdesk_phone', 'section_visibility_json', 'sidebar_promo_json'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}