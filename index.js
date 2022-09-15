fetch("js/lista.json") // Lista de cultivos en formato JSON
    .then((resp) => resp.json())
    .then(function (data) {
        localStorage.setItem("cultivos", JSON.stringify(data)); // Se guarda en local storage
    });
let huertaActual = 0;
let misHuertas = localStorage.getItem("misHuertas") ? JSON.parse(localStorage.getItem("misHuertas")) : [];

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
    misHuertas.push([misHuertas[misHuertas.length - 1] ? misHuertas[misHuertas.length - 1][0] + 1 : 1, "", 0, undefined, []]);
    huertaActual = misHuertas.length - 1;
    localStorage.setItem("huertaActual", JSON.stringify(huertaActual));
    localStorage.setItem("misHuertas", JSON.stringify(misHuertas));
    window.location.assign("pages/crear.html");
}

let verHuertas = () => {
    misHuertas[0] ? window.location.assign("pages/mishuertas.html") :
    Swal.fire(
        'Mmm...',
        'No hay huertas creadas',
        'error'
    )
}

document.getElementById("btnCrearHuerta").onclick = crearHuerta;
document.getElementById("verMisHuertas").onclick = verHuertas;
document.getElementById("borrarTodo").onclick = borrarTodo;

document.getElementById("info").onclick = () => {
    location.assign("pages/info.html");
}


