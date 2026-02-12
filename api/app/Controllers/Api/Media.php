<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Helpers\FileUploadHelper;
use CodeIgniter\API\ResponseTrait;

class Media extends BaseController
{
    use ResponseTrait;

    /**
     * Generic upload endpoint for any authorized module.
     * Supports: Images (jpg, png, webp) and Documents (pdf, docx)
     */
    public function upload()
    {
        $file = $this->request->getFile('file');

        if (!$file) {
            return $this->fail('No file provided', 400);
        }

        if (!$file->isValid()) {
            return $this->fail($file->getErrorString(), 400);
        }

        // Determine destination based on extension
        $ext = $file->getExtension();
        $targetFolder = FileUploadHelper::getTargetFolder($ext);

        $fileName = FileUploadHelper::upload($file, $targetFolder);

        if ($fileName) {
            return $this->respond([
                'status' => 'success',
                'message' => 'File uploaded successfully',
                'file_name' => $fileName,
                'file_path' => 'assets/uploads/' . $targetFolder . '/' . $fileName,
                'full_url' => base_url('assets/uploads/' . $targetFolder . '/' . $fileName)
            ]);
        }

        return $this->fail('Failed to move uploaded file');
    }
}
