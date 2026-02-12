<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RemoveStatsFromHomePageContent extends Migration
{
    public function up()
    {
        $this->forge->dropColumn('home_page_content', ['stat_years', 'stat_branches', 'stat_business', 'stat_customers']);
    }

    public function down()
    {
        $this->forge->addColumn('home_page_content', [
            'stat_years' => ['type' => 'VARCHAR', 'constraint' => '20', 'null' => true],
            'stat_branches' => ['type' => 'VARCHAR', 'constraint' => '20', 'null' => true],
            'stat_business' => ['type' => 'VARCHAR', 'constraint' => '20', 'null' => true],
            'stat_customers' => ['type' => 'VARCHAR', 'constraint' => '20', 'null' => true],
        ]);
    }
}
