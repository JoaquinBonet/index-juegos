const botonEmpezar = document.querySelector("#empezar");
const intento = document.querySelector("#intento");
const botonReset = document.querySelector("#reset");
const $tiempo = document.getElementById("tiempo");
//const dropdown = document.querySelector(".navbar-toggler");
const tablero = document.querySelector("#tablero");

botonEmpezar.onclick = function () {
    mostrarTarjetas();
    asginarImagenesATarjetas();
    setInterval(iniciarTiempo, 1000);
}

let segundos = 0;
let secuenciaClicks = [];


const mostrarTarjetas = () => {
    tablero.className = "container"
}

const ocultarTarjetas = () => {
    tablero.className = "oculto"
}

const asginarImagenesATarjetas = () => {

    const misImgs = new Array("imgs/aguila.jpg", "imgs/cocodrilo.jpg", "imgs/elefante.jpg", "imgs/hipo.jpg", "imgs/leon.jpg");
    const imgsRepetidas = misImgs.concat(misImgs);
    let imgsRandom = imgsRepetidas.sort(function () { return 0.5 - Math.random(); });

    for (i = 1; i <= (imgsRandom.length); i++) {
        document.getElementById(`imagen${i}`).src = imgsRandom[i - 1];
    };

}


const iniciarTiempo = () => {
    segundos += 1;
    $tiempo.innerText = segundos + " segundos";


}



const sumarIntento = () => {
    return intento.innerText = Number(intento.innerText) + 1

}



const flip = (event) => {


    var element = event.currentTarget
    if (element.className === "flip-card-inner") {
        if (element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
        }
        else {
            element.style.transform = "rotateY(180deg)";
        }
    }
    secuenciaClicks.push(element);

    if (secuenciaClicks.length === 2) {
        encontrarMatch();
    }
}


const encontrarMatch = () => {

    const $primeraCarta = secuenciaClicks[0];
    const $segundaCarta = secuenciaClicks[1];
    const imagenDeAnimal1 = $primeraCarta.getElementsByClassName("reverso")[0].src;
    const imagenDeAnimal2 = $segundaCarta.getElementsByClassName("reverso")[0].src;

    if (imagenDeAnimal1 === imagenDeAnimal2 && $primeraCarta !== $segundaCarta) {

        setTimeout(function () {
            $primeraCarta.className = "oculto"
            $segundaCarta.className = "oculto", ganar();
        }, 500);
        secuenciaClicks.pop();
        secuenciaClicks.pop();

    }
    else if (imagenDeAnimal1 !== imagenDeAnimal2) {

        setTimeout(function () {
            $primeraCarta.style.transform = "rotateY(0deg)"
            $segundaCarta.style.transform = "rotateY(0deg)"
        }, 500);
        secuenciaClicks.pop();
        secuenciaClicks.pop();

    }
    else if (imagenDeAnimal1 === imagenDeAnimal2 && $primeraCarta === $segundaCarta) {
        secuenciaClicks.pop();
        secuenciaClicks.pop();
    }
    sumarIntento();

};




const ganar = () => {
    if (document.querySelectorAll(".oculto").length === document.querySelectorAll(".flip-card").length) {
        document.querySelector("#victoria").innerText = `Ganaste, felicitaciones! Te llevó ${intento.innerText} intentos.`;

    }

}


botonReset.onclick = function () {

    location.reload();
}


