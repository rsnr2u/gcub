<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BankAboutMetadataModel;
use App\Models\BankTimelineModel;
use App\Models\BankCoreValuesModel;
use App\Models\BankNetworkModel;

class BankAbout extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $metaModel = new BankAboutMetadataModel();
        $timelineModel = new BankTimelineModel();
        $valuesModel = new BankCoreValuesModel();
        $networkModel = new BankNetworkModel();

        // Fetch Metadata as key-value pairs
        $metaRaw = $metaModel->findAll();
        $metadata = [];
        foreach ($metaRaw as $row) {
            $metadata[$row['key_name']] = $row['value_text'];
        }

        $data = [
            'metadata' => $metadata,
            'timeline' => $timelineModel->orderBy('sort_order', 'ASC')->orderBy('year', 'ASC')->findAll(),
            'core_values' => $valuesModel->orderBy('sort_order', 'ASC')->findAll(),
            'network' => $networkModel->orderBy('sort_order', 'ASC')->findAll(),
        ];

        return $this->respond($data);
    }

    // Update Metadata (Generic)
    public function updateMetadata()
    {
        $model = new BankAboutMetadataModel();
        $data = $this->request->getJSON(true); // getJSON(true) returns as array
        if (!$data) {
            $data = $this->request->getRawInput(); // Fallback
        }

        // Expecting { "key_name": "value", ... }
        foreach ($data as $key => $value) {
            // Check if key exists
            $existing = $model->where('key_name', $key)->first();
            if ($existing) {
                $model->update($existing['id'], ['value_text' => $value]);
            } else {
                // Optional: Insert if not exists, or ignore
                $model->insert(['key_name' => $key, 'value_text' => $value]);
            }
        }
        return $this->respond(['status' => 'success', 'message' => 'Metadata updated']);
    }

    // --- Timeline CRUD ---
    public function addTimeline()
    {
        $model = new BankTimelineModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = [
                'year' => $this->request->getVar('year'),
                'title' => $this->request->getVar('title'),
                'description' => $this->request->getVar('description'),
                'sort_order' => $this->request->getVar('sort_order') ?? 0
            ];
        }

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $model->insertID()]);
        }
        return $this->fail($model->errors());
    }

    public function updateTimeline($id = null)
    {
        $model = new BankTimelineModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = $this->request->getRawInput();
            if (empty($data)) {
                $data = [
                    'year' => $this->request->getVar('year'),
                    'title' => $this->request->getVar('title'),
                    'description' => $this->request->getVar('description'),
                    'sort_order' => $this->request->getVar('sort_order')
                ];
            }
        }

        // Clean up empty fields if they come from getVar fallback
        $data = array_filter($data, function ($value) {
            return $value !== null;
        });

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($model->errors());
    }

    public function deleteTimeline($id = null)
    {
        $model = new BankTimelineModel();
        $model->delete($id);
        return $this->respondDeleted(['status' => 'success']);
    }

    // --- Core Values CRUD ---
    public function addValue()
    {
        $model = new BankCoreValuesModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = [
                'title' => $this->request->getVar('title'),
                'sort_order' => $this->request->getVar('sort_order') ?? 0
            ];
        }

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $model->insertID()]);
        }
        return $this->fail($model->errors());
    }

    public function updateValue($id = null)
    {
        $model = new BankCoreValuesModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = $this->request->getRawInput();
            if (empty($data)) {
                $data = [
                    'title' => $this->request->getVar('title'),
                    'sort_order' => $this->request->getVar('sort_order')
                ];
            }
        }

        $data = array_filter($data, function ($v) {
            return $v !== null; });

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($model->errors());
    }

    public function deleteValue($id = null)
    {
        $model = new BankCoreValuesModel();
        $model->delete($id);
        return $this->respondDeleted(['status' => 'success']);
    }

    // --- Network CRUD ---
    public function addNetwork()
    {
        $model = new BankNetworkModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = [
                'region_name' => $this->request->getVar('region_name'),
                'branch_count' => $this->request->getVar('branch_count'),
                'sort_order' => $this->request->getVar('sort_order') ?? 0
            ];
        }

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => 'success', 'id' => $model->insertID()]);
        }
        return $this->fail($model->errors());
    }

    public function updateNetwork($id = null)
    {
        $model = new BankNetworkModel();

        $data = $this->request->getJSON(true);
        if (!$data) {
            $data = $this->request->getRawInput();
            if (empty($data)) {
                $data = [
                    'region_name' => $this->request->getVar('region_name'),
                    'branch_count' => $this->request->getVar('branch_count'),
                    'sort_order' => $this->request->getVar('sort_order')
                ];
            }
        }

        $data = array_filter($data, function ($v) {
            return $v !== null; });

        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success']);
        }
        return $this->fail($model->errors());
    }

    public function deleteNetwork($id = null)
    {
        $model = new BankNetworkModel();
        $model->delete($id);
        return $this->respondDeleted(['status' => 'success']);
    }
}
