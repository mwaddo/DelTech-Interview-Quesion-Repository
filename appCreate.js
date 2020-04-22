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
const auth= firebase.auth();

const signUpForm=document.querySelector('#signUp-form');
signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    //get user info
    const email= signUpForm['signUpEmail'].value;
    const password= signUpForm['signUpPass'].value;

    //sign up the user
   auth.createUserWithEmailAndPassword(email,password).then(cred=>{
       console.log(cred.user);
       window.alert("Your account has been created!")
      signUpForm.reset();
   })

})