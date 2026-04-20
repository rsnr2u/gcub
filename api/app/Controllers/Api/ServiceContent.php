<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class ServiceContent extends ResourceController
{
    protected $format = 'json';

    private function getModel($slug)
    {
        $map = [
            'mobile-banking' => \App\Models\Services\MobileBankingModel::class,
            'atm-services' => \App\Models\Services\AtmServiceModel::class,
            'toll-free-banking' => \App\Models\Services\TollFreeModel::class,
            'e-statements' => \App\Models\Services\EStatementsModel::class,
            'positive-pay-system' => \App\Models\Services\PositivePayModel::class,
            'any-branch-banking' => \App\Models\Services\AnyBranchModel::class,
            'apbs-service' => \App\Models\Services\ApbsModel::class,
            'nach-service' => \App\Models\Services\NachModel::class,
            'imps' => \App\Models\Services\ImpsModel::class,
            'upi' => \App\Models\Services\UpiModel::class,
            'rupay' => \App\Models\Services\RupayModel::class,
            'neft-rtgs' => \App\Models\Services\NeftRtgsModel::class,
            'net-banking' => \App\Models\Services\NetBankingModel::class,
        ];

        if (!isset($map[$slug])) return null;
        $className = $map[$slug];
        return new $className();
    }

    public function show($slug = null)
    {
        $model = $this->getModel($slug);
        if (!$model) return $this->failNotFound('Service not found');

        $data = $model->where('slug', $slug)->first();
        if (!$data) return $this->failNotFound('Service content not found');

        // Decode JSON fields for the frontend
        foreach ($data as $key => $value) {
            if (str_ends_with($key, '_json')) {
                $data[$key] = json_decode($value);
            }
        }

        return $this->respond($data);
    }

    public function update($slug = null)
    {
        $model = $this->getModel($slug);
        if (!$model) return $this->failNotFound('Service not found');

        $json = $this->request->getJSON(true);
        $existing = $model->where('slug', $slug)->first();
        if (!$existing) return $this->failNotFound('Service content not found');

        // Encode JSON fields back for the DB
        foreach ($json as $key => $value) {
            if (str_ends_with($key, '_json') && !is_string($value)) {
                $json[$key] = json_encode($value);
            }
        }

        if ($model->update($existing['id'], $json)) {
            return $this->respond(['status' => 'success', 'message' => 'Service updated successfully']);
        }
        
        return $this->fail('Update failed');
    }
}
