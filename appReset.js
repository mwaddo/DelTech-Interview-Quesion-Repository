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
const auth = firebase.auth();

const Reset = document.querySelector('#forgotPass');

Reset.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const emailAddress = Reset['email'].value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.

        window.alert("Email sent! check your email to reset password")
        Reset.reset();
    }).catch(function (error) {
        // An error happened.
    });

});

