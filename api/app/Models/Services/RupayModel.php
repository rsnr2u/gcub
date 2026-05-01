<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class RupayModel extends Model {
    protected $table = 'svc_rupay';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'slug', 'meta_title', 'meta_description', 'meta_keywords', 
        'hero_title', 'hero_description', 'hero_breadcrumb_text',
        'intro_title', 'intro_heading', 'intro_description', 
        'card_types_json', 'safety_tips_json', 'highlights_json',
        'sidebar_links_json', 'sidebar_tips_json', 
        'assistance_box_json', 'downloads_box_json', 'sidebar_promo_json', 'section_visibility_json'
    ];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}