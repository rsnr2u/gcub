<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class AtmServiceModel extends Model {
    protected $table = 'svc_atm_service';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_breadcrumb_text', 'hero_description', 'intro_title', 'intro_heading', 'intro_description', 'highlights_json', 'features_json', 'security_tips_json', 'sidebar_locator_link', 'sidebar_emergency_phone', 'section_visibility_json', 'sidebar_promo_json', 'helpbox_json', 'sidebar_tips_json'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}