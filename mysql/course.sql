DROP DATABASE IF EXISTS student;
CREATE DATABASE student;
USE student;

DROP TABLE IF EXISTS `course_info`;
CREATE TABLE `course_info` (
    `course_code` VARCHAR(10) NOT NULL PRIMARY KEY,  
    `course_name` VARCHAR(32) DEFAULT NULL,
    `detail` VARCHAR(255) DEFAULT NULL,
    `start_date` VARCHAR(255) DEFAULT NULL,
    `end_date` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `course_info`;
CREATE TABLE `students_detail` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `courses` VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS `student_courses`;
CREATE TABLE `student_courses` (
  `student_id` INT UNSIGNED NOT NULL,
  `course_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`student_id`, `course_id`),
  FOREIGN KEY (`student_id`) REFERENCES `students_detail` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `course_info` (`id`) ON DELETE CASCADE
);