// JavaScript
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);

// Obtén la referencia a la autenticación y la base de datos de Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Función para obtener el usuario autenticado
function obtenerUsuarioAutenticado() {
  onAuthStateChanged(auth, (user) => {
    const userInfoElement = document.getElementById('userInfo');
    userInfoElement.innerHTML = ""; // Limpiar el contenido previo

    if (user) {
      // El usuario está autenticado
      const userId = user.uid;

      // Intentar obtener el usuario de la colección 'usuarios'
      const usuariosDocRef = doc(db, 'usuarios', userId);
      getDoc(usuariosDocRef).then((usuariosDoc) => {
        if (usuariosDoc.exists()) {
          mostrarInformacionUsuario(usuariosDoc.data(), userId, userInfoElement);
        } else {
          // Si el usuario no está en 'usuarios', buscar en 'users'
          const usersDocRef = doc(db, 'users', userId);
          getDoc(usersDocRef).then((usersDoc) => {
            if (usersDoc.exists()) {
              mostrarInformacionUsuario(usersDoc.data(), userId, userInfoElement);
            } else {
              userInfoElement.appendChild(createParagraph("El usuario no existe en ninguna colección"));
            }
          }).catch((error) => {
            userInfoElement.appendChild(createParagraph(`Error al obtener los datos del usuario: ${error}`));
          });
        }
      }).catch((error) => {
        userInfoElement.appendChild(createParagraph(`Error al obtener los datos del usuario: ${error}`));
      });

    } else {
      // El usuario no está autenticado
      userInfoElement.appendChild(createParagraph("No hay usuario autenticado"));
    }
  });
}

// Función para mostrar la información del usuario
function mostrarInformacionUsuario(userData, userId, userInfoElement) {
  userInfoElement.appendChild(createParagraph(`<span class="campo">ID del usuario: <span class="valor">${userId}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Nombre:</span> <span class="valor">${userData.nombre}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Apellido:</span> <span class="valor">${userData.apellido}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Correo Electrónico:</span> <span class="valor">${userData.email}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Número Telefónico:</span> <span class="valor">${userData.numeroTelefonico || userData.number}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Edad:</span> <span class="valor">${userData.edad}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Estado civil:</span> <span class="valor">${userData.estadoCivil}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Género:</span> <span class="valor">${userData.genero}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Ocupación:</span> <span class="valor">${userData.ocupacion}</span>`));
  userInfoElement.appendChild(createParagraph(`<span class="campo">Nivel de estudios:</span> <span class="valor">${userData.nivelEstudios || userData.educacion}</span>`));
}

// Función para crear un elemento <p> con la clase especificada
function createParagraph(html) {
  const p = document.createElement('p');
  p.innerHTML = html;
  return p;
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerUsuarioAutenticado);