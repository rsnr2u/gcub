<?php

namespace App\Models;

use CodeIgniter\Model;

class QuickAccessModel extends Model
{
    protected $table = 'quick_access_items';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'icon', 'link', 'sort_order', 'is_active'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'title' => 'required|max_length[100]',
        'icon' => 'required|max_length[100]',
        'link' => 'required|max_length[255]',
    ];

    protected $validationMessages = [
        'title' => [
            'required' => 'Title is required',
        ],
        'icon' => [
            'required' => 'Icon is required',
        ],
        'link' => [
            'required' => 'Link is required',
        ],
    ];

    /**
     * Get all active items ordered by sort_order
     */
    public function getActiveItems()
    {
        return $this->where('is_active', 1)
            ->orderBy('sort_order', 'ASC')
            ->findAll();
    }

    /**
     * Get all items ordered by sort_order (for admin)
     */
    public function getAllOrdered()
    {
        return $this->orderBy('sort_order', 'ASC')->findAll();
    }
}
