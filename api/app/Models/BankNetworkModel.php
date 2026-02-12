<?php

namespace App\Models;

use CodeIgniter\Model;

class BankNetworkModel extends Model
{
    protected $table = 'bank_network';
    protected $primaryKey = 'id';
    protected $allowedFields = ['region_name', 'branch_count', 'sort_order'];
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}
