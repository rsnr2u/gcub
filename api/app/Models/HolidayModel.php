<?php

namespace App\Models;

use CodeIgniter\Model;

class HolidayModel extends Model
{
    protected $table = 'holidays';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['holiday_date', 'day_name', 'occasion', 'is_active'];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'holiday_date' => 'required|valid_date',
        'day_name' => 'required|max_length[20]',
        'occasion' => 'required|max_length[255]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}
