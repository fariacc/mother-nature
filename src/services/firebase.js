// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import 'firebase/auth'

import 'firebase/database'

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAO2R6S5VqgC28SE6Yl8T7AwNRGvUUbgWI',
  authDomain: 'plant-monitor-3e04e.firebaseapp.com',
  databaseURL: 'https://plant-monitor-3e04e-default-rtdb.firebaseio.com',
  projectId: 'plant-monitor-3e04e',
  storageBucket: 'plant-monitor-3e04e.appspot.com',
  messagingSenderId: '147037989389',
  appId: '1:147037989389:web:8e20c576843ef72236c344',
  measurementId: 'G-WT0WKDZVXZ',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Finally, export it to use it throughout your app
export default firebase
