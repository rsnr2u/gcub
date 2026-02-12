<?php

namespace App\Models;

use CodeIgniter\Model;

class MissedCallBankingServiceModel extends Model
{
    protected $table = 'missed_call_banking_services';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'phone_number', 'display_order', 'is_active'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'title' => 'required|min_length[3]|max_length[100]',
        'description' => 'required|max_length[255]',
        'phone_number' => 'required|max_length[20]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
