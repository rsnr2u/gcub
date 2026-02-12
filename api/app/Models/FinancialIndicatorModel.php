<?php

namespace App\Models;

use CodeIgniter\Model;

class FinancialIndicatorModel extends Model
{
    protected $table = 'financial_indicators';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['parameter', 'value_prev_year', 'value_curr_year', 'year_prev', 'year_curr', 'growth_percentage', 'is_positive_growth', 'display_order'];

    protected $useTimestamps = true;
    protected $createdField = ''; // Disable created_at as it does not exist in DB
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'parameter' => 'required',
        'value_prev_year' => 'required',
        'value_curr_year' => 'required',
    ];
}
