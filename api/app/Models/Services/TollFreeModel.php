<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class TollFreeModel extends Model {
    protected $table = 'svc_toll_free';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'helpline_number', 'services_offered_json', 'emergency_services_json', 'sidebar_balance_enquiry', 'sidebar_card_blocking', 'sidebar_download_url', 'helpbox_json', 'sidebar_promo_json', 'balance_enquiry_json', 'card_blocking_json', 'downloads_json'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}