<?php

namespace App\Models;

use CodeIgniter\Model;

class AwardModel extends Model
{
    protected $table = 'awards';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'image_path', 'display_order'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'title' => 'required|min_length[3]|max_length[255]',
        'image_path' => 'required',
    ];
    protected $validationMessages = [
        'title' => [
            'required' => 'Title is required',
        ],
        'image_path' => [
            'required' => 'Image is required',
        ]
    ];
}
