let huertaActual = 0;
const cultivos = {
    1:
    {
        nombre: "Acelga",
        distanciaLineas: 60,
        distanciaPlantas: 20,
        tiempoCosechar: [2,3],
        riego: "moderado"
    },
    2:
    {
        nombre: "Apio",
        distanciaLineas: 40,
        distanciaPlantas: 15,
        tiempoCosechar: [4,4],
        riego: "abundante"
    },
    3:
    {
        nombre: "Espinaca",
        distanciaLineas: 40,
        distanciaPlantas: 8,
        tiempoCosechar: [2,3],
        riego: "moderado"
    },
    4:
    {
        nombre: "Lechuga",
        distanciaLineas: 60,
        distanciaPlantas: 25,
        tiempoCosechar: [3,4],
        riego: "moderado"
    },
    5:
    {
        nombre: "Sandía",
        distanciaLineas: 180,
        distanciaPlantas: 100,
        tiempoCosechar: [4,4],
        riego: "abundante"
    }
    
}
localStorage.setItem("cultivos",JSON.stringify(cultivos));
let misHuertas;
if (JSON.parse(localStorage.getItem("misHuertas"))) {
    misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
} else {
    misHuertas = [];
}
let btnCrearHuerta = document.getElementById("btnCrearHuerta");
btnCrearHuerta.onclick = crearHuerta;
let verMisHuertas = document.getElementById("verMisHuertas");
verMisHuertas.onclick = verHuertas;
let btnBorrarTodo = document.getElementById("borrarTodo");
btnBorrarTodo.onclick = borrarTodo;

function borrarTodo() {
    if (confirm("¿Está seguro de que desea eliminar todo?")) {
        window.localStorage.removeItem("misHuertas");
        misHuertas = [];
    }
}

function crearHuerta() {
    misHuertas.push([misHuertas.length + 1,undefined,undefined,undefined,[]]);
    huertaActual = misHuertas.length - 1;
    localStorage.setItem("huertaActual",JSON.stringify(huertaActual));
    localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    window.location.assign("pages/crear.html");
}

function verHuertas() {
    if (misHuertas[0]) {
        window.location.assign("pages/mishuertas.html");
    } else {
        alert("No hay huertas creadas aún");
    }
}