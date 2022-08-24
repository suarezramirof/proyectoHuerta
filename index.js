let huertaActual = 0;
const cultivos = {
    1:
    {
        nombre: "Acelga",
        distanciaLineas: 60,
        distanciaPlantas: 20,
        tiempoCosechar: [2,3],
        riego: "moderado",
        siembra: "Todo el año",
        fotos: []
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
    swal.fire({
        title: '¿Está seguro?',
        text: "No podrá deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Borrado',
                'Se eliminaron todos los datos',
                'success'
            )
            window.localStorage.removeItem("misHuertas");
            misHuertas = [];
        }
    })
}

function crearHuerta() {
    misHuertas.push([misHuertas[misHuertas.length - 1] ? misHuertas[misHuertas.length - 1][0] + 1 : 1,"",0,undefined,[]]);
    huertaActual = misHuertas.length - 1;
    localStorage.setItem("huertaActual",JSON.stringify(huertaActual));
    localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    window.location.assign("pages/crear.html");
}

function verHuertas() {
    if (misHuertas[0]) {
        window.location.assign("pages/mishuertas.html");
    } else {
        Swal.fire(
            'Mmm...',
            'No hay huertas creadas',
            'error'
        )
    }
}

