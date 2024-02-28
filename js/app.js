// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCi1o9p4hoMTWLo1cDU5WOwa25ylxDR5XI",
  authDomain: "proyecto-sena-77126.firebaseapp.com",
  projectId: "proyecto-sena-77126",
  storageBucket: "proyecto-sena-77126.appspot.com",
  messagingSenderId: "1056780930204",
  appId: "1:1056780930204:web:665eb3ea468d8409143159",
  measurementId: "G-04WSDGGF9X" 
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
