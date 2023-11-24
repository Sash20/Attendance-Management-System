document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Check if the passwords match
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            return; // Stop the function if passwords do not match
        } else {
            errorMessage.textContent = ""; // Clear any previous error message
        }

        // Save user information to localStorage
        saveUserInformation(username, email, password);

        // Clear form fields
        signupForm.reset();
    });

    function saveUserInformation(username, email, password) {
        // Retrieve existing user data from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Add new user to the array
        users.push({
            username: username,
            email: email,
            password: password
        });

        // Save the updated user data back to localStorage
        localStorage.setItem('users', JSON.stringify(users));
    }
});
