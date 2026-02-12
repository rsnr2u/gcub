<?php

namespace App\Models;

use CodeIgniter\Model;

class AnnualReportModel extends Model
{
    protected $table = 'annual_reports';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'file_path', 'year'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'title' => 'required',
        'file_path' => 'required',
    ];
}
