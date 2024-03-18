//this stops the program from parsing the file while in javascript, basically calls server side with no browser errors.
if (typeof window !== "undefined") {
   
    // Common storage key for both sign in and sign out
    const storageKey = "peopleList";
    
    
    
    
    // Function to validate form inputs
    function validateForm() {
        var name = document.getElementById("name").value;
        var id = document.getElementById("id").value;
        var course = document.getElementById("course").value;
    
    
          //checking for empty fields
        if (name == "") {
            alert("Name is required");
            return false;
        }
    
    
    
    
        if (id == "") {
            alert("ID is required");
            return false;
        } else if (id < 0) {
            alert("ID must be a positive number");
            return false;
        }
    
    
    
    
        if (course == "") {
            alert("Course is required");
            return false;
        }
    
    
    
    
        return true;
    }
    
    
    // Function to show data
    function showData() {
        var storageKey = "peopleList";
    
    
        // new map to store late arrivals for each ID
        var lateArrivalsMap = new Map();
    
    
        //func for checking if the month has changed, and reset the late arrivals count
        function resetLateArrivals() {
            var currentMonth = new Date().getMonth();
            var storedMonth = localStorage.getItem("currentMonth");
    
    
            if (currentMonth !== parseInt(storedMonth, 10)) {
               
                lateArrivalsMap.clear();
                 localStorage.clear();
                localStorage.setItem("currentMonth", currentMonth);
            }
           
        }
    
    
        var peopleList;
        if (localStorage.getItem(storageKey) == null) {
            peopleList = [];
        } else { //in order to access data in local storage, we have to parse it with json to a js object
            peopleList = JSON.parse(localStorage.getItem(storageKey));
        }
    
    
        var html = ""; //get data for table from local storage
        peopleList.forEach(function (element, index) {
            html += "<tr>";
            html += "<td>" + element.name + "</td>";
            html += "<td>" + element.id + "</td>";
            html += "<td>" + element.course + "</td>";
            html += "<td>" + element.date + "</td>";
            html += "<td>" + element.signin + "</td>";
            html += "<td>" + element.signout + "</td>";
    
    
            var signinTime = new Date(element.date + " " + element.signin);
    
    
            // Check if the ID exists in the map
            if (!lateArrivalsMap.has(element.id)) {
                // If not, initialize the lateArrivals count to 0
                lateArrivalsMap.set(element.id, 0);
            }
    
    
            // Check if the month has changed, if yes reset
            resetLateArrivals();
    
    
            // Check if the sign-in time is after 8 am
            if (signinTime.getHours() >= 8) {
                // If yes, increment the lateArrivals count
                //key and value for map is accepted
                lateArrivalsMap.set(element.id, lateArrivalsMap.get(element.id) + 1);
            }
    
    
            // retrieve the lateArrivals count for the current ID, based on the above function
            var lateArrivalsCount = lateArrivalsMap.get(element.id) || 0;
            html += "<td>" + lateArrivalsCount + "</td>";
    
    
            // calculate and display total hours for the current ID
            if (element.signout) {
                var signoutTime = new Date(element.date + " " + element.signout);
                //var hoursWorked = (signoutTime - signinTime) / (1000 * 60 * 60);
                var hoursWorked = parseFloat(((signoutTime - signinTime) / (1000 * 60 * 60)).toFixed(3));
    
    
                html += "<td>" + hoursWorked + "</td>";
            } else {
                html += "<td>" + "" + "</td>"; // If no signout time, display empty
            }
    
    
            html +=
                '<td><button onclick="deleteData(' +
                index +
                ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
                index +
                ')" class="btn btn-warning m-2">Edit</button></td>';
            html += "</tr>";
        });
    
    
        document.querySelector("#crudTable tbody").innerHTML = html;
    }
    //show table data after loading
    document.onload = showData();
    
    
    
    
    //basically the same as show data.
    //search/filter by ID
    function Search() {
        var searchTerm = document.getElementById("id").value.toLowerCase();
    
    
        var peopleList;
        if (localStorage.getItem(storageKey) == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem(storageKey));
        }
    
    
        var html = "";
        var lateArrivalsMap = new Map();  // initial late arrivals map
    //what we filter for
        peopleList.forEach(function (element, index) {
            if (element.id.includes(searchTerm)) {
                html += "<tr>";
                html += "<td>" + element.name + "</td>";
                html += "<td>" + element.id + "</td>";
                html += "<td>" + element.course + "</td>";
                html += "<td>" + element.date + "</td>";
                html += "<td>" + element.signin + "</td>";
                html += "<td>" + element.signout + "</td>";
    
    
                var signinTime = new Date(element.date + " " + element.signin);
    
    
                //check if the ID exists in the map
                if (!lateArrivalsMap.has(element.id)) {
                    //if not, initialize the lateArrivals count to 0
                    lateArrivalsMap.set(element.id, 0);
                }
    
    
                // Check if the sign-in time is after 8 am
                //uses 24 hours clock
                var isLate = signinTime.getHours() >= 8;
    
    
    
    
                // Update late arrivals count for the current ID
                lateArrivalsMap.set(element.id, lateArrivalsMap.get(element.id) + (isLate ? 1 : 0));
    
    
                // Retrieve the lateArrivals count for the current ID
                var lateArrivalsCount = lateArrivalsMap.get(element.id) || 0;
                html += "<td>" + lateArrivalsCount + "</td>";
    
    
                // Calculate and display total hours for the current ID
                var signoutTime = new Date(element.date + " " + element.signout);
                var hoursWorked = (signoutTime - signinTime) / (1000 * 60 * 60);
                html += "<td>" + hoursWorked + "</td>";
    
    
                html +=
                    '<td><button onclick="deleteData(' +
                    index +
                    ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
                    index +
                    ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            }
        });
    
    
        document.querySelector("#crudTable tbody").innerHTML = html;
    }
    
    
    
    
    
    
    
    
    
    
    //function to add data
    function AddData() {
        if (validateForm()) {
            var name = document.getElementById("name").value;
            var id = document.getElementById("id").value;
            var course = document.getElementById("course").value;
    
    
    
    
            var peopleList;
            if (localStorage.getItem("peopleList") == null) {
                peopleList = [];
            } else {
                peopleList = JSON.parse(localStorage.getItem("peopleList"));
            }
    
    
    
    
            // Check if the user already signed in
            var existingEntryIndex = peopleList.findIndex(function (element) {
                return element.id === id && !element.signout;
            });
    
    
    
    
            if (existingEntryIndex !== -1) {
                // User already signed in, add sign-out time to the existing entry
                peopleList[existingEntryIndex].signout = new Date().toLocaleTimeString();
                window.alert("Departure Confirmed!");
            } else {
                // User not signed in, add new entry with sign-in time
                var signInTime = new Date().toLocaleTimeString();
                peopleList.push({
                    name: name,
                    id: id,
                    course: course,
                    date: new Date().toLocaleDateString(),
                    signin: signInTime,
                    signout: undefined,
                    lateArrival: isLateArrival(signInTime) ? 0 : 1, // Check if late arrival
                });
    
    
    
    
                // Set the sign-in input field value to the current time
                document.getElementById("date").value = new Date().toLocaleDateString();
                document.getElementById("signin").value = signInTime;
                window.alert("Attendance Confirmed");
            }
    
    
    
    
            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();
    
    
    
    
            // Reset form fields
            document.getElementById("name").value = "";
            document.getElementById("id").value = "";
            document.getElementById("course").value = "";
        }
    }
    
    
    
    
    //Function to check if a given time is a late arrival (after 8 am)
    function isLateArrival(time) {
        var lateArrivalTime = new Date();
        lateArrivalTime.setHours(8, 0, 0); // Set the reference time to 8 am
    
    
    
    
        var signInTime = new Date();
        var parts = time.split(":");
        signInTime.setHours(parts[0], parts[1], parts[2]); //sign it time setting
    
    
    
    
        return signInTime > lateArrivalTime;
    }
    
    
    
    
    
    
    
    
    
    //delete entry from local storage
    function deleteData(index) {
        var peopleList;
        if (localStorage.getItem(storageKey) == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem(storageKey));
        }
        //reomves item from list. at position index, remove 1 item.
        peopleList.splice(index, 1);
        //sets new ppl list
        localStorage.setItem(storageKey, JSON.stringify(peopleList));
        showData();
    }
    
    
    
    
    //edit data from local storage
    function updateData(index) {
        //changing button visibility
        // submit button will hide and update button will show for updating data in local storage
        document.getElementById("Submit").style.display = "none";
       
        document.getElementById("Update").style.display = "block";
    
    
    
    
        var peopleList;
        if (localStorage.getItem(storageKey) == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem(storageKey));
        }
    
    
    
    
        document.getElementById("name").value = peopleList[index].name;
        document.getElementById("id").value = peopleList[index].id;
        document.getElementById("course").value = peopleList[index].course;
    
    
    
    
        document.querySelector("#Update").onclick = function () {
            if (validateForm() == true) {
                peopleList[index].name = document.getElementById("name").value;
                peopleList[index].id = document.getElementById("id").value;
                peopleList[index].course = document.getElementById("course").value;
    
    
    
    
                localStorage.setItem(storageKey, JSON.stringify(peopleList));
    
    
    
    
                showData();
    
    
    
    
                document.getElementById("name").value = "";
                document.getElementById("id").value = "";
                document.getElementById("course").value = "";
    
    
    
    
                // submit button will hide and update button will show for updating data in local storage
                document.getElementById("Submit").style.display = "block";
                document.getElementById("Update").style.display = "none";
            }
        };
    
    
    }
    //export data to Excel
    function exportToExcel() {
        var peopleList;
        if (localStorage.getItem(storageKey) == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem(storageKey));
        }
    
    
        //generate a worksheet
        var ws = XLSX.utils.json_to_sheet(peopleList);
    
    
        //generate a workbook
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "StudentReport");
    
    
        //save the workbook to a file
        var fileName = "StudentReport.xlsx";
        XLSX.writeFile(wb, fileName);
    }
    
    
    //button to generate excel
    document.getElementById("exportButton").addEventListener("click", exportToExcel);
    
    
    }
    
    
    
    

