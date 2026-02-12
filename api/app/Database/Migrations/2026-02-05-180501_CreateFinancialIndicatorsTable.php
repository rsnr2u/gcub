<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateFinancialIndicatorsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'parameter' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'value_prev_year' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
            ],
            'value_curr_year' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
            ],
            'growth_percentage' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
            ],
            'is_positive_growth' => [
                'type' => 'BOOLEAN',
                'default' => true,
            ],
            'display_order' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('financial_indicators');
    }

    public function down()
    {
        $this->forge->dropTable('financial_indicators');
    }
}
