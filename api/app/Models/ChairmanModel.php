<?php

namespace App\Models;

use CodeIgniter\Model;

class ChairmanModel extends Model
{
    protected $table = 'chairman_profile';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'name',
        'designation',
        'education',
        'tenure_start',
        'experience',
        'image_path',
        'message',
        'achievement_branches',
        'achievement_growth',
        'status',
        'display_order'
    ];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
}
