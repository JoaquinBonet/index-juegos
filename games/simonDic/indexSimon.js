const $empezar = document.querySelector("#empezar");
const reset = document.querySelector("#reset");
const titulo = document.querySelector("#simon");
const tablero = document.querySelector("#tablero");
const nroRonda = document.querySelector("#ronda");
const victoria = document.querySelector("#victoria");
const tiempo = document.querySelector("#tiempo");
let intervalo;


$empezar.onclick = function () {
    tablero.className = "container";
    turnoMaquina();
    intervalo = setInterval(contarTiempo, 1000);
    $empezar.className = "oculto";


};

let secuenciaCuadrosMaquina = [];
let secuenciaCuadrosJugador = [];
let ronda = 0;
let segundos = 0;

const turnoMaquina = () => {
    titulo.innerText = "Atención!";
    manejarTurnoMaquina();


};

const manejarTurnoMaquina = () => {
    let $cuadroElegido = elegirCuadroRandom();
    secuenciaCuadrosMaquina.push($cuadroElegido);
    secuenciaCuadrosMaquina.forEach(function (cuadro, i) {
        setTimeout(function () {
            resaltarCuadro(cuadro);

        }, (i + 1) * 1000);
    });

    setTimeout(function () { habilitarTurnoJugador() }, ((secuenciaCuadrosMaquina.length + 1) * 1000));

    ronda++;
    actualizarRonda();
    secuenciaCuadrosJugador = [];


}

const resaltarCuadro = (cuadro) => {
    cuadro.style.opacity = 1;
    setTimeout(function () { cuadro.style.opacity = 0.5 }, 500);

}

const habilitarTurnoJugador = () => {
    titulo.innerText = "Tu turno!";
    document.querySelectorAll(".cuadro").forEach(function (cuadro) {
        cuadro.onclick = manejarTurnoJugador;

    });

}

const manejarTurnoJugador = (e) => {
    const cuadro = e.target;
    resaltarCuadro(cuadro);
    secuenciaCuadrosJugador.push(cuadro);
    const $cuadroMaquina = secuenciaCuadrosMaquina[secuenciaCuadrosJugador.length - 1];
    if (cuadro.id !== $cuadroMaquina.id) {
        perder();
    }

    if (secuenciaCuadrosJugador.length === secuenciaCuadrosMaquina.length) {
        setTimeout(turnoMaquina(), 1000);
    }
}

const elegirCuadroRandom = () => {
    const $cuadros = document.querySelectorAll(".cuadro");
    let numeroRandom = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[numeroRandom];
}


const actualizarRonda = () => {
    nroRonda.innerText = "Ronda # " + ronda;
    if (ronda === 8) {
        ganar();
    }
}

const perder = () => {
    document.querySelector("#perder").play();
    tablero.className = "oculto";
    document.querySelector("#derrota").className = "";
    titulo.className = "oculto";
    nroRonda.className = "oculto";
    tiempo.className = "oculto";


}

const ganar = () => {
    victoria.innerText = `Ganaste, crack! Tiempo total: ${tiempo.innerHTML}.`;
    document.querySelector("#ganar").play();
    frenarTiempo();
    tablero.className = "oculto";
    victoria.className = "";
    tiempo.className = "oculto";
    titulo.className = "oculto";
    nroRonda.className = "oculto";


}

const contarTiempo = () => {
    segundos += 1;
    horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    minutos = Math.floor(segundos / 60);
    totalSegundos = (segundos % 60);

    tiempo.innerText = "Tiempo: " + (horas < 10 ? "0" + horas : horas) + ":"
        + (minutos < 10 ? "0" + minutos : minutos) + ":"
        + (totalSegundos < 10 ? "0" + totalSegundos : totalSegundos);


}
const frenarTiempo = () => {
    clearInterval(intervalo)
}


reset.onclick = function () {
    location.reload();
}


