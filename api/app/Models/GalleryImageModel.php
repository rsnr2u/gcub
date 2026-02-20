<?php
namespace App\Models;

use CodeIgniter\Model;

class GalleryImageModel extends Model
{
    protected $table = 'gallery_images';
    protected $primaryKey = 'id';
    protected $allowedFields = ['gallery_id', 'image', 'created_at'];
    protected $useTimestamps = false;
}
