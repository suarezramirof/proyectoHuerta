//Declaraciones iniciales
const botonesHuerta = document.getElementsByClassName("btnHuerta");
const panelHuerta = document.getElementById("panelHuerta");
const btnAgregarCultivo = document.getElementById("btnAgregarCultivo");
const botonGuardarSalir = document.getElementById("guardarSalir");
const btnCancelarCrear = document.getElementById("btnCancelarCrear");
const seccionAgregarCultivo = document.getElementById("agregarCultivo");
const listaCultivos = JSON.parse(localStorage.getItem("cultivos"));
let misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
let huertaActual = JSON.parse(localStorage.getItem("huertaActual"));
let miHuerta = misHuertas[huertaActual];
let visAgregarCultivo = (JSON.parse(sessionStorage.getItem("visAgregarCultivo")) == true);
if (visAgregarCultivo) {
    selectorCultivosAgregar();
    let btnCargarCultivo = document.getElementById("btnCargarCultivo");
    btnCargarCultivo.onclick = cargarCultivo;
    let btnListo = document.getElementById("btnListo");
    btnListo.onclick = listoCultivos;
    seccionAgregarCultivo.style.display = "block";
}
btnAgregarCultivo.onclick = agregarCultivo;
botonGuardarSalir.onclick = guardarSalir;
btnCancelarCrear.onclick = cancelarCrear;
let botonesModificarCultivo;
if (miHuerta[1]) { //Esta condición solo se cumple si entro a ver/modificar una huerta, si es nueva como [1] es "", no se ejecuta.
    recargar();
}
function selectorCultivosAgregar() {
    let selectorCultivos = document.getElementById("selectorCultivos");
    let listaSelectores = "";
    for (let key of Object.keys(listaCultivos)) {
        listaSelectores += `<li><input type="radio" name="cultivos" value="${key}" id="${key}">${listaCultivos[key]["nombre"]}</li>`;
    }
    selectorCultivos.innerHTML = listaSelectores;
}
function agregarCultivo() {
    for (boton of botonesHuerta) {
        boton.disabled = true;
    }
    selectorCultivosAgregar();
    let btnCargarCultivo = document.getElementById("btnCargarCultivo");
    btnCargarCultivo.onclick = cargarCultivo;
    let btnListo = document.getElementById("btnListo");
    btnListo.onclick = listoCultivos;
    let inputsAgregar = document.getElementsByClassName("inputAgregar");
    for (input of inputsAgregar) {
        input.addEventListener("keypress", function(event) {
            if (event.key == "Enter") {
                event.preventDefault();
                btnCargarCultivo.click();
            }
        })
    }
    visAgregarCultivo = true;
    sessionStorage.setItem("visAgregarCultivo",JSON.stringify(visAgregarCultivo));
    seccionAgregarCultivo.style.display = "block";
}
//Función ejecutada con el botón cargar cultivo. Pasa un array con el número del cultivo elegido, la cantidad y la fecha de siembra.
function cargarCultivo() {
    let cantidad = document.getElementById("cantidadCultivo").value;
    let fechaSiembra = document.getElementById("fechaSiembra").value;
    let cultivos = document.getElementsByName("cultivos");
    let cultivoElegido;
    for (let i = 0; i < cultivos.length; i++) {
        if (cultivos[i].checked) {
            cultivoElegido = cultivos[i].value;
        }
    }
    if (!cultivoElegido || !cantidad) {
        alert("Seleccione un cultivo y escriba una cantidad");
    } else {
        let cultivo = [cultivoElegido,cantidad,fechaSiembra];
        miHuerta[4].push(cultivo);
        let posicion = miHuerta[4][miHuerta[4].length - 1];
        let tablaCultivos = document.getElementById("tablaCultivos");
        if (!tablaCultivos.innerHTML) {
            tablaCultivos.innerHTML = `<tr><td>ID</td><td>Cultivo</td><td>Cantidad</td><td>Fecha de siembra</td><td>Modificar</td><td>Eliminar</td></tr>`
        }
        tablaCultivos.innerHTML+=`<tr><td>${miHuerta[4].length}</td><td>${listaCultivos[posicion[0]]["nombre"]}</td><td>${posicion[1]}</td><td>${posicion[2]}</td><td><button class="botonesModificarCultivo"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarCultivo"></td></tr>`;
        misHuertas[huertaActual] = miHuerta;
        // localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    }
    botonesModificarCultivo = document.getElementsByClassName("botonesModificarCultivo");
    for (let i = 0; i < botonesModificarCultivo.length; i++) {
        botonesModificarCultivo[i].onclick = function() {
            modificarCultivo(i);
        }
    }
}

function listoCultivos() {
    for (boton of botonesHuerta) {
        boton.disabled = false;
    }
    seccionAgregarCultivo.style.display = "none";
    visAgregarCultivo = false;
    sessionStorage.setItem("visAgregarCultivo",JSON.stringify(visAgregarCultivo));
}

function guardarSalir() {
    nombreHuerta = document.getElementById("nombreHuerta").value;
    areaHuerta = document.getElementById("areaHuerta").value;
    if (nombreHuerta && areaHuerta) {
        miHuerta[1] = nombreHuerta;
        miHuerta[2] = areaHuerta;
        miHuerta[3] = parseFloat(areaHuerta);
        for (let i = 0; i < miHuerta[4].length; i++) {
            miHuerta[3] -= (listaCultivos[miHuerta[4][i][0]]["distanciaLineas"] * listaCultivos[miHuerta[4][i][0]]["distanciaPlantas"] / 10000 * miHuerta[4][i][1]);
        }
        miHuerta[3] = miHuerta[3].toFixed(2);
        misHuertas[misHuertas.length - 1] = miHuerta;
        localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
        window.location.assign("mishuertas.html");
    } else if (!nombreHuerta && areaHuerta) {
        alert("Introduzca un nombre para la huerta");
    } else if (nombreHuerta && !areaHuerta) {
        alert("Introduzca el área de la huerta");
    } else {
        alert("Introduzca un nombre y un área para la huerta");
    }
}

function cancelarCrear() {
    if (!(document.getElementById("nombreHuerta").value == miHuerta[1] && document.getElementById("areaHuerta").value == miHuerta[2] && JSON.stringify(miHuerta[4]) == JSON.stringify(JSON.parse(localStorage.getItem("misHuertas"))[huertaActual][4]))) {
        let confirmacionCancelar = document.getElementById("confirmacionCancelar");
        confirmacionCancelar.showModal();
        document.getElementById("siGuardarCambios").onclick = function() {
            confirmacionCancelar.close();
            guardarSalir();
        }
        document.getElementById("noGuardarCambios").onclick = function() {
            confirmacionCancelar.close();
            salirSinGuardar();
        }
        document.getElementById("noSalir").onclick = function() {
            confirmacionCancelar.close();
        }
    } else {
        if (!miHuerta[1]) {
            misHuertas.pop();
            localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
        }
        window.location.assign("../index.html");
    }
}
function salirSinGuardar() {
    if (!miHuerta[1]) {
        misHuertas.pop();
        localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    }
    window.location.assign("../index.html");
}

function modificarCultivo(id) {
    seccionAgregarCultivo.style.display = "none";
    panelHuerta.style.display = "none";
    let seccionModificarCultivo = document.getElementById("modificarCultivo");
    seccionModificarCultivo.style.display = "block";
    let btnModificarCultivo = document.getElementById("btnModificarCultivo");
    let btnCancelarModificacion = document.getElementById("btnCancelarModificacion");
    let cultivoElegido = miHuerta[4][id][0];
    let selectorCultivos = document.getElementById("selectorCultivosModificar");
    let elementosSelectorCultivos = "";
    for (let cultivo of Object.keys(listaCultivos)) {
        elementosSelectorCultivos += `<li><input ${(cultivo == cultivoElegido ? "checked" : "")} type="radio" name="cultivosModificar" value="${cultivo}" id="${cultivo}">${listaCultivos[cultivo]["nombre"]}</li>`;
    }
    selectorCultivos.innerHTML = elementosSelectorCultivos;
    let cantidad = miHuerta[4][id][1];
    let fechaSiembra = miHuerta[4][id][2];
    document.getElementById("cantidadCultivoModificar").value = cantidad;
    document.getElementById("fechaSiembraModificar").value = fechaSiembra;
    btnModificarCultivo.onclick = function() {
        guardarModificarCultivo(id);
    }
    btnCancelarModificacion.onclick = function() {
        if (visAgregarCultivo) {
            seccionAgregarCultivo.style.display = "block";
        }
        panelHuerta.style.display = "block";
        let seccionModificarCultivo = document.getElementById("modificarCultivo");
        seccionModificarCultivo.style.display = "none";
    }
}

function guardarModificarCultivo(cultivoElegido) {
    let id;
    let cultivos = document.getElementsByName("cultivosModificar");
    for (let i = 0; i < cultivos.length; i++) {
        if (cultivos[i].checked) {
            id = cultivos[i].value;
        }
    }
    let cantidad = document.getElementById("cantidadCultivoModificar").value;
    let fechaSiembra = document.getElementById("fechaSiembraModificar").value;
    miHuerta[4][cultivoElegido][0] = id;
    miHuerta[4][cultivoElegido][1] = cantidad;
    miHuerta[4][cultivoElegido][2] = fechaSiembra;
    misHuertas[huertaActual] = miHuerta;
    // localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
    if (visAgregarCultivo) {
        seccionAgregarCultivo.style.display = "block";
    }
    panelHuerta.style.display = "block";
    let seccionModificarCultivo = document.getElementById("modificarCultivo");
    seccionModificarCultivo.style.display = "none";
    recargar(true);
}

function recargar(a) {
    if (!a) {
        misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
        miHuerta = misHuertas[huertaActual];
    }
    document.getElementById("nombreHuerta").value = miHuerta[1];
    document.getElementById("areaHuerta").value = miHuerta[2];
    if (miHuerta[4][0]) {
        let tablaCultivos = document.getElementById("tablaCultivos");
        let listaTablaCultivos = "";
        for (let i = 0; i < miHuerta[4].length; i++) {
            let posicion = miHuerta[4][i];
            listaTablaCultivos += `<tr><td>${i + 1}</td><td>${listaCultivos[posicion[0]]["nombre"]}</td><td>${posicion[1]}</td><td>${posicion[2]}</td><td><button class="botonesModificarCultivo"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarCultivo"></td></tr>`
        }
        tablaCultivos.innerHTML = `<tr><td>ID</td><td>Cultivo</td><td>Cantidad</td><td>Fecha de siembra</td><td>Modificar</td><td>Eliminar</td></tr>${listaTablaCultivos}`
        botonesModificarCultivo = document.getElementsByClassName("botonesModificarCultivo");
        for (let i = 0; i < botonesModificarCultivo.length; i++) {
            botonesModificarCultivo[i].onclick = function() {
                modificarCultivo(i);
            }
        }
    }}