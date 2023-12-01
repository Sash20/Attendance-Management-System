<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = 'localhost';
$db = 'student';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $courseCode = $_POST['courseCode'] ?? '';

    if (preg_match('/^[A-Za-z0-9]+$/', $courseCode)) {
        $sql = "DELETE FROM course_info WHERE course_code = ?";
        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute([$courseCode]);

        if ($success && $stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Course removed successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Course not found"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid course code"]);
    }
}
?>
