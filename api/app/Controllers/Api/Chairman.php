<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ChairmanModel;

class Chairman extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new ChairmanModel();
        // Default sort by display_order then id desc
        $data = $model->orderBy('display_order', 'ASC')->orderBy('id', 'DESC')->findAll();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $model = new ChairmanModel();
        $data = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Profile not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $model = new ChairmanModel();

        $file = $this->request->getFile('image');
        $filePath = null;
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/chairman', $newName);
            $filePath = 'uploads/chairman/' . $newName;
        }

        // Handle Signature Upload
        $signatureFile = $this->request->getFile('signature');
        $signatureFilePath = null;
        if ($signatureFile && $signatureFile->isValid() && !$signatureFile->hasMoved()) {
            $newName = $signatureFile->getRandomName();
            $signatureFile->move(FCPATH . 'uploads/chairman', $newName);
            $signatureFilePath = 'uploads/chairman/' . $newName;
        }

        $data = [
            'name' => $this->request->getVar('name'),
            'designation' => $this->request->getVar('designation'),
            'education' => $this->request->getVar('education'),
            'tenure_start' => $this->request->getVar('tenure_start'),
            'experience' => $this->request->getVar('experience'),
            'image_path' => $filePath,
            'signature_path' => $signatureFilePath,
            'message' => $this->request->getVar('message'),
            'achievement_branches' => $this->request->getVar('achievement_branches') ?? 0,
            'achievement_growth' => $this->request->getVar('achievement_growth'),
            'status' => $this->request->getVar('status') ?? 'draft',
            'display_order' => $this->request->getVar('display_order') ?? 0,
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $model->insertID()]);
        } else {
            return $this->fail($model->errors());
        }
    }

    public function update($id = null)
    {
        $model = new ChairmanModel();
        $existing = $model->find($id);
        if (!$existing) {
            return $this->failNotFound('Profile not found');
        }

        // Handle File Upload
        $file = $this->request->getFile('image');
        $filePath = $existing['image_path']; // Default to existing
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/chairman', $newName);
            $filePath = 'uploads/chairman/' . $newName;

            // Optionally delete old file
            if ($existing['image_path'] && file_exists(FCPATH . $existing['image_path'])) {
                @unlink(FCPATH . $existing['image_path']);
            }
        }

        // Handle Signature Upload
        $signatureFile = $this->request->getFile('signature');
        $signatureFilePath = $existing['signature_path'] ?? null; // Default to existing
        if ($signatureFile && $signatureFile->isValid() && !$signatureFile->hasMoved()) {
            $newName = $signatureFile->getRandomName();
            $signatureFile->move(FCPATH . 'uploads/chairman', $newName);
            $signatureFilePath = 'uploads/chairman/' . $newName;

            // Optionally delete old file
            if (!empty($existing['signature_path']) && file_exists(FCPATH . $existing['signature_path'])) {
                @unlink(FCPATH . $existing['signature_path']);
            }
        }

        // Get raw input if JSON, but getVar works for both form-data and json typically if configured right.
        // Since we are uploading files, we expect FormData.
        // Note: request->getVar() might not work for all PUT requests with FormData depending on server config.
        // For FormData usually POST is used for creation, and often POST with _method=PUT or just POST for updates if FormData is involved.
        // Here we will rely on standard getVar from the request.

        $data = [
            'name' => $this->request->getVar('name') ?? $existing['name'],
            'designation' => $this->request->getVar('designation') ?? $existing['designation'],
            'education' => $this->request->getVar('education') ?? $existing['education'],
            'tenure_start' => $this->request->getVar('tenure_start') ?? $existing['tenure_start'],
            'experience' => $this->request->getVar('experience') ?? $existing['experience'],
            'image_path' => $filePath,
            'signature_path' => $signatureFilePath,
            'message' => $this->request->getVar('message') ?? $existing['message'],
            'achievement_branches' => $this->request->getVar('achievement_branches') ?? $existing['achievement_branches'],
            'achievement_growth' => $this->request->getVar('achievement_growth') ?? $existing['achievement_growth'],
            'status' => $this->request->getVar('status') ?? $existing['status'],
            'display_order' => $this->request->getVar('display_order') ?? $existing['display_order'],
        ];

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        } else {
            return $this->fail($model->errors());
        }
    }

    public function delete($id = null)
    {
        $model = new ChairmanModel();
        $data = $model->find($id);
        if ($data) {
            $model->delete($id);
            // Optionally delete file
            if ($data['image_path'] && file_exists(FCPATH . $data['image_path'])) {
                @unlink(FCPATH . $data['image_path']);
            }
            return $this->respondDeleted(['status' => 'success']);
        } else {
            return $this->failNotFound('Profile not found');
        }
    }
}
