<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\NewsModel;

class News extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new NewsModel();
        $news = $model->orderBy('created_at', 'DESC')->findAll();
        return $this->respond($news);
    }

    public function latest()
    {
        $model = new NewsModel();
        $news = $model->where('is_latest', 1)->orderBy('created_at', 'DESC')->findAll();
        return $this->respond($news);
    }

    public function show($id)
    {
        $model = new NewsModel();
        $news = $model->find($id);
        if (!$news) {
            return $this->failNotFound('News not found');
        }
        return $this->respond($news);
    }

    public function create()
    {
        $model = new NewsModel();
        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/assets/images/news', $newName);
            $data['image'] = 'assets/images/news/' . $newName;
        }

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'message' => 'News created successfully']);
        }

        return $this->fail($model->errors());
    }

    public function update($id)
    {
        $model = new NewsModel();
        $news = $model->find($id);
        if (!$news) {
            return $this->failNotFound('News not found');
        }

        $data = $this->request->getPost();

        $file = $this->request->getFile('image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Delete old image if it exists
            if (!empty($news['image']) && file_exists(ROOTPATH . 'public/' . $news['image'])) {
                @unlink(ROOTPATH . 'public/' . $news['image']);
            }

            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/assets/images/news', $newName);
            $data['image'] = 'assets/images/news/' . $newName;
        }

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'News updated successfully']);
        }

        return $this->fail($model->errors());
    }

    public function delete($id)
    {
        $model = new NewsModel();
        $news = $model->find($id);
        if (!$news) {
            return $this->failNotFound('News not found');
        }

        if (!empty($news['image']) && file_exists(ROOTPATH . 'public/' . $news['image'])) {
            @unlink(ROOTPATH . 'public/' . $news['image']);
        }

        if ($model->delete($id)) {
            return $this->respondDeleted(['status' => 'success', 'message' => 'News deleted successfully']);
        }

        return $this->fail('Failed to delete news');
    }
}
