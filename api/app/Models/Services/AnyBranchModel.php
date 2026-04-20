<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class AnyBranchModel extends Model {
    protected $table = 'svc_any_branch';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'facilities_json', 'guidelines_json', 'txn_table_json', 'sidebar_locator_text', 'sidebar_phone'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}