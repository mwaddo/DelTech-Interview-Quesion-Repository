var fragment = document.createDocumentFragment();
const questionTable = document.querySelector('#question-table');
var counter = 0;

var radios = document.getElementsByName('radios');
var selectedRadio;

const form = document.querySelector('#question-form');

// create element and render quesions
function renderQuestion(doc){
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
    rating.textContent = 111;

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

// save data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Questions').add({
        question: form.question.value,
        employer: form.employer.value,
        type: displayRadioValue(),
        sector: form.sector.value,
        jobtitle: form.jobtitle.value
    });
});

function displayRadioValue() { 
    var radios = document.getElementsByName('radios'); 
      
    for(i = 0; i < radios.length; i++) { 
        if(radios[i].checked){
            console.log(radios[i].value);
            return radios[i].value;
        }
       
    } 
}
