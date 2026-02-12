<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ContactSubmissionModel;

class ContactSubmissions extends ResourceController
{
    protected $model;
    protected $format = 'json';

    public function __construct()
    {
        $this->model = new ContactSubmissionModel();
    }

    /**
     * Get all submissions (admin)
     */
    public function index()
    {
        $status = $this->request->getGet('status');

        if ($status && in_array($status, ['new', 'in_progress', 'resolved'])) {
            $submissions = $this->model->getByStatus($status);
        } else {
            $submissions = $this->model->getAllOrdered();
        }

        // Get counts for each status
        $counts = [
            'new' => $this->model->getCountByStatus('new'),
            'in_progress' => $this->model->getCountByStatus('in_progress'),
            'resolved' => $this->model->getCountByStatus('resolved'),
            'total' => $this->model->countAll()
        ];

        return $this->respond([
            'submissions' => $submissions,
            'counts' => $counts
        ]);
    }

    /**
     * Get single submission
     */
    public function show($id = null)
    {
        $submission = $this->model->find($id);

        if (!$submission) {
            return $this->failNotFound('Submission not found');
        }

        return $this->respond($submission);
    }

    /**
     * Create new submission (public)
     */
    public function create()
    {
        $data = $this->request->getJSON(true);

        // Add submission timestamp
        $data['submitted_at'] = date('Y-m-d H:i:s');
        $data['status'] = 'new';

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respondCreated([
            'status' => 'success',
            'message' => 'Your message has been submitted successfully. We will get back to you soon.',
            'id' => $this->model->getInsertID()
        ]);
    }

    /**
     * Update submission status
     */
    public function updateStatus($id = null)
    {
        $submission = $this->model->find($id);

        if (!$submission) {
            return $this->failNotFound('Submission not found');
        }

        $data = $this->request->getJSON(true);

        if (!isset($data['status']) || !in_array($data['status'], ['new', 'in_progress', 'resolved'])) {
            return $this->fail('Invalid status value');
        }

        $updateData = [
            'status' => $data['status'],
            'updated_at' => date('Y-m-d H:i:s')
        ];

        if (!$this->model->update($id, $updateData)) {
            return $this->fail('Failed to update status');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Status updated successfully'
        ]);
    }

    /**
     * Update admin notes
     */
    public function updateNotes($id = null)
    {
        $submission = $this->model->find($id);

        if (!$submission) {
            return $this->failNotFound('Submission not found');
        }

        $data = $this->request->getJSON(true);

        $updateData = [
            'admin_notes' => $data['admin_notes'] ?? '',
            'updated_at' => date('Y-m-d H:i:s')
        ];

        if (!$this->model->update($id, $updateData)) {
            return $this->fail('Failed to update notes');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Notes updated successfully'
        ]);
    }

    /**
     * Delete submission
     */
    public function delete($id = null)
    {
        $submission = $this->model->find($id);

        if (!$submission) {
            return $this->failNotFound('Submission not found');
        }

        if (!$this->model->delete($id)) {
            return $this->fail('Failed to delete submission');
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Submission deleted successfully'
        ]);
    }
}
