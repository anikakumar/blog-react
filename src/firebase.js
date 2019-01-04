import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAzXn4b_tkPR9x2Y3cCtMHrhhZVGArgvrk",
    authDomain: "creativeproject-8eaaf.firebaseapp.com",
    databaseURL: "https://creativeproject-8eaaf.firebaseio.com",
    projectId: "creativeproject-8eaaf",
    storageBucket: "creativeproject-8eaaf.appspot.com",
    messagingSenderId: "1024384935211"
  };
var fire = firebase.initializeApp(config);
export default fire;