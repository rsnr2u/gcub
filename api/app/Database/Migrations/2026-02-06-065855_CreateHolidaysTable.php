<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateHolidaysTable extends Migration
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
            'holiday_date' => [
                'type' => 'DATE',
            ],
            'day_name' => [
                'type' => 'VARCHAR',
                'constraint' => '20',
            ],
            'occasion' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'is_active' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 1,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('holidays');

        // Seed default holidays
        $db = \Config\Database::connect();
        $holidays = [
            ['holiday_date' => '2026-01-26', 'day_name' => 'Monday', 'occasion' => 'Republic Day'],
            ['holiday_date' => '2026-03-25', 'day_name' => 'Wednesday', 'occasion' => 'Holi'],
            ['holiday_date' => '2026-04-14', 'day_name' => 'Tuesday', 'occasion' => 'Dr. Ambedkar Jayanti'],
            ['holiday_date' => '2026-08-15', 'day_name' => 'Saturday', 'occasion' => 'Independence Day'],
            ['holiday_date' => '2026-10-02', 'day_name' => 'Friday', 'occasion' => 'Gandhi Jayanti'],
            ['holiday_date' => '2026-12-25', 'day_name' => 'Friday', 'occasion' => 'Christmas'],
        ];

        foreach ($holidays as $holiday) {
            $holiday['created_at'] = date('Y-m-d H:i:s');
            $holiday['updated_at'] = date('Y-m-d H:i:s');
            $db->table('holidays')->insert($holiday);
        }
    }

    public function down()
    {
        $this->forge->dropTable('holidays');
    }
}
