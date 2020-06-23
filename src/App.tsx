import React from 'react';
import { Home } from "../src/components/Home";
import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAlVcgEaiBP1fK4kDB__Mej8vhvIqwh5i4",
    authDomain: "nico-personal-web.firebaseapp.com",
    databaseURL: "https://nico-personal-web.firebaseio.com",
    projectId: "nico-personal-web",
    storageBucket: "nico-personal-web.appspot.com",
    messagingSenderId: "642317698683",
    appId: "1:642317698683:web:b723d1b8cd767cee0304de",
    measurementId: "G-KH38C4RK9B"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
    return (
        <Home />
    );
};

export default App;
