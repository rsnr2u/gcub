<?php

namespace App\Models;

use CodeIgniter\Model;

class KycDocumentModel extends Model
{
    protected $table = 'kyc_documents';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['category', 'document_name', 'display_order', 'is_active'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'category' => 'required|in_list[identity,address,company]',
        'document_name' => 'required|max_length[255]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
