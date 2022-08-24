let misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
let checksEliminar, botonesModificar;
const btnEliminarHuerta = document.getElementById("btnEliminarHuerta");
let tablaHuertas = document.getElementById("tablaMisHuertas");
actualizarTabla();

function modificar(i){
    localStorage.setItem("huertaActual",JSON.stringify(i));
    location.assign("crear.html");
}
document.getElementById("btnInicio").onclick = function() {
    location.assign("../index.html");
}

btnEliminarHuerta.onclick = function (){
    let noEliminar = [];
    for (let i = 0; i < checksEliminar.length; i++) {
        if (!checksEliminar[i].checked) {
            noEliminar.push(i);
        }
    }
    if (noEliminar.length == misHuertas.length) {
        Swal.fire(
            'Mmm...',
            'No hay huertas seleccionadas',
            'error'
        )
    } else {
        swal.fire({
            title: '¿Está seguro?',
            text: "No podrá deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado',
                text: 'La selección ha sido eliminada',
                icon: 'success'
            }).then(() => {
                if (!misHuertas[0]) {
                    location.assign("../index.html")
                }
            })
            eliminarHuertas(noEliminar);
            }
        })
    }
}
function eliminarHuertas(noEliminar) {
    let nuevasHuertas = [];
    for (let i = 0; i < misHuertas.length; i++) {
        if (noEliminar.includes(i)) {
            nuevasHuertas.push(misHuertas[i]);
        }
    }
    misHuertas = nuevasHuertas;
    localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    localStorage.removeItem("huertaActual");
    actualizarTabla();
}

function actualizarTabla() {
    let listaHuertas = "";
    for (let i = 0; i < misHuertas.length; i++) {
        listaHuertas += `<tr><td>${misHuertas[i][0]}</td><td>${misHuertas[i][1]}</td><td>${misHuertas[i][2]}</td><td>${misHuertas[i][3]}</td><td><button class="botonesModificar"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarHuertas"></td></tr>`;
    }
    tablaHuertas.innerHTML = listaHuertas;
    botonesModificar = document.getElementsByClassName("botonesModificar");
    for (let i = 0; i < botonesModificar.length; i++) {
        botonesModificar[i].onclick = function() {
            modificar(i)
        };
    }
    checksEliminar = document.getElementsByClassName("checksEliminarHuertas");
}