import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "super secret keys.....asgvegxgevergfvr",
    authDomain: "shoping-b5200.firebaseapp.com",
    databaseURL: "gs://shoping-b5200.appspot.com",
    projectId: "shoping-b5200",
    storageBucket: "gs://shoping-b5200.appspot.com",
    messagingSenderId: "super secret keys.....asgvegxgevergfvr",
    appId: "1:340623862376:web:767242b942438e365029dd",
    measurementId: "super secret as;dlkfjal;dskjf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
  const storage = firebase.storage()
  export  {
    storage, firebase as default
  }