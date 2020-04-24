// save form data to firebase
const form = document.querySelector('#question-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    var validation = formValidation();

    if(validation == true){
        db.collection('Questions').add({
            question: form.question.value,
            employer: form.employer.value,
            type: displayRadioValue(),
            sector: form.sector.value,
            jobtitle: form.jobtitle.value
        });
        alert("Question submitted");
        deselectRadio();
        form.question.value = "";
        form.employer.value = "";
        form.sector.value = "";
        form.jobtitle.value = "";
    }
});
const btnLogout = document.getElementById('btnLogout');

// logout
function logout() {
    firebase.auth().signOut();
    window.location.href = "login.html";
    console.log("logging out");
}
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

function deselectRadio(){
    var radios = document.getElementsByName('radios');
    for(var i=0; i<radios.length;i++){
        radios[i].checked = false;
    }
}
