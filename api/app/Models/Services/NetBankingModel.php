<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class NetBankingModel extends Model {
    protected $table = 'svc_net_banking';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'features_json', 'registration_info', 'security_tips_json', 'sidebar_login_links_json'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}