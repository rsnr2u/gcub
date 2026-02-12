<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddYearsToFinancialIndicators extends Migration
{
    public function up()
    {
        $fields = [
            'year_prev' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
                'after' => 'value_prev_year',
                'default' => "Mar '23"
            ],
            'year_curr' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
                'after' => 'value_curr_year',
                'default' => "Mar '24"
            ],
        ];
        $this->forge->addColumn('financial_indicators', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('financial_indicators', ['year_prev', 'year_curr']);
    }
}
