<?php

header("Access-Control-Allow-Origin: *");

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
    $course_code = $_POST['course_code'] ?? '';
    $course_name = $_POST['course_name'] ?? '';
    $detail = $_POST['detail'] ?? '';
    $start_date = $_POST['start_date'] ?? '';
    $end_date = $_POST['end_date'] ?? '';

    if (preg_match('/^[A-Za-z0-9]+$/', $course_code)) {
        $sql = "INSERT INTO course_info (course_code, course_name, detail, start_date, end_date) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$course_code, $course_name, $detail, $start_date, $end_date]);

        echo json_encode(["status" => "success", "message" => "Course added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid course code"]);
    }

    
}
?>
