import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
    authDomain: "serena-mente.firebaseapp.com",
    projectId: "serena-mente",
    storageBucket: "serena-mente.appspot.com",
    messagingSenderId: "183868385167",
    appId: "1:183868385167:web:442b02f182fc8a28260dfa",
    measurementId: "G-LVWYEJBRHE"
  };

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializar Firestore
const firestore = getFirestore(firebaseApp);

// Obtener referencia a la colección de preguntas
const questionsRef = collection(firestore, 'pre', 'preguntas');

// Obtener las preguntas y mostrarlas en la página HTML
function renderQuestions() {
    const questionsList = document.getElementById('questions-list');

    getDocs(questionsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const questionData = doc.data();
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p>Pregunta: ${questionData.text}</p>
                <p>Respuesta: ${questionData.answer}</p>
            `;
            questionsList.appendChild(questionElement);
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// Llamar a la función para renderizar las preguntas
renderQuestions();

export {};
