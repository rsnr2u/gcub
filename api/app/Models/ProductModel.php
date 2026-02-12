<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['name', 'slug', 'category', 'description', 'icon_type', 'icon_value', 'status', 'hero_description', 'long_description', 'features', 'eligibility', 'documents', 'image_path', 'terms_heading', 'terms_content'];

    protected $useTimestamps = true;
    protected $createdField = ''; // Handled by MySQL
    protected $updatedField = 'updated_at';
}
