import HMR from '@sveltech/routify/hmr'
import App from './App.svelte';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCSiZcOHN7nOqYvW9FUFzCG7yHfYBv-bHA",
  authDomain: "centeros-479ae.firebaseapp.com",
  databaseURL: "https://centeros-479ae.firebaseio.com",
  projectId: "centeros-479ae",
  storageBucket: "centeros-479ae.appspot.com",
  messagingSenderId: "577025425071",
  appId: "1:577025425071:web:a9fdb3ac470cfa2e",
  measurementId: "G-JY373SCPSV"
};

firebase.initializeApp(firebaseConfig);
const app = HMR(App, { target: document.body }, 'routify-app')

export default app;