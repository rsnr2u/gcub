<?php

namespace App\Helpers;

use CodeIgniter\Files\File;

class FileUploadHelper
{
    /**
     * Handle file upload to a specific subfolder within the unified uploads directory.
     * 
     * @param \CodeIgniter\HTTP\Files\UploadedFile $file The uploaded file object
     * @param string $subfolder Subfolder name ('images', 'docs', etc.)
     * @return string|false The new filename on success, false on failure
     */
    public static function upload($file, $subfolder = 'docs')
    {
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();

            // Base path: public/assets/uploads/
            $uploadPath = FCPATH . 'assets' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $subfolder;

            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            if ($file->move($uploadPath, $newName)) {
                return $newName;
            }
        }
        return false;
    }

    /**
     * Determine the correct subfolder based on file extension
     */
    public static function getTargetFolder($extension)
    {
        $imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        $docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];

        if (in_array(strtolower($extension), $imageExts)) {
            return 'images';
        }
        if (in_array(strtolower($extension), $docExts)) {
            return 'docs';
        }
        return 'others';
    }
}
