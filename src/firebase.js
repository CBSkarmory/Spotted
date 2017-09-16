import * as firebase from "firebase";

export function initDB() {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "homiez-267cc.firebaseapp.com",
    databaseURL: "https://homiez-267cc.firebaseio.com",
    projectId: "homiez-267cc",
    storageBucket: "homiez-267cc.appspot.com",
    messagingSenderId: "652416293785"
  };

  firebase.initalizeApp(firebaseConfig);
}

export default firebase;
