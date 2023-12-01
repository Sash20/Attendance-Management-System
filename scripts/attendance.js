var attendance = [
  { studentID: 498356, fullName: 'Sashoy Morris', password: 'sashoy123', subjects: ['MATH5006', 'ENG1007', 'SOST1304'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 726149, fullName: 'Brianna Anderson', password: 'brianna456', subjects: ['MATH1008', 'ENG1007'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 315684, fullName: 'Tiffany Thompson', password: 'tiffany789', subjects: ['SOST1304', 'SOCI1809'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 890237, fullName: 'Keneel Thomas', password: 'keneel101', subjects: ['MATH5006', 'ENG1007', 'MATH1008'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 642507, fullName: 'Jordon Porter', password: 'jordon2022', subjects: ['SOST1304', 'SOCI1809'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
];
// Function to sign out
function signOut() {
  // Add your sign-out logic here
  alert("Signing out...");

  // Delay the redirection for 2 seconds (2000 milliseconds)
  setTimeout(function () {
    // Redirect to the login page
    window.location.href = "signup.html";
  }, 2000);
}

// Function to clock in
function clockIn() {
  // Get the current date and time
  const currentDate = new Date();

  // Format the date and time
  const arrDate = currentDate.toLocaleDateString();
  const arrTime = currentDate.toLocaleTimeString();

  // Save elements to local storage
  localStorage.setItem('arrDate', arrDate);
  localStorage.setItem('arrTime', arrTime);

  // Display a pop-up window with the clock-in/out information
  const message = `Attendance Confirmed! You clocked in at ${arrTime} on ${arrDate}`;
  alert(message);
}

// Function to clock out
function clockOut() {
  // Get the current date and time
  const currentDate = new Date();

  // Format the date and time
  const depDate = currentDate.toLocaleDateString();
  const depTime = currentDate.toLocaleTimeString();

  // Save elements to local storage
  localStorage.setItem('depDate', depDate);
  localStorage.setItem('depTime', depTime);

  // Display a pop-up window with the clock-in/out information
  const message = `Departure Confirmed! You clocked out at ${depTime} on ${depDate}`;
  alert(message);

  // Save the log entry to the local storage
  saveLogEntry(depDate, depTime);
}

// Function to save log entry
function saveLogEntry(depDate, depTime) {
  // Retrieve existing logs or initialize an empty array
  const attendanceLogs = JSON.parse(localStorage.getItem('attendanceLogs')) || [];

  // Get the current student's information from local storage
  const studentID = parseInt(localStorage.getItem('studentID'));
  const fullName = localStorage.getItem('fullName');

  // Create a new log entry
  const logEntry = {
    studentID: studentID,
    fullName: fullName,
    arrDate: localStorage.getItem('arrDate'),
    arrTime: localStorage.getItem('arrTime'),
    depDate: depDate,
    depTime: depTime,
  };

  // Add the log entry to the array
  attendanceLogs.push(logEntry);

  // Save the updated array back to local storage
  localStorage.setItem('attendanceLogs', JSON.stringify(attendanceLogs));
}

// Function to display all logs
function displayAllLogs() {
  const allLogs = JSON.parse(localStorage.getItem('attendanceLogs')) || [];
  const logsDisplay = document.getElementById('logsDisplay');

  // Clear previous content
  logsDisplay.innerHTML = '';

  // Get the current student's information from local storage
  const studentID = parseInt(localStorage.getItem('studentID'));

  // Check if there are any logs
  if (allLogs.length > 0) {
    // Display logs for the current user
    const studentLogs = allLogs.filter(log => log.studentID === studentID);

    // Check if the student has any logs
    if (studentLogs.length > 0) {
      studentLogs.forEach(log => {
        const logInfo = document.createElement('p');
        logInfo.textContent = `User ID ${log.studentID}: Clock-In - ${log.arrTime} on ${log.arrDate}, Clock-Out - ${log.depTime} on ${log.depDate}`;

        // Apply styling to each log entry
        logInfo.style.border = '1px solid #2ecc71'; // Green border
        logInfo.style.padding = '10px';
        logInfo.style.backgroundColor = '#34495e'; // Dark background color
        logInfo.style.color = '#ecf0f1'; // Light text color

        logsDisplay.appendChild(logInfo);
      });
    } else {
      // Display message if no logs available for the current student
      const noLogsMessage = document.createElement('p');
      noLogsMessage.textContent = 'No logs available for the current student.';
      logsDisplay.appendChild(noLogsMessage);
    }
  } else {
    // Display message if no logs available
    const noLogsMessage = document.createElement('p');
    noLogsMessage.textContent = 'No logs available.';
    logsDisplay.appendChild(noLogsMessage);
  }
}

// application.js

// Your existing code

// Get student information from local storage
var studentID = localStorage.getItem('studentID');
var fullName = localStorage.getItem('fullName');

// Update the HTML with the student's information
document.getElementById('studentID').innerText = studentID;
document.getElementById('studentName').innerText = fullName;
// Your existing code

// Update the HTML with the student's information
document.getElementById('studentID').innerText = studentID;
document.getElementById('studentName').innerText = fullName;

// Function to update subjects
function updateSubjects() {
  // Get the current student's information from local storage
  const studentID = parseInt(localStorage.getItem('studentID'));
  const student = attendance.find(student => student.studentID === studentID);

  if (student) {
    const subjectsList = document.getElementById('studentSubjects');
    subjectsList.innerHTML = '';

    // Display subjects for the current student
    student.subjects.forEach(subject => {
      const subjectItem = document.createElement('li');
      subjectItem.textContent = subject;
      subjectsList.appendChild(subjectItem);
    });
  }
}

// Call the updateSubjects function when the page loads
updateSubjects();
