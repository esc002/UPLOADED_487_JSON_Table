// NOTE: ORGINAL CODE FROM CLASS 10/23/2024
//OTHER SOURCES:
//www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript
//teamtreehouse.com/community/print-function-documentgetelementbyid-innerhtml-clarity

// Function to load the JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    return response.json();
}

// Function to create a list item for each object
function createListItem(item) {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(item, null, 2); // Display object as JSON string
    return li;
    
}

//function to create html text for each object
function createHTMLDisplay(item) {
    var randomNum = Math.floor(Math.random() * 10) + 1;
    var htmlData = "<tr>";
    htmlData += "<td> <img src=" + item.bioimage + "?" + randomNum + "</td>";
    htmlData += "<td>" + item.first_name + "</td>";
    htmlData += "<td>" + item.last_name + "</td>";
    htmlData += "<td>" + item.role + "</td>";
    htmlData += "<td>" + item.birthday + "</td>";
    htmlData += "<td>" + item.username + "</td>";
    htmlData += "<td>" + item.email + "</td>";
    htmlData += "<td>" + item.grade + "</td>";
    htmlData += "</tr>";

    return htmlData;
}


// Function to display data in the HTML lists
function displayData(data) {
    //console.log(data);
    const studentsList = document.getElementById('students-list');
    var studentNum = 0;
    //const instructorsList = document.getElementById('instructors-list');

    // Populate students list
    data.students.forEach(student => {
        studentNum++;
        //console.log(studentNum);
        const listItem = createListItem(student);
        const displayData = createHTMLDisplay(student);
        studentsList.insertAdjacentHTML("beforeend",displayData);
    });

    // Populate instructors list
    /*data.instructors.forEach(instructor => {
        const listItem = createListItem(instructor);
        instructorsList.textContent(listItem);
    });*/
    displaySummary(data.students, studentNum);
}

// For innerHTML syntax: teamtreehouse.com/community/print-function-documentgetelementbyid-innerhtml-clarity
function displaySummary(students, studentNum) {
    
    var summary = document.getElementById("summary");

    // Referenced ChatGPT for debugging and correct syntax for calculating median
    var grades = students.map(student => {
        return Number(student.grade);
    });

    grades.sort((a, b) => a - b);
    varStudentNum = grades.length;
    var medianScore;

    if (studentNum % 2 === 1) {
        medianScore = grades[Math.floor(studentNum / 2)];
    } else {
        medianScore = (grades[studentNum / 2 - 1] + grades[studentNum / 2]) / 2;
    }

    var lowerRange = grades [0];
    var upperRange = grades[studentNum - 1];

    summary.innerHTML = "There are " + studentNum + " students in the class. The median score is " + medianScore + " and the range is " + lowerRange + " to " + upperRange;
  }

// Load and display the JSON data
loadJSON('class.json') // Adjust path if necessary
    .then(data => displayData(data))
    .catch(error => console.error('Error loading JSON:', error));