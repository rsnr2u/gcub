<?php
$conn = new mysqli('127.0.0.1', 'root', '', 'gcub_db');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query('SELECT slug, title FROM banking_services');
while ($row = $result->fetch_assoc()) {
    echo $row['slug'] . ' | ' . $row['title'] . "\n";
}
$conn->close();
?>