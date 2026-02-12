<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Sliders extends ResourceController
{
    protected $modelName = 'App\Models\SliderModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->orderBy('display_order', 'ASC')->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Slider not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getPost();

        // Handle file upload
        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/sliders', $newName);
            $data['image_path'] = 'uploads/sliders/' . $newName;
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $this->model->insertID()]);
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getPost();

        // Handle file upload
        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Delete old image if exists
            $oldData = $this->model->find($id);
            if ($oldData && !empty($oldData['image_path'])) {
                $oldPath = FCPATH . $oldData['image_path'];
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Upload new image
            $newName = $file->getRandomName();
            $file->move(FCPATH . 'uploads/sliders', $newName);
            $data['image_path'] = 'uploads/sliders/' . $newName;
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($this->model->errors());
    }

    public function delete($id = null)
    {
        // Delete image file if exists
        $data = $this->model->find($id);
        if ($data && !empty($data['image_path'])) {
            $imagePath = FCPATH . $data['image_path'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 'success']);
        }
        return $this->fail('Delete failed');
    }
}
