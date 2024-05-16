// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc, collection } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const formulario1 = document.getElementById("formulario1");
  const formulario2 = document.getElementById("formulario2");
  const formulario3 = document.getElementById("formulario3");
  const formulario4 = document.getElementById("formulario4");
  const formulario5 = document.getElementById("formulario5");
  const formulario6 = document.getElementById("formulario6");
  const formulario7 = document.getElementById("formulario7");
  const siguiente1 = document.getElementById("siguiente1");
  const siguiente2 = document.getElementById("siguiente2");
  const siguiente3 = document.getElementById("siguiente3");
  const siguiente4 = document.getElementById("siguiente4");
  const siguiente5 = document.getElementById("siguiente5");
  const siguiente6 = document.getElementById("siguiente6");
  const anterior2 = document.getElementById("anterior2");
  const anterior3 = document.getElementById("anterior3");
  const anterior4 = document.getElementById("anterior4");
  const anterior5 = document.getElementById("anterior5");
  const anterior6 = document.getElementById("anterior6");
  const anterior7 = document.getElementById("anterior7");
  const enviar = document.getElementById("enviar");
  const resultadosDiv = document.getElementById("resultados");
  const puntuacionTotalSpan = document.getElementById("puntuacionTotalSpan");
  const puntuacionTotalSpan2 = document.getElementById("puntuacionTotalSpan2");
  const puntuacionTotalSpan3 = document.getElementById("puntuacionTotalSpan3");
  const puntuacionTotalSpan4 = document.getElementById("puntuacionTotalSpan4");
  const puntuacionTotalSpan5 = document.getElementById("puntuacionTotalSpan5");
  const puntuacionTotalSpan6 = document.getElementById("puntuacionTotalSpan6");
  const termometroDiv = document.querySelector("#termometroBAI .nivel");
  const termometroDiv2 = document.querySelector("#termometroBDI .nivel");
  const termometroDiv3 = document.querySelector("#termometroPSS .nivel");
  const termometroDiv4 = document.querySelector("#termometroMINI .nivel");
  const termometroDiv5 = document.querySelector("#termometroWBI .nivel");
  const termometroDiv6 = document.querySelector("#termometroICSP .nivel");

  siguiente1.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario1)) {
      document.getElementById("form1").style.display = "none";
      document.getElementById("form2").style.display = "block";
    }
  });

  siguiente2.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario2)) {
      document.getElementById("form2").style.display = "none";
      document.getElementById("form3").style.display = "block";
    }
  });

  siguiente3.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario3)) {
      document.getElementById("form3").style.display = "none";
      document.getElementById("form4").style.display = "block";
    }
  });

  siguiente4.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario4)) {
      document.getElementById("form4").style.display = "none";
      document.getElementById("form5").style.display = "block";
    }
  });

  siguiente5.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario5)) {
      document.getElementById("form5").style.display = "none";
      document.getElementById("form6").style.display = "block";
    }
  });

  siguiente6.addEventListener("click", function (event) {
    event.preventDefault();
    if (validarFormulario(formulario6)) {
      document.getElementById("form6").style.display = "none";
      document.getElementById("form7").style.display = "block";
    }
  });

  anterior2.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";
  });

  anterior3.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form3").style.display = "none";
    document.getElementById("form2").style.display = "block";
  });

  anterior4.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form4").style.display = "none";
    document.getElementById("form3").style.display = "block";
  });

  anterior5.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form5").style.display = "none";
    document.getElementById("form4").style.display = "block";
  });

  anterior6.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form6").style.display = "none";
    document.getElementById("form5").style.display = "block";
  });

  anterior7.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form7").style.display = "none";
    document.getElementById("form6").style.display = "block";
  });

  enviar.addEventListener("click", async function (event) {
    event.preventDefault();
    const puntuacionTotalBAI = calcularPuntuacionTotalBAI();
    const puntuacionTotalBDI = calcularPuntuacionTotalBDI();
    const puntuacionTotalPSS = calcularPuntuacionTotalPSS();
    const puntuacionTotalMINI = calcularPuntuacionTotalMINI();
    const puntuacionTotalWBI = calcularPuntuacionTotalWBI();
    const puntuacionTotalICSP = calcularPuntuacionTotalICSP();
  
    // Guardar los datos en Firestore
    await registerData(puntuacionTotalBAI, puntuacionTotalBDI, puntuacionTotalPSS, puntuacionTotalMINI, puntuacionTotalWBI, puntuacionTotalICSP);
  
    // Actualizar el campo "evaluacionPrevia" a true en la colección "evaluacionRealizada"
    await setDoc(doc(db, "evaluacionRealizada", auth.currentUser.uid), {
      evaluacionPreviaRealizada: true,
    }, { merge: true });
  
    // Si el formulario está validado, mostrar los resultados
    if (validarFormulario(formulario7)) {
      document.getElementById("form7").style.display = "none";
      document.getElementById("resultados").style.display = "block";
      mostrarResultadosBAI(puntuacionTotalBAI);
      mostrarResultadosBDI(puntuacionTotalBDI);
      mostrarResultadosPSS(puntuacionTotalPSS);
      mostrarResultadosMINI(puntuacionTotalMINI);
      mostrarResultadosWBI(puntuacionTotalWBI);
      mostrarResultadosICSP(puntuacionTotalICSP);
      criteriosExclusion();
    }
  });  

  function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll("input");
    for (let input of inputs) {
      if (input.type !== "submit" && input.type !== "button") {
        if (input.type === "radio") {
          const name = input.name;
          const radios = formulario.querySelectorAll(
            `input[name='${name}']:checked`
          );
          if (radios.length === 0) {
            alert("Por favor complete todas las preguntas.");
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

  function criteriosExclusion() {
    const pregunta7SocioDemo = formulario1.tratamiento.value;
    const pregunta9BDI = formulario3.q9.value;
  
    if(pregunta7SocioDemo === 'SI' || pregunta9BDI === '2' || pregunta9BDI === '3'){
      setDoc(doc(db, "rechazado", auth.currentUser.uid), {
        rechazado: true,
      }).then(() => {
        window.location.href = './atencionEspecializada.html';
      }).catch(error => {
        console.error("Error al agregar usuario a la colección 'rechazado':", error);
      });
    }
  }
    
  function calcularPuntuacionTotalBAI() {
    let puntuacionTotalBAI = 0;
    const formularios = [formulario2];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalBAI += parseInt(input.value);
      });
    });
    return puntuacionTotalBAI;
  }

  function calcularPuntuacionTotalBDI() {
    let puntuacionTotalBDI = 0;
    const formularios = [formulario3];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalBDI += parseInt(input.value);
      });
    });
    return puntuacionTotalBDI;
  }

  function calcularPuntuacionTotalPSS() {
    let puntuacionTotalPSS = 0;
    const formularios = [formulario4];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalPSS += parseInt(input.value);
      });
    });
    return puntuacionTotalPSS;
  }

  function calcularPuntuacionTotalMINI() {
    const respuestas = {
      q22: formulario5.q22.value, 
      q23: formulario5.q23.value, 
      q24: formulario5.q24.value, 
      q25: formulario5.q25.value, 
      q26: formulario5.q26.value, 
      q27: formulario5.q27.value, 
    };

    const siCount = Object.values(respuestas).filter(
      (value) => value === "SI"
    ).length;

    let riesgoSuicida = "";

    if (
      respuestas.q25 === "SI" ||
      respuestas.q26 === "SI" ||
      (respuestas.q24 === "SI" && respuestas.q27 === "SI")
    ) {
      riesgoSuicida = "SEVERO";
    } else if (
      respuestas.q24 === "SI" ||
      (respuestas.q23 === "SI" && respuestas.q27 === "SI")
    ) {
      riesgoSuicida = "MODERADO";
    } else {
      riesgoSuicida = "LIGERO";
    }
    return { nivel: riesgoSuicida, count: siCount };
  }

  function calcularPuntuacionTotalWBI() {
    let puntuacionTotalWBI = 0;
    const formularios = [formulario6];
    formularios.forEach((formulario) => {
      const inputs = formulario.querySelectorAll("input[type=radio]:checked");
      inputs.forEach((input) => {
        puntuacionTotalWBI += parseInt(input.value);
      });
    });
    return puntuacionTotalWBI;
  }

  function calcularPuntuacionTotalICSP() {
    const valorPregunta54 = parseInt(formulario7.question54.value); 
    const valorPregunta41 = parseInt(formulario7.question41.value); 
    const valorPregunta44 = parseInt(formulario7.question44.value); 
    const valorPregunta43 = parseInt(formulario7.question43.value); 
    const valorPregunta55 = parseInt(formulario7.question55.value); 
    const valorPregunta56 = parseInt(formulario7.question56.value); 
    const valorPregunta57 = parseInt(formulario7.question57.value);

    const valoresPreguntasComponente5 = [
      parseInt(formulario7.question45.value),
      parseInt(formulario7.question46.value),
      parseInt(formulario7.question47.value),
      parseInt(formulario7.question48.value),
      parseInt(formulario7.question49.value),
      parseInt(formulario7.question50.value),
      parseInt(formulario7.question51.value),
      parseInt(formulario7.question52.value),
      parseInt(formulario7.question53.value),
    ];

    let puntuacionPregunta41 = 0;
    let sumaPuntuacionPregunta41Pregunta44 = 0;
    let puntuacionTotalComponente2 = 0;
    let puntuacionTotalComponente3 = 0;
    let sumaPuntuacionP45aP53 = 0;
    let puntuacionTotalComponente5 = 0;
    let sumaPuntuacionPregunta55Pregunta56 = 0;
    let puntuacionTotalComponente7 = 0;

    if (valorPregunta41 <= 15) {
      puntuacionPregunta41 = 0;
    } else if (valorPregunta41 >= 16 && valorPregunta41 <= 30) {
      puntuacionPregunta41 = 1;
    } else if (valorPregunta41 >= 31 && valorPregunta41 <= 60) {
      puntuacionPregunta41 = 2;
    } else {
      puntuacionPregunta41 = 3;
    }

    sumaPuntuacionPregunta41Pregunta44 = puntuacionPregunta41 + valorPregunta44;

    if (sumaPuntuacionPregunta41Pregunta44 == 0) {
      puntuacionTotalComponente2 = 0;
    } else if (
      sumaPuntuacionPregunta41Pregunta44 == 1 ||
      sumaPuntuacionPregunta41Pregunta44 == 2
    ) {
      puntuacionTotalComponente2 = 1;
    } else if (
      sumaPuntuacionPregunta41Pregunta44 == 3 ||
      sumaPuntuacionPregunta41Pregunta44 == 4
    ) {
      puntuacionTotalComponente2 = 2;
    } else {
      puntuacionTotalComponente2 = 3;
    }

    if (valorPregunta43 >= 7) {
      puntuacionTotalComponente3 = 0;
    } else if (valorPregunta43 >= 6) {
      puntuacionTotalComponente3 = 1;
    } else if (valorPregunta43 >= 5) {
      puntuacionTotalComponente3 = 2;
    } else {
      puntuacionTotalComponente3 = 3;
    }

    const horaAcostarse = document.getElementById("question40").value;
    const horaLevantarse = document.getElementById("question42").value;
    const minutosHoraAcostarse = convertirHoraAMinutos(horaAcostarse);
    const minutosHoraLevantarse = convertirHoraAMinutos(horaLevantarse);

    let diferenciaMinutos = minutosHoraLevantarse - minutosHoraAcostarse;

    if (diferenciaMinutos < 0) {
      diferenciaMinutos += 24 * 60;
    }

    let horasDiferencia = Math.floor(diferenciaMinutos / 60);
    let minutosDiferencia = diferenciaMinutos % 60;
    let tiempoCama = (horasDiferencia * 60 + minutosDiferencia) / 60;
    let eficienciaSueno = (valorPregunta43 / tiempoCama) * 100;
    let puntuacionTotalComponente4 = 0;
    if (eficienciaSueno >= 85) {
      puntuacionTotalComponente4 = 0;
    } else if (eficienciaSueno >= 75 && eficienciaSueno <= 84) {
      puntuacionTotalComponente4 = 1;
    } else if (eficienciaSueno >= 65 && eficienciaSueno <= 74) {
      puntuacionTotalComponente4 = 2;
    } else {
      puntuacionTotalComponente4 = 3;
    }
    valoresPreguntasComponente5.forEach((valoresPreguntasComponente5) => {
      sumaPuntuacionP45aP53 += valoresPreguntasComponente5;
    });

    if (sumaPuntuacionP45aP53 == 0) {
      puntuacionTotalComponente5 = 0;
    } else if (sumaPuntuacionP45aP53 >= 1 && sumaPuntuacionP45aP53 <= 9) {
      puntuacionTotalComponente5 = 1;
    } else if (sumaPuntuacionP45aP53 >= 10 && sumaPuntuacionP45aP53 <= 18) {
      puntuacionTotalComponente5 = 2;
    } else {
      puntuacionTotalComponente5 = 3;
    }

    sumaPuntuacionPregunta55Pregunta56 = valorPregunta56 + valorPregunta57;

    if (sumaPuntuacionPregunta55Pregunta56 == 0) {
      puntuacionTotalComponente7 = 0;
    } else if (
      sumaPuntuacionPregunta55Pregunta56 == 1 ||
      sumaPuntuacionPregunta55Pregunta56 == 2
    ) {
      puntuacionTotalComponente7 = 1;
    } else if (
      sumaPuntuacionPregunta55Pregunta56 == 3 ||
      sumaPuntuacionPregunta55Pregunta56 == 4
    ) {
      puntuacionTotalComponente7 = 2;
    } else {
      puntuacionTotalComponente7 = 3;
    }

    let sumaCalificacionGlobal =
      valorPregunta54 +
      puntuacionTotalComponente2 +
      puntuacionTotalComponente3 +
      puntuacionTotalComponente4 +
      puntuacionTotalComponente5 +
      valorPregunta55 +
      puntuacionTotalComponente7;
    return sumaCalificacionGlobal;
  }

  function mostrarResultadosBAI(puntuacionTotalBAI) {
    const porcentaje = (puntuacionTotalBAI / 60) * 100;
    let mensaje = "";
    let criterio = "";
    let termometroColor = "";
    if (puntuacionTotalBAI >= 0 && puntuacionTotalBAI < 16) {
      mensaje = "Nivel de ansiedad leve.";
      criterio =
        "Tus respuestas nos hacen considerar que puedes beneficiarte de un apoyo psicológicocomo el que ofrece SerenaMente a través del aprendizaje de habilidades emocionales, y así evitar que la ansiedadse vuelva una dificultad en tu vida.";
      termometroColor = "verde";
    } else if (puntuacionTotalBAI >= 16 && puntuacionTotalBAI < 31) {
      mensaje = "Nivel de ansiedad moderado.";
      criterio =
        "Tus respuestas nos hacen considerar que mejorar tu estado emocional de intranquilidad puede ser un objetivo de trabajo. Puedes beneficiarte de identificar estrategias de manejo de la ansiedad como las que realizarás a lo largo de SerenaMente.";
      termometroColor = "naranja";
    } else if (puntuacionTotalBAI >= 32 && puntuacionTotalBAI <= 60) {
      window.location.href = './atencionEspecializada.html';
      return;
    } else {
      mensaje = "ERROR Fuera de rango.";
      termometroColor = "negro";
    }
    puntuacionTotalSpan.textContent = puntuacionTotalBAI;
    mensajeResultado.textContent = mensaje;
    mensajeCriterioBAI.textContent = criterio;
    termometroDiv.style.height = `${porcentaje}%`;
    termometroDiv.className = `nivel ${termometroColor}`;
    resultadosDiv.style.display = "block";
  }

  function mostrarResultadosBDI(puntuacionTotalBDI) {
    const porcentajeBDI = (puntuacionTotalBDI / 63) * 100;
    let mensajeBDI = "";
    let criterioBDI = "";
    let termometroColorBDI = "";
    if (puntuacionTotalBDI >= 0 && puntuacionTotalBDI < 20) {
      mensajeBDI = "Nivel de depresión leve.";
      criterioBDI =
        "En SerenaMente tenemos diferentes contenidos que te facilitarán el manejo de tus emociones y así evitar que la depresión se convierta en un desafío para tu bienestar.";
      termometroColorBDI = "verde";
    } else if (puntuacionTotalBDI >= 20 && puntuacionTotalBDI < 29) {
      mensajeBDI = "Nivel de depresión moderada.";
      criterioBDI =
        "Tus respuestas nos llevan a pensar que trabajar en la mejora de tu estado emocional podría ser un objetivo valioso. En SerenaMente puedes beneficiarte al identificar estrategias, tal como las que llevarás a cabo a lo largo de los bloques en SerenaMente, y de esta manera, incrementar la plenitud en tu vida.";
      termometroColorBDI = "naranja";
    } else if (puntuacionTotalBDI >= 30 && puntuacionTotalBDI <= 63) {
      window.location.href = './atencionEspecializada.html';
      return;
    } else {
      mensajeBDI = "ERROR Fuera de rango.";
      termometroColorBDI = "negro";
    }
    puntuacionTotalSpan2.textContent = puntuacionTotalBDI;
    mensajeResultado2.textContent = mensajeBDI;
    mensajeCriterioBDI.textContent = criterioBDI;
    termometroDiv2.style.height = `${porcentajeBDI}%`;
    termometroDiv2.className = `nivel ${termometroColorBDI}`;
  }

  function mostrarResultadosPSS(puntuacionTotalPSS) {
    const porcentajePSS = (puntuacionTotalPSS / 56) * 100;
    let mensajePSS = "";
    let criterioPSS = "";
    let termometroColorPSS = "";

    if (puntuacionTotalPSS >= 0 && puntuacionTotalPSS <= 18) {
      mensajePSS = "Nivel de estrés leve.";
      criterioPSS =
        "Muestras habilidades para hacer frente a las situaciones desafiantes de la vida; sin embargo, fortalecer tus herramientas para manejar el estrés y mejorar tu bienestar emocional contribuirá aún más a tu calidad de vida.";
      termometroColorPSS = "verde";
    } else if (puntuacionTotalPSS >= 19 && puntuacionTotalPSS <= 37) {
      mensajePSS = "Nivel de estrés moderado.";
      criterioPSS =
        "En ocasiones, puedes sentirte abrumado por estrés moderado, pero logras afrontar las situaciones que se presentan. Completando los bloques de SerenaMente podrás ampliar tus habilidades para manejar esas situaciones sin poner en riesgo tu bienestar emocional.";
      termometroColorPSS = "naranja";
    } else if (puntuacionTotalPSS >= 38 && puntuacionTotalPSS <= 56) {
      mensajePSS = "Nivel de estrés alto.";
      criterioPSS =
        "Estás experimentando un nivel de estrés significativo. Es esencial que incorpores los seis bloques de SerenaMente para expandir tus estrategias y así poder enfrentar las situaciones estresantes, evitando poner en riesgo tu bienestar físico y mental.";
      termometroColorPSS = "rojo";
    } else {
      mensajePSS = "ERROR Fuera de rango.";
      termometroColorPSS = "negro";
    }

    puntuacionTotalSpan3.textContent = puntuacionTotalPSS;
    mensajeResultado3.textContent = mensajePSS;
    mensajeCriterioPSS.textContent = criterioPSS;
    termometroDiv3.style.height = `${porcentajePSS}%`;
    termometroDiv3.className = `nivel ${termometroColorPSS}`;
  }

  function mostrarResultadosMINI() {
    const { nivel, count } = calcularPuntuacionTotalMINI();
    let porcentajeMINI = (count / 6) * 100;
    let termometroColorMINI = "";
    let mensajeMINI = "";

    if (nivel === "MODERADO") {
      window.location.href = './atencionEspecializada.html';
      return;
    } else if (nivel === "SEVERO") {
      window.location.href = './atencionEspecializada.html';
      return;
    } else {
      mensajeMINI = "Riesgo suicida ligero.";
      termometroColorMINI = "verde";
    }
    puntuacionTotalSpan4.textContent = nivel;
    mensajeResultado4.textContent = mensajeMINI;
    termometroDiv4.style.height = `${porcentajeMINI}%`;
    termometroDiv4.className = `nivel ${termometroColorMINI}`;
  }

  function mostrarResultadosWBI(puntuacionTotalWBI) {
    const porcentajeWBI = (puntuacionTotalWBI / 15) * 100;
    let mensajeWBI = "";
    let criterioWBI = "";
    let termometroColorWBI = "";

    if (puntuacionTotalWBI > 13) {
      mensajeWBI = "Nivel de bienestar debajo del promedio.";
      criterioWBI =
        "Tu nivel de bienestar se encuentra por debajo del promedio, en los bloques de SerenaMente encontrarás actividades y recursos para cuidar de ti y mejorar tu estado de bienestar general.";
      termometroColorWBI = "naranja";
    } else {
      mensajeWBI = "Nivel de bienestar muy alto.";
      criterioWBI =
        "Tu nivel de bienestar está por arriba del promedio, pero aún puedes tomar acciones para aumentarlo. En SerenaMente encontrarás recursos para cuidar de este estado positivo y cómo incrementarlo.";
      termometroColorWBI = "verde";
    }
    puntuacionTotalSpan5.textContent = puntuacionTotalWBI;
    mensajeResultado5.textContent = mensajeWBI;
    mensajeCriterioWBI.textContent = criterioWBI;
    termometroDiv5.style.height = `${porcentajeWBI}%`;
    termometroDiv5.className = `nivel ${termometroColorWBI}`;
  }

  function mostrarResultadosICSP(puntuacionTotalICSP) {
    const porcentajeICSP = (puntuacionTotalICSP / 21) * 100;
    let mensajeICSP = "";
    let criterioICSP = "";
    let termometroColorICSP = "";

    if (puntuacionTotalICSP <= 5) {
      mensajeICSP = "Calidad del sueño buena.";
      criterioICSP =
        "Tus resultados muestran que tienes una buena calidad de sueño ¡sigue así!";
      termometroColorICSP = "verde";
    } else if (puntuacionTotalICSP > 5 && puntuacionTotalICSP <= 11) {
      mensajeICSP = "Calidad del sueño moderada.";
      criterioICSP =
        "Parece que tu calidad de sueño puede mejorar si cuidamos de tus hábitos de salud y de tus emociones. En SerenaMente encontrarás contenidos y estrategias que te permitirán dormir mejor.";
      termometroColorICSP = "naranja";
    } else {
      mensajeICSP = "Calidad del sueño mala.";
      criterioICSP =
        "Puede que tus emociones y pensamientos estén afectando tu calidad de sueño y que está a su vez afecte tu estado de ánimo. En SerenaMente encontrarás contenidos y estrategias que te permitan cuidar de tus emociones y cómo impactan en tu descanso.";
      termometroColorICSP = "rojo";
    }

    puntuacionTotalSpan6.textContent = puntuacionTotalICSP;
    mensajeResultado6.textContent = mensajeICSP;
    mensajeCriterioICSP.textContent = criterioICSP;
    termometroDiv6.style.height = `${porcentajeICSP}%`;
    termometroDiv6.className = `nivel ${termometroColorICSP}`;
  }

  function convertirHoraAMinutos(hora) {
    const [hh, mm] = hora.split(":").map(Number);
    return hh * 60 + mm;
  }

  async function registerData(puntuacionTotalBAI, puntuacionTotalBDI, puntuacionTotalPSS, puntuacionTotalMINI, puntuacionTotalWBI, puntuacionTotalICSP) {

    const user = auth.currentUser;
    if (!user) {
      alert("Debes iniciar sesión para registrar tus datos.");
      return;
    }
    try {
      await setDoc(doc(db, "resultadosEvaluacionPrevia", user.uid), {
        puntuacionTotalBAI,
        puntuacionTotalBDI,
        puntuacionTotalPSS,
        puntuacionTotalMINI,
        puntuacionTotalWBI,
        puntuacionTotalICSP,
      });

      // Guardar respuestas del cuestionario sociodemográfico
      const respuestasSociodemografico = {
        sexo: formulario1.querySelector('input[name="sexo"]:checked').value,
        edad: parseInt(formulario1.edad.value),
        estadoCivil: formulario1.estado_civil.value,
        nivelEstudios: formulario1.nivel_estudios.value,
        ocupacion: formulario1.ocupacion.value,
        lugarResidencia: formulario1.residencia.value,
        tratamiento: formulario1.querySelector('input[name="tratamiento"]:checked').value,
        medicamento: formulario1.querySelector('input[name="medicamento"]:checked').value,
        medicamentoCual: formulario1.medicamento_cual.value,
      };

      await guardarRespuestasCuestionarioSociodemografico(
        user.uid,
        respuestasSociodemografico
      );

      // Registro de respuestas del BAI
      const respuestasBAI = {};
      for (let i = 1; i <= 20; i++) {
        respuestasBAI[`Pregunta${i.toString().padStart(2, '0')}`] = parseInt(formulario2[`question${i}`].value);
      }

      await guardarRespuestasCuestionarioBAI(
        user.uid,
        puntuacionTotalBAI,
        respuestasBAI
      );

      // Registro de respuestas del BDI
      const respuestasBDI = {};
      for (let i = 1; i <= 21; i++) {
        respuestasBDI[`Pregunta${i.toString().padStart(2, '0')}`] = parseInt(formulario3[`q${i}`].value);
      }

      await guardarRespuestasCuestionarioBDI(
        user.uid,
        puntuacionTotalBDI,
        respuestasBDI
      );

      // Registro de respuestas del PSS
      const respuestasPSS = {};
      for (let i = 21; i <= 34; i++) {
        let j = i - 20;
        respuestasPSS[`Pregunta${j.toString().padStart(2, '0')}`] = parseInt(formulario4[`question${i}`].value);
      }

      await guardarRespuestasCuestionarioPSS(
        user.uid,
        puntuacionTotalPSS,
        respuestasPSS
      );

      // Registro de respuestas del MINI
      const respuestasMINI = {};
      for (let i = 22; i <= 27; i++) {
        let j = i - 21;
        respuestasMINI[`Pregunta${j.toString().padStart(2, '0')}`] = formulario5[`q${i}`].value;
      }

      await guardarRespuestasCuestionarioMINI(
        user.uid,
        puntuacionTotalMINI,
        respuestasMINI
      );

      // Registro de respuestas del WBI
      const respuestasWBI = {};
      for (let i = 35; i <= 39; i++) {
        let j = i - 34;
        respuestasWBI[`Pregunta${j.toString().padStart(2, '0')}`] = parseInt(formulario6[`question${i}`].value);
      }

      await guardarRespuestasCuestionarioWBI(
        user.uid,
        puntuacionTotalWBI,
        respuestasWBI
      );

      // Guardar respuestas del Índice de Calidad de Sueño de Pittsburgh (revisar si dejar float o int en la 4)
      const respuestasICSP = {
        "Pregunta01": formatHora(formulario7.question40.value),
        "Pregunta02": parseInt(formulario7.question41.value),
        "Pregunta03": formatHora(formulario7.question42.value),
        "Pregunta04": parseFloat(formulario7.question43.value),
        "Pregunta05a": parseInt(formulario7.question44.value),
        "Pregunta05b": parseInt(formulario7.question45.value),
        "Pregunta05c": parseInt(formulario7.question46.value),
        "Pregunta05d": parseInt(formulario7.question47.value),
        "Pregunta05e": parseInt(formulario7.question48.value),
        "Pregunta05f": parseInt(formulario7.question49.value),
        "Pregunta05g": parseInt(formulario7.question50.value),
        "Pregunta05h": parseInt(formulario7.question51.value),
        "Pregunta05i": parseInt(formulario7.question52.value),
        "Pregunta05j": {
          razon: formulario7.razones.value,
          puntuacion: parseInt(formulario7.question53.value)
        },
        "Pregunta06": parseInt(formulario7.question54.value),
        "Pregunta07": parseInt(formulario7.question55.value),
        "Pregunta08": parseInt(formulario7.question56.value),
        "Pregunta09": parseInt(formulario7.question57.value),
      };

      await guardarRespuestasCuestionarioICSP(
        user.uid,
        puntuacionTotalICSP,
        respuestasICSP
      );

    } catch (error) {
      console.error("Error al registrar datos:", error.code, error.message);
      alert("Ocurrió un error al registrar los datos: " + error.message);
    }
  }

  async function guardarRespuestasCuestionarioSociodemografico(userId, respuestasSociodemografico) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const sociodemograficoRef = doc(cuestionariosRef, "Sociodemografico");
  
      await setDoc(sociodemograficoRef, respuestasSociodemografico);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario sociodemográfico:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioBAI(userId, puntuacionTotalBAI, respuestasBAI) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const baiRef = doc(cuestionariosRef, "BAI");

      // Combinar la puntuación total y las respuestas en un solo objeto
      const data = {
        puntuacionTotal: puntuacionTotalBAI,
        ...respuestasBAI
      };

      await setDoc(baiRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario BAI:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioBDI(userId, puntuacionTotalBDI, respuestasBDI) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const bdiRef = doc(cuestionariosRef, "BDI");

      // Combinar la puntuación total y las respuestas en un solo objeto
      const data = {
        puntuacionTotal: puntuacionTotalBDI,
        ...respuestasBDI
      };

      await setDoc(bdiRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario BDI:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioPSS(userId, puntuacionTotalPSS, respuestasPSS) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const pssRef = doc(cuestionariosRef, "PSS");

      // Crear un objeto que combine la puntuación total y las respuestas del cuestionario
      const data = {
        puntuacionTotal: puntuacionTotalPSS,
        ...respuestasPSS  // Esto expandirá las respuestas del cuestionario como campos individuales
      };

      await setDoc(pssRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario PSS:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioMINI(userId, puntuacionTotalMINI, respuestasMINI) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const miniRef = doc(cuestionariosRef, "MINI");

      // Combinar la puntuación total y las respuestas en un solo objeto
      const data = {
        puntuacionTotal: puntuacionTotalMINI,
        ...respuestasMINI
      };

      await setDoc(miniRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario MINI:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioWBI(userId, puntuacionTotalWBI, respuestasWBI) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const wbiRef = doc(cuestionariosRef, "WBI");

      // Combinar la puntuación total y las respuestas en un solo objeto
      const data = {
        puntuacionTotal: puntuacionTotalWBI,
        ...respuestasWBI
      };

      await setDoc(wbiRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario WBI:", error.code, error.message);
      throw error;
    }
  }

  async function guardarRespuestasCuestionarioICSP(userId, puntuacionTotalICSP, respuestasICSP) {
    try {
      const resultadosEvaluacionPreviaRef = doc(db, "resultadosEvaluacionPrevia", userId);
      const cuestionariosRef = collection(resultadosEvaluacionPreviaRef, "cuestionarios");
      const icspRef = doc(cuestionariosRef, "ICSP");
  
      // Combinar la puntuación total y las respuestas en un solo objeto
      const data = {
        puntuacionTotal: puntuacionTotalICSP,
        ...respuestasICSP
      };
      await setDoc(icspRef, data);
    } catch (error) {
      console.error("Error al guardar respuestas del cuestionario ICSP:", error.code, error.message);
      throw error;
    }
  }
  
  function formatHora(horaString) {
    const [horas, minutos] = horaString.split(':');
    const fecha = new Date();
    fecha.setHours(parseInt(horas), parseInt(minutos), 0, 0);
    return fecha.toLocaleTimeString('es-ES', { hour12: false });
  }
});

/*CAMBIAR FORMA*/