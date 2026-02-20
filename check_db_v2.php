<?php
$mysqli = new mysqli("localhost", "root", "", "gcub_db");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$result = $mysqli->query("DESCRIBE news");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
file_put_contents("c:/xampp/htdocs/FULLSTACK/gcub/schema.json", json_encode($rows, JSON_PRETTY_PRINT));
print_r($rows);
$mysqli->close();
?>