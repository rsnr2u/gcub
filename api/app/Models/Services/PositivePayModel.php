<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class PositivePayModel extends Model {
    protected $table = 'svc_positive_pay';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_desc_1', 'intro_desc_2', 'eligibility_text', 'req_info_json', 'channels_json', 'sidebar_protection_text', 'sidebar_phone'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}