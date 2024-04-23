// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
export const environment = {
    production: false,
    firebase:{
  apiKey: "AIzaSyAg9m4aDi30zsSKCQr91sFcsKgxAVucR1I",
  authDomain: "todo-40b5e.firebaseapp.com",
  projectId: "todo-40b5e",
  storageBucket: "todo-40b5e.appspot.com",
  messagingSenderId: "1069302558955",
  appId: "1:1069302558955:web:2abffe2f6f2d7a93c7ceae"
}
    }


initializeApp(environment.firebase);
