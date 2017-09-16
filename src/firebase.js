import * as firebase from "firebase";

module.exports = function initDB() {
  const firebaseConfig = {
    apiKey: "AIzaSyDkfKyr35WDut2cvtDfYUyzgWTOBcEmr0g",
    authDomain: "homiez-267cc.firebaseapp.com",
    databaseURL: "https://homiez-267cc.firebaseio.com",
    projectId: "homiez-267cc",
    storageBucket: "homiez-267cc.appspot.com",
    messagingSenderId: "652416293785"
  };

  firebase.initalizeApp(firebaseConfig);
};
