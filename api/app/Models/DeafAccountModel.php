<?php

namespace App\Models;

use CodeIgniter\Model;

class DeafAccountModel extends Model
{
    protected $table = 'deaf_accounts';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['full_name', 'account_number', 'urn_number', 'account_type', 'branch_name', 'status', 'remarks'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'full_name' => 'required|min_length[3]|max_length[255]',
        'account_number' => 'required',
        'urn_number' => 'required',
    ];
    protected $validationMessages = [
        'full_name' => [
            'required' => 'Full Name is required',
        ],
        'account_number' => [
            'required' => 'Account Number is required',
        ]
    ];
}
