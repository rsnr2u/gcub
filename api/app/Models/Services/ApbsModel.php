<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class ApbsModel extends Model {
    protected $table = 'svc_apbs';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'beneficiary_benefits_json', 'objectives_json', 'linking_steps_json', 'sidebar_dbt_text', 'sidebar_status_url'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}