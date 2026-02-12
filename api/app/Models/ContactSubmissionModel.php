<?php

namespace App\Models;

use CodeIgniter\Model;

class ContactSubmissionModel extends Model
{
    protected $table = 'contact_submissions';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'request_type',
        'full_name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'admin_notes',
        'submitted_at',
        'updated_at'
    ];

    // Dates
    protected $useTimestamps = false; // We'll handle timestamps manually
    protected $dateFormat = 'datetime';

    // Validation
    protected $validationRules = [
        'request_type' => 'required|max_length[100]',
        'full_name' => 'required|max_length[255]',
        'email' => 'required|valid_email|max_length[255]',
        'phone' => 'permit_empty|max_length[20]',
        'subject' => 'permit_empty|max_length[255]',
        'message' => 'required',
    ];

    protected $validationMessages = [
        'request_type' => [
            'required' => 'Request type is required',
        ],
        'full_name' => [
            'required' => 'Full name is required',
        ],
        'email' => [
            'required' => 'Email is required',
            'valid_email' => 'Please provide a valid email address',
        ],
        'message' => [
            'required' => 'Message is required',
        ],
    ];

    /**
     * Get submissions by status
     */
    public function getByStatus($status)
    {
        return $this->where('status', $status)
            ->orderBy('submitted_at', 'DESC')
            ->findAll();
    }

    /**
     * Get all submissions ordered by date
     */
    public function getAllOrdered()
    {
        return $this->orderBy('submitted_at', 'DESC')->findAll();
    }

    /**
     * Get count by status
     */
    public function getCountByStatus($status)
    {
        return $this->where('status', $status)->countAllResults();
    }
}
