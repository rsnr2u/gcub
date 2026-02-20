<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\GalleryModel;
use App\Models\GalleryImageModel;

class Gallery extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new GalleryModel();
        $imageModel = new GalleryImageModel();

        $gallery = $model->orderBy('created_at', 'DESC')->findAll();

        foreach ($gallery as &$item) {
            $item['images'] = $imageModel->where('gallery_id', $item['id'])->findAll();
        }

        return $this->respond($gallery);
    }

    public function show($id)
    {
        $model = new GalleryModel();
        $imageModel = new GalleryImageModel();

        $item = $model->find($id);
        if (!$item) {
            return $this->failNotFound('Gallery item not found');
        }

        $item['images'] = $imageModel->where('gallery_id', $id)->findAll();

        return $this->respond($item);
    }

    public function create()
    {
        $model = new GalleryModel();
        $imageModel = new GalleryImageModel();

        $data = $this->request->getPost();

        // Use the first image as the main 'image' for backward compatibility/thumbnail
        $files = $this->request->getFiles();

        if ($model->insert($data)) {
            $galleryId = $model->getInsertID();

            if (isset($files['images'])) {
                foreach ($files['images'] as $file) {
                    if ($file->isValid() && !$file->hasMoved()) {
                        $newName = $file->getRandomName();
                        $file->move(ROOTPATH . 'public/assets/images/gallery', $newName);

                        $imagePath = 'assets/images/gallery/' . $newName;

                        $imageModel->insert([
                            'gallery_id' => $galleryId,
                            'image' => $imagePath
                        ]);

                        // Update main image of the post if not set
                        if (empty($data['image'])) {
                            $model->update($galleryId, ['image' => $imagePath]);
                            $data['image'] = $imagePath; // prevent re-setting
                        }
                    }
                }
            }

            return $this->respondCreated(['status' => 'success', 'message' => 'Gallery item created successfully', 'id' => $galleryId]);
        }

        return $this->fail($model->errors());
    }

    public function update($id)
    {
        $model = new GalleryModel();
        $imageModel = new GalleryImageModel();

        $item = $model->find($id);
        if (!$item) {
            return $this->failNotFound('Gallery item not found');
        }

        $data = $this->request->getPost();
        $files = $this->request->getFiles();

        if ($model->update($id, $data)) {
            if (isset($files['images'])) {
                foreach ($files['images'] as $file) {
                    if ($file->isValid() && !$file->hasMoved()) {
                        $newName = $file->getRandomName();
                        $file->move(ROOTPATH . 'public/assets/images/gallery', $newName);

                        $imagePath = 'assets/images/gallery/' . $newName;

                        $imageModel->insert([
                            'gallery_id' => $id,
                            'image' => $imagePath
                        ]);

                        // If current item has no main image, set this as main
                        if (empty($item['image'])) {
                            $model->update($id, ['image' => $imagePath]);
                            $item['image'] = $imagePath;
                        }
                    }
                }
            }

            return $this->respond(['status' => 'success', 'message' => 'Gallery item updated successfully']);
        }

        return $this->fail($model->errors());
    }

    public function delete($id)
    {
        $model = new GalleryModel();
        $imageModel = new GalleryImageModel();

        $item = $model->find($id);
        if (!$item) {
            return $this->failNotFound('Gallery item not found');
        }

        // Fetch all images for this post
        $images = $imageModel->where('gallery_id', $id)->findAll();

        foreach ($images as $img) {
            if (!empty($img['image']) && file_exists(ROOTPATH . 'public/' . $img['image'])) {
                @unlink(ROOTPATH . 'public/' . $img['image']);
            }
        }

        // Delete from DB (gallery_images will be deleted by ON DELETE CASCADE if set, but CI doesn't always rely on it)
        $imageModel->where('gallery_id', $id)->delete();

        if ($model->delete($id)) {
            return $this->respondDeleted(['status' => 'success', 'message' => 'Gallery item deleted successfully']);
        }

        return $this->fail('Failed to delete gallery item');
    }

    // Additional method to delete a single image from a post
    public function deleteImage($imageId)
    {
        $imageModel = new GalleryImageModel();
        $image = $imageModel->find($imageId);

        if (!$image) {
            return $this->failNotFound('Image not found');
        }

        if (!empty($image['image']) && file_exists(ROOTPATH . 'public/' . $image['image'])) {
            @unlink(ROOTPATH . 'public/' . $image['image']);
        }

        if ($imageModel->delete($imageId)) {
            return $this->respondDeleted(['status' => 'success', 'message' => 'Image deleted successfully']);
        }

        return $this->fail('Failed to delete image');
    }
}
