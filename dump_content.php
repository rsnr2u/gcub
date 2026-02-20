<?php
$mysqli = new mysqli("localhost", "root", "", "gcub_db");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$result = $mysqli->query("SELECT content FROM news WHERE id=1");
$row = $result->fetch_assoc();
file_put_contents("c:/xampp/htdocs/FULLSTACK/gcub/content_raw.txt", $row['content']);
echo "Raw content length: " . strlen($row['content']) . "\n";
echo "First 100 chars: " . substr($row['content'], 0, 100) . "\n";
$mysqli->close();
?>