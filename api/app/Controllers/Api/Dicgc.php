<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\DicgcCertificateModel;

class Dicgc extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new DicgcCertificateModel();
        // We only expect one record, generally
        $data = $model->first();
        if (!$data) {
            // Return default empty structure if nothing exists
            $data = [
                'id' => null,
                'title' => '',
                'description' => '',
                'file_path' => ''
            ];
        }
        return $this->respond($data);
    }

    public function update($id = null)
    {
        $model = new DicgcCertificateModel();

        // Check if a record exists
        $existing = $model->first();
        $id = $existing ? $existing['id'] : null;

        $rules = [
            'title' => 'max_length[255]',
            'description' => 'max_length[65535]', // Text field
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'title' => $this->request->getPost('title'),
            'description' => $this->request->getPost('description'),
        ];

        // Handle File Upload
        $file = $this->request->getFile('file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Move file to public/uploads/dicgc
            // Note: Adjust path as per project convention, assuming 'uploads' in public or writable
            // Based on other controllers, it seems standard uploads might be in public/uploads
            if (!is_dir(FCPATH . 'uploads')) {
                mkdir(FCPATH . 'uploads', 0777, true);
            }

            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads', $newName);

            // Delete old file if exists
            if ($existing && !empty($existing['file_path'])) {
                $oldFile = FCPATH . $existing['file_path'];
                if (file_exists($oldFile)) {
                    @unlink($oldFile);
                }
            }

            $data['file_path'] = 'uploads/' . $newName;
        }

        if ($id) {
            $model->update($id, $data);
            $response = ['status' => 'success', 'message' => 'DICGC Certificate updated successfully', 'data' => $data];
        } else {
            $model->insert($data);
            $response = ['status' => 'success', 'message' => 'DICGC Certificate created successfully', 'data' => $data];
        }

        return $this->respond($response);
    }
}
