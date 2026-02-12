<?php

namespace App\Models;

use CodeIgniter\Model;

class BankCoreValuesModel extends Model
{
    protected $table = 'bank_core_values';
    protected $primaryKey = 'id';
    protected $allowedFields = ['title', 'sort_order'];
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}
