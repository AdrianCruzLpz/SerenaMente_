import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, reload, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
  authDomain: "serena-mente.firebaseapp.com",
  projectId: "serena-mente",
  storageBucket: "serena-mente.appspot.com",
  messagingSenderId: "183868385167",
  appId: "1:183868385167:web:442b02f182fc8a28260dfa",
  measurementId: "G-LVWYEJBRHE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const ageInput = document.getElementById("edad");
  const civilStatusInput = document.querySelector('select[name="estado_civil"]');
  const genderInputs = document.querySelectorAll('input[name="sexo"]');
  const occupationInput = document.querySelector('select[name="ocupacion"]');
  const educationLevelInput = document.querySelector('select[name="nivel_estudios"]');
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pass");
  const confirmPasswordInput = document.getElementById("confirPass");
  const signUpButton = document.getElementById("signUp");

  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formulario = document.getElementById('signupForm');
    if (validarFormulario(formulario)) {
      registerUser();
    }
  });

  async function registerUser() {
    try {
      const nombre = nameInput ? nameInput.value : "";
      const apellido = lastnameInput ? lastnameInput.value : "";
      const edad = ageInput ? parseInt(ageInput.value) : 0;

      const estadoCivil = civilStatusInput ? civilStatusInput.value : "";
      const ocupacion = occupationInput ? occupationInput.value : "";
      const nivelEstudios = educationLevelInput ? educationLevelInput.value : "";
      const numeroTelefonico = phoneInput ? phoneInput.value : "";

      let genero = "";
      genderInputs.forEach((input) => {
        if (input.checked) {
          genero = input.value;
        }
      });
      
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación a tu cuenta de email.");

      let verificationInterval;
      verificationInterval = setInterval(async () => {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(verificationInterval);

          try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Sesión iniciada correctamente");
            window.location.href = "./evaluacionPrevia.html";
          } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
          }
        }
      }, 5000);

      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        edad,
        estadoCivil,
        genero,
        ocupacion,
        nivelEstudios,
        numeroTelefonico,
        email,
      });

      await setDoc(doc(db, "evaluacionRealizada", user.uid), {
        evaluacionPreviaRealizada: false,
      });

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres. Por favor, elige una contraseña más segura.");
      } else {
        alert("Ocurrió un error al registrar el usuario: " + error.message);
      }
    }
  }
});

function validarFormulario(formulario) {
  const inputs = formulario.querySelectorAll("input, select");
  for (let input of inputs) {
    if (input.type !== "submit" && input.type !== "button") {
      if (input.type === "radio") {
        const name = input.name;
        const radios = formulario.querySelectorAll(`input[name='${name}']:checked`);
        if (radios.length === 0) {
          alert("Por favor complete todas las preguntas.");
          return false;
        }
      } else if (input.tagName === "SELECT") {
        if (input.value === "") {
          alert("Por favor complete todas las preguntas.");
          return false;
        }
      } else if (input.id === "phone") { // Validación para el número telefónico
        if (input.value.length !== 10) {
          alert("El número telefónico debe tener 10 dígitos.");
          return false;
        }
      } else if (input.type === "checkbox" && input.id === "avisoConsentimiento") { // Validación para el checkbox
        if (!input.checked) {
          alert("Por favor, acepta el Aviso de Privacidad y el Consentimiento Informado.");
          return false;
        }
      } else {
        if (!input.value) {
          alert("Por favor complete todas las preguntas.");
          return false;
        }
      }
    }
  }
  return true;
}