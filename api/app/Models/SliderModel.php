<?php

namespace App\Models;

use CodeIgniter\Model;

class SliderModel extends Model
{
    protected $table = 'sliders';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'category',
        'title',
        'description',
        'button_name',
        'button_link',
        'image_path',
        'display_order',
        'is_active'
    ];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    protected $validationRules = [
        'category' => 'required|min_length[2]|max_length[100]',
        'title' => 'required|min_length[3]|max_length[255]',
        'description' => 'permit_empty',
        'button_name' => 'permit_empty|max_length[100]',
        'button_link' => 'permit_empty|valid_url_strict|max_length[255]',
        'image_path' => 'permit_empty|max_length[255]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
