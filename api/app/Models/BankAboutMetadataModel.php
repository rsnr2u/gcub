<?php

namespace App\Models;

use CodeIgniter\Model;

class BankAboutMetadataModel extends Model
{
    protected $table = 'bank_about_metadata';
    protected $primaryKey = 'id';
    protected $allowedFields = ['key_name', 'value_text'];
    protected $returnType = 'array';
    protected $useTimestamps = false;
    protected $updatedField = 'updated_at';
}
