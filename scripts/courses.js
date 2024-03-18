document.addEventListener("DOMContentLoaded", function(){
    const addCourseForm = document.getElementById("addCourseForm");

    addCourseForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const courseCode = document.getElementById("courseCode").value.trim();
        const courseName = document.getElementById("courseName").value.trim();

        if (courseCode && courseName) {
            const formData = new FormData(this); 

            fetch(`http://localhost/COMP2140/Attendance-Management-System/courses.php`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("messageDiv").textContent = data.message;
                $("#addCourseModal").modal('hide');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("messageDiv").textContent = "Error: " + error;
            });
        } else {
            document.getElementById("messageDiv").textContent = "Please fill in both Course Code and Course Name.";
        }
    });

    document.getElementById("showRemoveCourseInput").addEventListener("click", function() {
        document.getElementById("removeCourseSection").style.display = 'block';
    });

    document.getElementById("removeCourseBtn").addEventListener("click", function() {
        const courseCode = document.getElementById("courseToRemove").value.trim();
        fetch(`http://localhost/COMP2140/Attendance-Management-System/drop_course.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `courseCode=${courseCode}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById("messageDiv").textContent = data.message;
            } else {
                document.getElementById("messageDiv").textContent = data.message;
            }
            document.getElementById("removeCourseSection").style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("messageDiv").textContent = error;
        });
    });
})