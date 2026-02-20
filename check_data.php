<?php
$mysqli = new mysqli("localhost", "root", "", "gcub_db");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$result = $mysqli->query("SELECT id, title, LENGTH(content) as content_len, SUBSTRING(content, 1, 100) as content_preview FROM news LIMIT 1");
$row = $result->fetch_assoc();
echo json_encode($row, JSON_PRETTY_PRINT);
$mysqli->close();
?>