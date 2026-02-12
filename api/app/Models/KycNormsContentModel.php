<?php

namespace App\Models;

use CodeIgniter\Model;

class KycNormsContentModel extends Model
{
    protected $table = 'kyc_norms_content';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['header_title', 'header_description', 'header_subtitle', 'companies_title', 'companies_subtitle'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'header_title' => 'required|min_length[3]|max_length[100]',
        'header_description' => 'required',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
