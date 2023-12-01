<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to generate a random and unique student ID
function generateStudentID($length = 6) {
    $characters = '012345';
    $id = '';

    // Generate a unique random ID
    do {
        $id = '';
        for ($i = 0; $i < $length; $i++) {
            $id .= $characters[rand(0, strlen($characters) - 1)];
        }

        // Check if the generated ID already exists
        $query = "SELECT COUNT(*) as count FROM students WHERE student_id = '$id'";
        $result = $conn->query($query);
        $row = $result->fetch_assoc();
        $exists = $row['count'] > 0;

    } while ($exists);

    return $id;
}

// Function to insert a student with a generated ID into the database
function insertStudent($name, $age) {
    global $conn;

    // Generate a unique student ID
    $student_id = generateStudentID();

    // Insert the student into the database
    $query = "INSERT INTO students (student_id, name, age) VALUES ('$student_id', '$name', '$age')";
    $result = $conn->query($query);

    if ($result === TRUE) {
        echo "Student added successfully with ID: $student_id";
    } else {
        echo "Error adding student: " . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>