<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use CodeIgniter\API\ResponseTrait;

class Products extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new ProductModel();
    }

    // List all products
    public function index()
    {
        $products = $this->model->orderBy('category', 'ASC')->findAll();
        return $this->respond($products);
    }

    // Get single product by ID or slug
    public function show($idOrSlug = null)
    {
        if (!$idOrSlug) {
            return $this->fail('ID or Slug required', 400);
        }

        // Check if numeric (ID) or string (slug)
        if (is_numeric($idOrSlug)) {
            $product = $this->model->find($idOrSlug);
        } else {
            $product = $this->model->where('slug', $idOrSlug)->first();
        }

        if (!$product) {
            return $this->failNotFound('Product not found');
        }

        return $this->respond($product);
    }

    // Create a new product
    public function create()
    {
        $data = $this->request->getPost();

        // Handle Icon Upload
        $iconFile = $this->request->getFile('icon_file');
        if ($iconFile && $iconFile->isValid() && !$iconFile->hasMoved()) {
            $newName = $iconFile->getRandomName();
            $iconFile->move(FCPATH . '../../gcub/public/assets/images/icons', $newName);
            $data['icon_value'] = $newName;
        }

        // Handle Banner Upload
        $bannerFile = $this->request->getFile('image_file');
        if ($bannerFile && $bannerFile->isValid() && !$bannerFile->hasMoved()) {
            $newName = $bannerFile->getRandomName();
            $bannerFile->move(FCPATH . '../../gcub/public/assets/images/banner', $newName);
            $data['image_path'] = $newName;
        }

        if ($this->model->insert($data)) {
            $id = $this->model->getInsertID();
            return $this->respondCreated(['status' => 'success', 'id' => $id, 'message' => 'Product created successfully']);
        }
        return $this->fail('Failed to create product');
    }

    // Update product
    public function update($id = null)
    {
        if (!$id)
            return $this->fail('ID required', 400);

        $data = $this->request->getPost();

        // Handle Icon Upload
        $iconFile = $this->request->getFile('icon_file');
        if ($iconFile && $iconFile->isValid() && !$iconFile->hasMoved()) {
            $newName = $iconFile->getRandomName();
            $iconFile->move(FCPATH . '../../gcub/public/assets/images/icons', $newName);
            $data['icon_value'] = $newName;
        }

        // Handle Banner Upload
        $bannerFile = $this->request->getFile('image_file');
        if ($bannerFile && $bannerFile->isValid() && !$bannerFile->hasMoved()) {
            $newName = $bannerFile->getRandomName();
            $bannerFile->move(FCPATH . '../../gcub/public/assets/images/banner', $newName);
            $data['image_path'] = $newName;
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Product updated successfully']);
        }
        return $this->fail('Failed to update product');
    }

    // Delete product
    public function delete($id = null)
    {
        if (!$id)
            return $this->fail('ID required', 400);

        if ($this->model->delete($id)) {
            return $this->respond(['status' => 'success', 'message' => 'Product deleted successfully']);
        }
        return $this->fail('Failed to delete product');
    }
}
