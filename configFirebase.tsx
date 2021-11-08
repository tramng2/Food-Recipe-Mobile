// export const firebaseConfig = {
//   apiKey: "AIzaSyDH3nHHMeKQOzb1Ft8YsEE9pBBPS0bzvrs",
//   authDomain: "recipes-e0027.firebaseapp.com",
//   projectId: "recipes-e0027",
//   storageBucket: "recipes-e0027.appspot.com",
//   messagingSenderId: "906466925863",
//   appId: "1:906466925863:web:750eb903d09c7172ed5d02",
//   measurementId: "G-MYYWCK7S9S",
// };

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDH3nHHMeKQOzb1Ft8YsEE9pBBPS0bzvrs",
  authDomain: "recipes-e0027.firebaseapp.com",
  projectId: "recipes-e0027",
  storageBucket: "recipes-e0027.appspot.com",
  messagingSenderId: "906466925863",
  appId: "1:906466925863:web:750eb903d09c7172ed5d02",
  measurementId: "G-MYYWCK7S9S",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
