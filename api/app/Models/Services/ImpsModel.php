<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class ImpsModel extends Model {
    protected $table = 'svc_imps';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'features_json', 'txn_limits_json', 'sidebar_links_json', 'assistance_box_json', 'downloads_box_json'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}