//Declaraciones iniciales
const esquemaHuerta = document.getElementById("esquemaHuerta");
const DateTime = luxon.DateTime;
const botonesHuerta = document.getElementsByClassName("btnHuerta");
const panelHuerta = document.getElementById("panelHuerta");
const btnAgregarCultivo = document.getElementById("btnAgregarCultivo");
const botonGuardarSalir = document.getElementById("guardarSalir");
const btnCancelarCrear = document.getElementById("btnCancelarCrear");
const btnEliminarCultivo = document.getElementById("btnEliminarCultivo");
const seccionAgregarCultivo = document.getElementById("agregarCultivo");
const listaCultivos = JSON.parse(localStorage.getItem("cultivos"));
let misHuertas = JSON.parse(localStorage.getItem("misHuertas"));
let huertaActual = JSON.parse(localStorage.getItem("huertaActual"));
let miHuerta = misHuertas[huertaActual];
let visAgregarCultivo = (JSON.parse(sessionStorage.getItem("visAgregarCultivo")) == true);
let pieTablaCultivos = document.getElementById("pieTablaCultivos");
if (visAgregarCultivo) {
    selectorCultivosAgregar();
    let btnCargarCultivo = document.getElementById("btnCargarCultivo");
    btnCargarCultivo.onclick = cargarCultivo;
    let btnListo = document.getElementById("btnListo");
    btnListo.onclick = listoCultivos;
    seccionAgregarCultivo.style.display = "block";
    pieTablaCultivos.style.display="table-footer-group";
}
btnAgregarCultivo.onclick = agregarCultivo;
botonGuardarSalir.onclick = guardarSalir;
btnCancelarCrear.onclick = cancelarCrear;
let botonesModificarCultivo, checksEliminarCultivo;
if (miHuerta[1]) { //Esta condición solo se cumple si entro a ver/modificar una huerta, si es nueva como [1] es "", no se ejecuta.
    recargar();
}
function selectorCultivosAgregar() {
    let dropDownCultivos = document.getElementById("dropDownCultivos");
    let opcionesDropDown = "";
    for (let key of Object.keys(listaCultivos)) {
        opcionesDropDown += `<option name="cultivos" value="${key}">${listaCultivos[key]["nombre"]}</option>`;
    }
    dropDownCultivos.innerHTML = `<option value="" selected disabled hidden>Seleccione</option>${opcionesDropDown}`;
}

function agregarCultivo() {
    for (boton of botonesHuerta) {
        boton.disabled = true;
    }
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
    pieTablaCultivos.style.display="table-footer-group";
    sessionStorage.setItem("visAgregarCultivo",JSON.stringify(visAgregarCultivo));
    seccionAgregarCultivo.style.display = "block";
    selectorCultivosAgregar();
}
//Función ejecutada con el botón cargar cultivo. Pasa un array con el número del cultivo elegido, la cantidad y la fecha de siembra.
function cargarCultivo() {
    let cultivoElegido;
    let dropDownCultivos = document.getElementById("dropDownCultivos");
    cultivoElegido = dropDownCultivos.options[dropDownCultivos.selectedIndex].value;
    let cantidad = document.getElementById("cantidadCultivo").value;
    if (!cultivoElegido && cantidad) {
        Swal.fire('','Seleccione un cultivo','warning')
    } else if (cultivoElegido && !cantidad) {
        Swal.fire('','Escriba una cantidad','warning')
    } else if (!cultivoElegido && !cantidad) {
        Swal.fire('','Seleccione un cultivo y especifique la cantidad','warning')
    } else {
        let fechaSiembra = document.getElementById("fechaSiembra").value;
        let cultivo = [cultivoElegido,cantidad,fechaSiembra];
        miHuerta[4].push(cultivo);
        recargar(true);
    }
}
function listoCultivos() {
    for (boton of botonesHuerta) {
        boton.disabled = false;
    }
    seccionAgregarCultivo.style.display = "none";
    visAgregarCultivo = false;
    sessionStorage.setItem("visAgregarCultivo",JSON.stringify(visAgregarCultivo));
    pieTablaCultivos.style.display="none";
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
        localStorage.setItem("misHuertas",JSON.stringify(misHuertas));
        Swal.fire({
            showConfirmButton: false,
            title: 'Guardado',
            text: 'Los cambios fueron guardados',
            icon: 'success'}
          );
        setTimeout(function() {
            window.location.assign("mishuertas.html");
        },1500)
        
    } else if (!nombreHuerta && areaHuerta) {
        Swal.fire('','Introduzca un nombre para la huerta','warning')
    } else if (nombreHuerta && !areaHuerta) {
        Swal.fire('','Introduzca el área de la huerta','warning')
    } else {
        Swal.fire('','Introduzca un nombre y una área para la huerta','warning')
    }
}

function cancelarCrear() {
    if (!(document.getElementById("nombreHuerta").value == miHuerta[1] && document.getElementById("areaHuerta").value == miHuerta[2] && JSON.stringify(miHuerta[4]) == JSON.stringify(JSON.parse(localStorage.getItem("misHuertas"))[huertaActual][4]))) {
        swal.fire({
            title: '¿Desea guardar los cambios?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No guardar`,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                guardarSalir();
            } else if (result.isDenied) {
                Swal.fire({
                    showConfirmButton: false,
                    title: 'No guardado',
                    text: 'Los cambios no fueron guardados',
                    icon: 'warning'}
                  )
                  setTimeout(function(){salirSinGuardar()}, 1500);
            }
          })
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
    let dropDownModificarCultivos = document.getElementById("dropDownModificarCultivos");
    let opcionesDropDown = "";
    for (let key of Object.keys(listaCultivos)) {
        opcionesDropDown += `<option name="cultivos" value="${key}" ${key == cultivoElegido ? "selected" :""}>${listaCultivos[key]["nombre"]}</option>`;
    }
    dropDownModificarCultivos.innerHTML = `${opcionesDropDown}`;
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
    let dropDownModificarCultivos = document.getElementById("dropDownModificarCultivos");
    id = dropDownModificarCultivos.options[dropDownModificarCultivos.selectedIndex].value;
    let cantidad = document.getElementById("cantidadCultivoModificar").value;
    let fechaSiembra = document.getElementById("fechaSiembraModificar").value;
    miHuerta[4][cultivoElegido][0] = id;
    miHuerta[4][cultivoElegido][1] = cantidad;
    miHuerta[4][cultivoElegido][2] = fechaSiembra;
    misHuertas[huertaActual] = miHuerta;
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
        document.getElementById("nombreHuerta").value = miHuerta[1];
        document.getElementById("areaHuerta").value = miHuerta[2];
    }
    if (miHuerta[4][0]) {
        let tablaCultivos = document.getElementById("tablaCultivos");
        let listaTablaCultivos = "";
        for (let i = 0; i < miHuerta[4].length; i++) {
            let posicion = miHuerta[4][i];
            listaTablaCultivos += `<tr><td>${i + 1}</td><td>${listaCultivos[posicion[0]]["nombre"]}</td><td>${posicion[1]}</td><td>${posicion[2] ? DateTime.fromISO((posicion[2])).toLocaleString() : "ND"}</td><td><button class="botonesModificarCultivo"><img class="iconoEditar" src="../icons/editar.png" alt="Editar"></button></td><td><input type="checkbox" class="checksEliminarCultivo"></td></tr>`
        }
        tablaCultivos.innerHTML = listaTablaCultivos
        botonesModificarCultivo = document.getElementsByClassName("botonesModificarCultivo");
        checksEliminarCultivo = document.getElementsByClassName("checksEliminarCultivo");
        for (let i = 0; i < botonesModificarCultivo.length; i++) {
            botonesModificarCultivo[i].onclick = function() {
                modificarCultivo(i);
            }
        }
    } else {
        tablaCultivos.innerHTML = "";
    }
}

btnEliminarCultivo.onclick = function() {
    let noEliminar = [];
    for (let i = 0; i < checksEliminarCultivo.length; i++) {
        if (!checksEliminarCultivo[i].checked) {
            noEliminar.push(i);
        }
    }
    if (noEliminar.length == miHuerta[4].length) {
        Swal.fire(
            'Mmm...',
            'No hay cultivos seleccionados',
            'error'
          )
    } else {
        swal.fire({
            title: '¿Está seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Borrado',
                'La selección ha sido eliminada',
                'success'
              )
              eliminarCultivos(noEliminar);
            }
          })
    }
}
function eliminarCultivos(noEliminar){
    let nuevosCultivos = [];
    for (let i = 0; i < miHuerta[4].length; i++) {
        if (noEliminar.includes(i)) {
            nuevosCultivos.push(miHuerta[4][i]);
        }
    }
    miHuerta[4] = nuevosCultivos;
    recargar(true);
}