<?php
$mysqli = new mysqli("localhost", "root", "", "gcub_db");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// 1. Check if column exists
$result = $mysqli->query("SHOW COLUMNS FROM `branches` LIKE 'is_head_office'");
if ($result->num_rows == 0) {
    echo "Column 'is_head_office' does not exist. Adding it...\n";
    if ($mysqli->query("ALTER TABLE `branches` ADD COLUMN `is_head_office` TINYINT(1) DEFAULT 0")) {
        echo "Column added successfully.\n";
    } else {
        echo "Error adding column: " . $mysqli->error . "\n";
    }
} else {
    echo "Column 'is_head_office' already exists.\n";
}

// 2. Reset all to 0
$mysqli->query("UPDATE branches SET is_head_office = 0");

// 3. Remove any previous details of "Head Office" to avoid duplicates (based on name)
$mysqli->query("DELETE FROM branches WHERE name = 'Head Office'");

// 4. Insert Head Office
$sql = "INSERT INTO branches (name, region, ifsc, micr, contact, email, address, google_maps_link, status, is_head_office) 
        VALUES ('Head Office', 'GUNTUR • GUNTUR DIST.', 'GCUB0000001', '522000001', '0863-2220000', 'headoffice@gcub.com', 'Registered Office: 2/14 Brodipet, Guntur - 522002', 'https://maps.google.com/?q=2/14+Brodipet,+Guntur+-+522002', 'active', 1)";

if ($mysqli->query($sql)) {
    echo "Head Office record inserted successfully.\n";
} else {
    echo "Error inserting Head Office: " . $mysqli->error . "\n";
}

// 5. Verify
$res = $mysqli->query("SELECT name, is_head_office FROM branches ORDER BY is_head_office DESC");
while ($row = $res->fetch_assoc()) {
    echo $row['name'] . " (" . $row['is_head_office'] . ")\n";
}
?>