<?php

namespace App\Models;

use CodeIgniter\Model;

class HomePageContentModel extends Model
{
    protected $table = 'home_page_content';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'section_title',
        'main_heading',
        'description',
        'cta_button_text',
        'cta_button_link'
    ];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'section_title' => 'required|min_length[2]|max_length[100]',
        'main_heading' => 'required|min_length[5]|max_length[255]',
        'description' => 'required',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
