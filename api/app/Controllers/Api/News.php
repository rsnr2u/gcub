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
}
