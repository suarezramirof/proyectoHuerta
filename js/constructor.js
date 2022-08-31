class cultivo {
    constructor(nombre, distanciaLineas, distanciaPlantas, tiempoCosechar, riego, siembra, color) {
        this.nombre = nombre;
        this.distanciaLineas = distanciaLineas;
        this.distanciaPlantas = distanciaPlantas;
        this.tiempoCosechar = tiempoCosechar;
        this.riego = riego;
        this.siembra = siembra;
        this.div = color;
    }
}
let cultivitos = [
    new cultivo("Acelga",60,20,[2,3],"moderado",[13],"green"),
    new cultivo("Apio", 40,15,[4,4],"abundante",[13],"lightgreen"),
    new cultivo("Espinaca", 40,8,[2,3],"moderado",[13],"darkgreen"),
    new cultivo("Lechuga",60,25,[3,4],"moderado",[13],"green"),
    new cultivo("Sandía",180,100,[2,4],"abundante",[9,10,11,12,1,2],"darkgreen"),
    new cultivo("Tomate",120,40,[3,4],"moderado",[8,9],"red"),
    new cultivo("Pepino",180,75,[3,4],"moderado",[9,10,11,12],"green"),
    new cultivo("Puerro",40,8,[4,5],"moderado",[9,10,11,12,1,2,3,4,5],"darkgreen")
];
cultivitos = cultivitos.sort((a, b) => a["nombre"] < b["nombre"] ? - 1 : 1);
let cultivos = {};
for (let i = 0; i < cultivitos.length; i++) {
    cultivos[i + 1] = cultivitos[i];
}