<?php

namespace App\Models\Services;

use CodeIgniter\Model;

class RupayModel extends Model {
    protected $table = 'svc_rupay';
    protected $primaryKey = 'id';
    protected $allowedFields = ['slug', 'meta_title', 'meta_description', 'meta_keywords', 'hero_title', 'hero_description', 'intro_title', 'intro_description', 'card_types_json', 'safety_tips_json', 'sidebar_links_json', 'sidebar_lost_card_text'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}