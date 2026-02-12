<?php

namespace App\Models;

use CodeIgniter\Model;

class DownloadsModel extends Model
{
    protected $table = 'downloads';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'category', 'effective_date', 'file_path', 'status'];

    // Dates
    protected $useTimestamps = false;
    protected $createdField = 'created_at';
}
