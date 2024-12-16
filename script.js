// Función para calcular el día de la semana con el algoritmo de Zeller

function calcularDiaManual(fecha) {

    let [dia, mes, año] = fecha;

    // Ajustar meses enero y febrero

    if (mes < 3) {

        mes += 12;

        año -= 1;

    }

    const K = año % 100; // Últimos dos dígitos del año

    const J = Math.floor(año / 100); // Primeros dos dígitos del año

    // Fórmula de Zeller

    const h = (dia + Math.floor(13 * (mes + 1) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;

    // Convertir el resultado de Zeller a nombres de días

    const diasSemana = ["sábado", "domingo", "lunes", "martes", "miércoles", "jueves", "viernes"];

    return diasSemana[(h + 7) % 7]; // Asegurar un resultado positivo

}

// Generar una fecha aleatoria

function generarFechaAleatoria() {

    const año = Math.floor(Math.random() * (2100 - 1600 + 1)) + 1600;

    const mes = Math.floor(Math.random() * 12) + 1;

    const dia = Math.floor(Math.random() * (new Date(año, mes, 0).getDate())) + 1;

    return [dia, mes, año];

}

// Actualizar la pregunta y validar respuesta

const fechaActual = document.getElementById("fecha-actual");

const historialLista = document.getElementById("historial-lista");

let historial = [];

function actualizarPregunta() {

    const fecha = generarFechaAleatoria();

    const [dia, mes, año] = fecha;

    fechaActual.textContent = `${dia} ${new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(año, mes - 1))} ${año}`;

    fechaActual.dataset.respuesta = calcularDiaManual(fecha);

}

function actualizarHistorial(fecha, respuesta, correcta) {

    historial.unshift({ fecha, respuesta, correcta });

    if (historial.length > 5) historial.pop();

    historialLista.innerHTML = historial.map(item => {

        const clase = item.correcta ? "correcto" : "incorrecto";

        return `<li class="${clase}">${item.fecha} - ${item.respuesta} (${item.correcta ? "Correcto" : "Incorrecto"})</li>`;

    }).join("");

}

// Iniciar

actualizarPregunta();

document.querySelectorAll(".dia").forEach(boton => {

    boton.addEventListener("click", () => {

        const respuestaUsuario = boton.dataset.dia;

        const respuestaCorrecta = fechaActual.dataset.respuesta;

        if (respuestaUsuario === respuestaCorrecta) {

            actualizarHistorial(fechaActual.textContent, respuestaUsuario, true);

            actualizarPregunta();

        } else {

            actualizarHistorial(fechaActual.textContent, respuestaUsuario, false);

        }

    });

});