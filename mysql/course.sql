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

