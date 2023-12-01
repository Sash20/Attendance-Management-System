var attendance = [
  { studentID: 498356, fullName: 'Sashoy Morris', password: 'sashoy123', subjects: ['MATH5006', 'ENG1007', 'SOST1304'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 726149, fullName: 'Brianna Anderson', password: 'brianna456', subjects: ['MATH1008', 'ENG1007'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 315684, fullName: 'Tiffany Thompson', password: 'tiffany789', subjects: ['SOST1304', 'SOCI1809'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 890237, fullName: 'Keneel Thomas', password: 'keneel101', subjects: ['MATH5006', 'ENG1007', 'MATH1008'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
  { studentID: 642507, fullName: 'Jordon Porter', password: 'jordon2022', subjects: ['SOST1304', 'SOCI1809'], arrDate: "", arrTime: "", depDate: "", depTime: "" },
];


function validateLogin() {
    // Get input values
    var inputID = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    // Check if ID and password match
    var student = validateCredentials(inputID, inputPassword);

    if (student) {
        // Redirect to the attendance page
        window.location.href = "attendance.html";

        // Store student information in local storage for use in the attendance page
        localStorage.setItem('studentID', student.studentID);
        localStorage.setItem('fullName', student.fullName);
    } else {
        // Display an error message (you can customize this part)
        alert("Invalid ID or password. Please try again.");
    }
}

function validateCredentials(inputID, inputPassword) {
    // Find the student with matching ID and password
    var student = attendance.find(s => s.studentID === parseInt(inputID) && s.password === inputPassword);

    return student;
}
