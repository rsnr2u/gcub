<?php

namespace App\Models;

use CodeIgniter\Model;

class BoardDirectorModel extends Model
{
    protected $table = 'board_directors';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['name', 'designation', 'tagline', 'bio', 'image_path', 'display_order', 'status'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'name' => 'required',
        'designation' => 'required',
    ];
}
