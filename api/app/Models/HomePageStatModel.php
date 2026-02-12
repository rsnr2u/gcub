<?php

namespace App\Models;

use CodeIgniter\Model;

class HomePageStatModel extends Model
{
    protected $table = 'home_page_stats';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['label', 'value', 'display_order'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'label' => 'required|min_length[2]|max_length[50]',
        'value' => 'required|max_length[20]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
