var fragment = document.createDocumentFragment();
const questionTable = document.querySelector('#question-table');
var counter = 0;

var radios = document.getElementsByName('radios');
var selectedRadio;

const form = document.querySelector('#question-form');

// array of strings for sorting
var numbers = [];
var questions = [];
var employers = [];
var types = [];
var sectors = [];
var jobtitles = [];
var ratings = [];

// create element and render questions
function renderQuestion(doc) {
  var tr = document.createElement("tr");
  let number = document.createElement("td")
  let question = document.createElement('td');
  let employer = document.createElement('td');
  let type = document.createElement('td');
  let sector = document.createElement('td');
  let jobtitle = document.createElement('td');
  let rating = document.createElement('td');

  tr.setAttribute('data-id', doc.id);

  number.textContent = counter;
  question.textContent = doc.data().question;
  employer.textContent = doc.data().employer;
  type.textContent = doc.data().type;
  sector.textContent = doc.data().sector;
  jobtitle.textContent = doc.data().jobtitle;
  rating.textContent = "-";

  // adding elements to arrys for sorting
  numbers.push(number.textContent);
  questions.push(question.textContent);
  employers.push(employer.textContent);
  types.push(type.textContent);
  sectors.push(sector.textContent);
  jobtitles.push(jobtitle.textContent);
  ratings.push(rating.textContent);

  tr.appendChild(number);
  tr.appendChild(question);
  tr.appendChild(employer);
  tr.appendChild(type);
  tr.appendChild(sector);
  tr.appendChild(jobtitle);
  tr.appendChild(rating);

  questionTable.appendChild(tr);
}

db.collection('Questions').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    counter++;
    renderQuestion(doc);
  })
})

// save form data to firebase
form.addEventListener('submit', (e) => {
  e.preventDefault();

  var validation = formValidation();

  if (validation == true) {
    db.collection('Questions').add({
      question: form.question.value,
      employer: form.employer.value,
      type: displayRadioValue(),
      sector: form.sector.value,
      jobtitle: form.jobtitle.value
    });
  }
});

// input validation for the question submission form
function formValidation() {
  if (form.question.value == "" || form.question.value.trim().length == 0) {
    alert('Error: question field is empty.');
    form.question.focus();
    console.log("false question empty");
    return false;
  } 
  else if (form.question.value.length < 10) {
    alert('Error: question field is too short (must be over 10 characters).');
    form.question.focus();
    console.log("false");
    return false;
  } 
  else if (form.question.value.slice(-1) != "?") {
    alert("Error: question field must end with a question mark.");
    form.question.focus();
    return false;
  } 
  else if (form.employer.value == "" || form.employer.value.trim().length == 0) {
    alert('Error: employer field is empty.');
    form.employer.focus();
    console.log("false employer");
    return false;
  } 
  else if (displayRadioValue() == null) {
    alert('Error: must choose type.');
    console.log("false type");
    return false;
  } 
  else if (form.sector.value == "" || form.sector.value.trim().length == 0) {
    alert('Error: sector field is empty.');
    console.log("false sector");
    return false;
  } 
  else if (form.jobtitle.value == "" || form.jobtitle.value.trim().length == 0) {
    alert('Error: job title field is empty.');
    console.log("false jobtitle");
    return false;
  } 
  else {
    return true;
  }
}

// get value of radio on form, technical or behavioral
function displayRadioValue() {
  var radios = document.getElementsByName('radios');

  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      console.log(radios[i].value);
      return radios[i].value;
    }

  }
}

const btnLogout = document.getElementById('btnLogout');

// logout
function logout() {
  firebase.auth().signOut();
  window.location.href = "login.html";
  console.log("logging out");
}

// search all table rows for specific inputs
function searchByQuesion() {
  var input, filter, tr, td, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  tr = questionTable.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

// sort tables in descending or ascending order alphabetically or numerically
function sortTable(n) {
  var rows, switching, i, first, second, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = questionTable.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      first = rows[i].getElementsByTagName("td")[n];
      second = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (first.innerHTML.toLowerCase() > second.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (first.innerHTML.toLowerCase() < second.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}