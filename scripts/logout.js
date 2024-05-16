// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
  authDomain: "serena-mente.firebaseapp.com",
  projectId: "serena-mente",
  storageBucket: "serena-mente.appspot.com",
  messagingSenderId: "183868385167",
  appId: "1:183868385167:web:442b02f182fc8a28260dfa",
  measurementId: "G-LVWYEJBRHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkActiveSession();
  });

  // Función para verificar si hay una sesión activa
  async function checkActiveSession() {
    try {
      const currentUser = await auth.currentUser;
      if (currentUser) {
        //alert("Usuario activo: " + currentUser.email);
        logoutUser();
      } else {
        alert("No hay una sesión activa");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al verificar la sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al verificar la sesión: " + errorMessage);
    }
  }

  // Función para cerrar sesión
  async function logoutUser() {
    try {
      await signOut(auth);
      alert("Cerrar sesión exitoso");
      window.location.href = './../index.html';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al cerrar sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al cerrar sesión: " + errorMessage);
    }
  }
});