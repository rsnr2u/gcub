<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class TollFreeModel extends Model {
    protected $table = 'svc_toll_free';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'helpline_number', 'services_offered_json', 'emergency_services_json', 'sidebar_balance_enquiry', 'sidebar_card_blocking', 'sidebar_download_url'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}