const listaCultivos = JSON.parse(localStorage.getItem("cultivos"));

let contenidoTabla = "";
let tablaInfo = document.getElementById("tablaInfo");
const meses = ["Todo el año", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const tipoSiembra = [null,"Almácigo","Directa","Alm/Dir"];
for (let key of Object.keys(listaCultivos)) {
    let riego;
    switch(listaCultivos[key]["riego"]) {
        case "abundante": riego = 4;
        break;
        case "moderado": riego = 2;
        break;
        default: riego = 1;
    }
    let imgRiego = "";
    for (let i = 0; i < riego; i++) {
        imgRiego += `<img class="imgDrop" src="../img/drop.png">`
    }
    tablaInfo.innerHTML += `<tr>
    <td>${listaCultivos[key]["nombre"]}</td>
    <td>${listaCultivos[key]["siembra"][0] == 0 ? meses[listaCultivos[key]["siembra"][0]] : 
    meses[listaCultivos[key]["siembra"][0]] + " - " + meses[listaCultivos[key]["siembra"][1]]} </td>
    <td>${listaCultivos[key]["distanciaLineas"]}</td>
    <td>${listaCultivos[key]["distanciaPlantas"]}</td>
    <td>${tipoSiembra[listaCultivos[key]["tsiembra"]]}</td>
    <td>${imgRiego}</td>
    <td>${listaCultivos[key]["tiempoCosechar"].length == 1 ? listaCultivos[key]["tiempoCosechar"][0] : 
    listaCultivos[key]["tiempoCosechar"][0] + " - " + listaCultivos[key]["tiempoCosechar"][1]}
    </tr>`;
}

document.getElementById("infoVolver").onclick = () => {
    location.assign("../index.html");
}