<?php
$mysqli = new mysqli("localhost", "root", "", "gcub_db");

if ($mysqli->connect_errno) {
    die("Failed to connect to MySQL: " . $mysqli->connect_error);
}

// 1. bank_about_metadata
$sql = "CREATE TABLE IF NOT EXISTS `bank_about_metadata` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `key_name` VARCHAR(50) NOT NULL UNIQUE,
    `value_text` TEXT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($mysqli->query($sql))
    echo "Table bank_about_metadata created.\n";
else
    echo "Error creating bank_about_metadata: " . $mysqli->error . "\n";

// Seed Metadata
$metadata = [
    'legacy_years' => '75+',
    'legacy_branches' => '22',
    'legacy_volume' => '₹1012Cr+',
    'legacy_customers' => '50k+',
    'welcome_title' => 'Welcome to The Guntur Co-operative Urban Bank Limited',
    'welcome_text' => 'The Guntur Co-operative Urban Bank Limited stands as a pillar of financial stability in Andhra Pradesh...',
    'welcome_image' => '',
    'vision_text' => 'To be a trusted and progressive co-operative bank, delivering secure, inclusive, and sustainable banking solutions.',
    'mission_text' => 'We blend cooperative values with modern banking efficiency.'
];

foreach ($metadata as $key => $val) {
    $check = $mysqli->query("SELECT id FROM bank_about_metadata WHERE key_name = '$key'");
    if ($check->num_rows == 0) {
        $stmt = $mysqli->prepare("INSERT INTO bank_about_metadata (key_name, value_text) VALUES (?, ?)");
        $stmt->bind_param("ss", $key, $val);
        $stmt->execute();
    }
}
echo "Metadata seeded.\n";

// 2. bank_timeline
$sql = "CREATE TABLE IF NOT EXISTS `bank_timeline` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `sort_order` INT DEFAULT 0,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($mysqli->query($sql))
    echo "Table bank_timeline created.\n";

// Seed Timeline
$timeline = [
    ['1947', 'Inception', 'Established as Produce Consumers Co-operative Society', 1],
    ['1940', 'Urban Bank Conversion', 'Registered under Madras Co-operative Societies Act, 1932. First branch opened at Brodipet.', 2],
    ['1998', 'Modern Governance', 'Adopted the AP Mutually Aided Co-operative Societies Act, 1995.', 3],
    ['2018-Present', 'Expansion & Growth', 'Expanded to 13 branches across Guntur, Krishna, and Prakasam districts. Surpassed ₹606 Crores business volume.', 4]
];

foreach ($timeline as $item) {
    if ($mysqli->query("SELECT id FROM bank_timeline WHERE title = '{$item[1]}'")->num_rows == 0) {
        $stmt = $mysqli->prepare("INSERT INTO bank_timeline (year, title, description, sort_order) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $item[0], $item[1], $item[2], $item[3]);
        $stmt->execute();
    }
}
echo "Timeline seeded.\n";

// 3. bank_core_values
$sql = "CREATE TABLE IF NOT EXISTS `bank_core_values` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `sort_order` INT DEFAULT 0,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($mysqli->query($sql))
    echo "Table bank_core_values created.\n";

// Seed Values
$values = ['Trust & Integrity', 'Customer-Centricity', 'Co-operative Spirit', 'Financial Responsibility', 'Community Commitment'];
$order = 1;
foreach ($values as $val) {
    if ($mysqli->query("SELECT id FROM bank_core_values WHERE title = '$val'")->num_rows == 0) {
        $mysqli->query("INSERT INTO bank_core_values (title, sort_order) VALUES ('$val', $order)");
        $order++;
    }
}
echo "Core Values seeded.\n";

// 4. bank_network
$sql = "CREATE TABLE IF NOT EXISTS `bank_network` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `region_name` VARCHAR(255) NOT NULL,
    `branch_count` VARCHAR(255) NOT NULL,
    `sort_order` INT DEFAULT 0,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($mysqli->query($sql))
    echo "Table bank_network created.\n";

// Seed Network
$network = [
    ['Guntur City', '5 Branches', 1],
    ['Guntur District', '6 Branches', 2],
    ['Key Towns', 'Ongole & Gollapudi', 3]
];
foreach ($network as $item) {
    if ($mysqli->query("SELECT id FROM bank_network WHERE region_name = '{$item[0]}'")->num_rows == 0) {
        $stmt = $mysqli->prepare("INSERT INTO bank_network (region_name, branch_count, sort_order) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $item[0], $item[1], $item[2]);
        $stmt->execute();
    }
}
echo "Network seeded.\n";

$mysqli->close();
?>