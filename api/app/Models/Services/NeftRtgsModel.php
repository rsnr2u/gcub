<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class NeftRtgsModel extends Model {
    protected $table = 'svc_neft_rtgs';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'neft_info', 'rtgs_info', 'comparison_json', 'req_info_json', 'sidebar_links_json', 'sidebar_ifsc_text'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}