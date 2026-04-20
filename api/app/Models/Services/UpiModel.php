<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class UpiModel extends Model {
    protected $table = 'svc_upi';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'benefits_json', 'registration_steps_json', 'sidebar_links_json', 'sidebar_download_text'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}