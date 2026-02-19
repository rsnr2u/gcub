<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $jsonPath = ROOTPATH . '../products.json';
        
        if (!file_exists($jsonPath)) {
            echo "products.json not found at: " . $jsonPath . "\n";
            return;
        }

        $jsonContent = file_get_contents($jsonPath);
        
        // Strip BOM if present
        $bom = pack('H*', 'EFBBBF');
        $jsonContent = preg_replace("/^$bom/", '', $jsonContent);

        $products = json_decode($jsonContent, true);



        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "JSON Decode Error: " . json_last_error_msg() . "\n";
            return;
        }

        $db = \Config\Database::connect();
        $builder = $db->table('products');

        foreach ($products as $product) {
            // Ensure fields exist in DB
            $data = [
                'name'             => $product['name'] ?? '',
                'slug'             => $product['slug'] ?? '',
                'category'         => $product['category'] ?? '',
                'description'      => $product['description'] ?? '',
                'hero_description' => $product['hero_description'] ?? '',
                'long_description' => $product['long_description'] ?? '',
                'features'         => $product['features'] ?? null,
                'eligibility'      => $product['eligibility'] ?? null,
                'documents'        => $product['documents'] ?? null,
                'icon_type'        => $product['icon_type'] ?? 'icon',
                'icon_value'       => $product['icon_value'] ?? '',
                'image_path'       => $product['image_path'] ?? '',
                'status'           => $product['status'] ?? 1,
                'terms_heading'    => $product['terms_heading'] ?? null,
                'terms_content'    => $product['terms_content'] ?? null,
                'updated_at'       => $product['updated_at'] ?? date('Y-m-d H:i:s'),
                'created_at'       => date('Y-m-d H:i:s'),
            ];

            $builder->insert($data);
        }

        echo "Seeded " . count($products) . " products.\n";
    }
}
