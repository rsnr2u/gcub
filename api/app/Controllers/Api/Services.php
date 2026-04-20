<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ServiceModel;

class Services extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new ServiceModel();
        
        // Check if there's a filter for status
        $status = $this->request->getVar('status');
        if ($status) {
            $model->where('status', $status);
        }
        
        $services = $model->orderBy('created_at', 'DESC')->findAll();
        return $this->respond($services);
    }

    public function show($idOrSlug)
    {
        $model = new ServiceModel();
        
        // Find by ID or Slug
        if (is_numeric($idOrSlug)) {
            $service = $model->find($idOrSlug);
        } else {
            $service = $model->where('slug', $idOrSlug)->first();
        }
        
        if (!$service) {
            return $this->failNotFound('Service not found');
        }
        return $this->respond($service);
    }

    public function create()
    {
        $model = new ServiceModel();
        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/assets/images/services', $newName);
            $data['image_path'] = 'assets/images/services/' . $newName;
        }

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'message' => 'Service created successfully']);
        }

        return $this->fail($model->errors());
    }

    public function update($id)
    {
        $model = new ServiceModel();
        $service = $model->find($id);
        if (!$service) {
            return $this->failNotFound('Service not found');
        }

        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Delete old image if it exists
            if (!empty($service['image_path']) && file_exists(ROOTPATH . 'public/' . $service['image_path'])) {
                @unlink(ROOTPATH . 'public/' . $service['image_path']);
            }

            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/assets/images/services', $newName);
            $data['image_path'] = 'assets/images/services/' . $newName;
        }

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Service updated successfully']);
        }

        return $this->fail($model->errors());
    }

    public function delete($id)
    {
        $model = new ServiceModel();
        $service = $model->find($id);
        if (!$service) {
            return $this->failNotFound('Service not found');
        }

        if (!empty($service['image_path']) && file_exists(ROOTPATH . 'public/' . $service['image_path'])) {
            @unlink(ROOTPATH . 'public/' . $service['image_path']);
        }

        if ($model->delete($id)) {
            return $this->respondDeleted(['status' => 'success', 'message' => 'Service deleted successfully']);
        }

        return $this->fail('Failed to delete service');
    }
}
