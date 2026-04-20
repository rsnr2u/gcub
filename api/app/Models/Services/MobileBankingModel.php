<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class MobileBankingModel extends Model {
    protected $table = 'svc_mobile_banking';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'feature_1_title', 'feature_1_desc', 'feature_2_title', 'feature_2_desc', 'key_features_json', 'play_store_url', 'app_store_url', 'sidebar_tips_json', 'helpdesk_phone'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}