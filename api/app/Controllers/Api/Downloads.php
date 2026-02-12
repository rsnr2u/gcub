<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\DownloadsModel;
use CodeIgniter\API\ResponseTrait;

class Downloads extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new DownloadsModel();
    }

    // List all downloads
    public function index()
    {
        $downloads = $this->model->orderBy('created_at', 'DESC')->findAll();
        return $this->respond($downloads);
    }

    // Show single download
    public function show($id = null)
    {
        if (!$id)
            return $this->fail('ID required', 400);
        $download = $this->model->find($id);
        if (!$download)
            return $this->failNotFound('Download not found');
        return $this->respond($download);
    }

    // Create a new download
    public function create()
    {
        $data = $this->request->getPost();

        // Handle File Upload
        $file = $this->request->getFile('download_file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $fileName = \App\Helpers\FileUploadHelper::upload($file, 'docs');
            if ($fileName) {
                $data['file_path'] = 'assets/uploads/docs/' . $fileName;
            }
        }

        if ($this->model->insert($data)) {
            $id = $this->model->getInsertID();
            return $this->respondCreated(['status' => 'success', 'id' => $id, 'message' => 'Download created successfully']);
        }
        return $this->fail('Failed to create download');
    }

    // Update download
    public function update($id = null)
    {
        if (!$id)
            return $this->fail('ID required', 400);

        $data = $this->request->getPost();

        // Handle File Upload
        $file = $this->request->getFile('download_file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $fileName = \App\Helpers\FileUploadHelper::upload($file, 'docs');
            if ($fileName) {
                $data['file_path'] = 'assets/uploads/docs/' . $fileName;
            }
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Download updated successfully']);
        }
        return $this->fail('Failed to update download');
    }

    // Delete download
    public function delete($id = null)
    {
        if (!$id)
            return $this->fail('ID required', 400);

        if ($this->model->delete($id)) {
            return $this->respond(['status' => 'success', 'message' => 'Download deleted successfully']);
        }
        return $this->fail('Failed to delete download');
    }
}
