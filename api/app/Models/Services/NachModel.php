<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class NachModel extends Model {
    protected $table = 'svc_nach';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'nach_credit_json', 'nach_debit_json', 'why_use_nach_json', 'sidebar_mandate_text', 'sidebar_mms_text'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}