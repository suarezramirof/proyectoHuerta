let misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
let checksEliminar, botonesModificar;
const btnEliminarHuerta = document.getElementById("btnEliminarHuerta");
let tablaHuertas = document.getElementById("tablaMisHuertas");
actualizarTabla();

for (let i = 0; i < botonesModificar.length; i++) {
    botonesModificar[i].onclick = function() {
        modificar(i)
    };
}

function modificar(i){
    localStorage.setItem("huertaActual",JSON.stringify(i));
    location.assign("crear.html");
}
document.getElementById("btnInicio").onclick = function() {
    location.assign("../index.html");
}

btnEliminarHuerta.onclick = function (){
    noEliminar = [];
    for (let i = 0; i < checksEliminar.length; i++) {
        if (!checksEliminar[i].checked) {
            noEliminar.push(i);
        }
    }
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
    let listaHuertas = "<tr><td>ID</td><td>Huerta</td><td>Área (m2)</td><td>Área restante</td><td>Ver/Modificar</td><td>Eliminar</td></tr>";
    for (let i = 0; i < misHuertas.length; i++) {
        listaHuertas += `<tr><td>${misHuertas[i][0]}</td><td>${misHuertas[i][1]}</td><td>${misHuertas[i][2]}</td><td>${misHuertas[i][3]}</td><td><button class="botonesModificar"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarHuertas"></td></tr>`;
    }
    tablaHuertas.innerHTML = listaHuertas;
    botonesModificar = document.getElementsByClassName("botonesModificar");
    checksEliminar = document.getElementsByClassName("checksEliminarHuertas");
}