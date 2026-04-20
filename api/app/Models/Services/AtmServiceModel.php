<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class AtmServiceModel extends Model {
    protected $table = 'svc_atm_service';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'highlights_json', 'features_json', 'security_tips_json', 'sidebar_locator_link', 'sidebar_emergency_phone'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}