class cultivo {
    constructor(nombre, distanciaLineas, distanciaPlantas, tiempoCosechar, riego, siembra, tsiembra,color) {
        this.nombre = nombre;
        this.distanciaLineas = distanciaLineas;
        this.distanciaPlantas = distanciaPlantas;
        this.tiempoCosechar = tiempoCosechar;
        this.riego = riego;
        this.siembra = siembra;
        this.tsiembra = tsiembra;
        this.div = color;
    }
}
//tsiembra {1:almácigo, 2:directa, 3: almácigo / directa}
const lista = [
    ["Acelga",60,20,[2,3],"moderado",[0],3,"green"],
    ["Apio", 40,15,[4,4],"abundante",[0],1,"lightgreen"],
    ["Espinaca", 40,8,[2,3],"moderado",[0],2,"darkgreen"],
    ["Lechuga",60,25,[3,4],"moderado",[0],3,"green"],
    ["Sandía",180,100,[2,4],"abundante",[9,2],3,"darkgreen"],
    ["Tomate",120,40,[3,4],"moderado",[8,9],1,"red"],
    ["Pepino",180,75,[3,4],"moderado",[9,12],3,"green"],
    ["Puerro",40,8,[4,5],"moderado",[9,5],1,"darkgreen"],
    ["Berenjena",60,50,[3],"abundante",[8,12],1,"violet"]
]

let cultivitos = [];
for (item of lista) {
    cultivitos.push(new cultivo(item))
}

cultivitos = cultivitos.sort((a, b) => a["nombre"] < b["nombre"] ? - 1 : 1);
let cultivos = {};
for (let i = 0; i < cultivitos.length; i++) {
    cultivos[i + 1] = cultivitos[i];
}

document.getElementById("json").innerHTML = JSON.stringify(cultivos);