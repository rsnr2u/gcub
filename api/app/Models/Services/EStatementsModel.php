<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class EStatementsModel extends Model {
    protected $table = 'svc_e_statements';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'benefits_json', 'subscription_methods_json', 'sidebar_note', 'sidebar_support_phone', 'helpbox_json', 'sidebar_promo_json', 'subscription_json', 'benefits_title'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}