var firebaseConfig = {
    apiKey: "AIzaSyC0Scj33I2yzBfdfj2-whRqCZD-midbLNo",
    authDomain: "deltech-question-repository.firebaseapp.com",
    databaseURL: "https://deltech-question-repository.firebaseio.com",
    projectId: "deltech-question-repository",
    storageBucket: "deltech-question-repository.appspot.com",
    messagingSenderId: "496754076532",
    appId: "1:496754076532:web:826db8d122618be2a11a21",
    measurementId: "G-W7C6LBJT1J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('boton');
const form= document.querySelector('#form');

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("signed in");
        window.location.href = "mainpage.html";
    } else {
        console.log("not logged in");
    }
});

btnLogin.addEventListener('click', e => {
    e.preventDefault();
    console.log("logging in...");
    const email = txtEmail.value;
    const pass= txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e=> window.alert("Error: "+ e.message));
    form.reset();
});




