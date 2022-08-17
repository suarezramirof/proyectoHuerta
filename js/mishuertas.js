const misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
let listaHuertas = "";
let tablaHuertas = document.getElementById("tablaMisHuertas");
for (let i = 0; i < misHuertas.length; i++) {
    listaHuertas += `<tr><td>${misHuertas[i][0]}</td><td>${misHuertas[i][1]}</td><td>${misHuertas[i][2]}</td><td>${misHuertas[i][3]}</td><td><button class="botonesModificar"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarHuertas"></td></tr>`;
}
tablaHuertas.innerHTML += listaHuertas;
let botonesModificar = document.getElementsByClassName("botonesModificar");
for (let i = 0; i < botonesModificar.length; i++) {
    botonesModificar[i].onclick = function() {
        modificar(i)
    };
}

function modificar(i){
    localStorage.setItem("huertaActual",JSON.stringify(i));
    window.location.assign("crear.html");
}
