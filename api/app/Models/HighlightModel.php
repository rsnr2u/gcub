<?php

namespace App\Models;

use CodeIgniter\Model;

class HighlightModel extends Model
{
    protected $table = 'highlights';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'is_active', 'display_order'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'title' => 'required|min_length[3]|max_length[255]',
        'description' => 'required',
    ];
    protected $validationMessages = [
        'title' => [
            'required' => 'Title is required',
        ],
        'description' => [
            'required' => 'Description is required',
        ],
    ];
}
