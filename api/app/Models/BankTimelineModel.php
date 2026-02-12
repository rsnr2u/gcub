<?php

namespace App\Models;

use CodeIgniter\Model;

class BankTimelineModel extends Model
{
    protected $table = 'bank_timeline';
    protected $primaryKey = 'id';
    protected $allowedFields = ['year', 'title', 'description', 'sort_order'];
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
}
