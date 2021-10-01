const $frase = document.querySelector("#pregunta");
const botonEmpezar = document.querySelector("#empezar");
const rowImgs = document.querySelector("#row_imgs")
const $imgs = document.querySelectorAll("img");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
let error = document.querySelector("#error");
const reset = document.querySelector("#reset");


let frases = ['Cada día sabemos más y entendemos menos', 'El mundo es bello, pero tiene un defecto llamado hombre', 'Pienso, luego existo', 'La verdadera sabiduría está en reconocer la propia ignorancia', 'Estos son mis principios y si no te gustan, tengo otros', 'Uno llega a ser grande por lo que lee y no por lo que escribe', 'Uno es dueño de lo que calla y esclavo de lo que habla', 'Si quieres cambiar al mundo, cámbiate a ti mismo', 'Si se la siguen dando a los de amarillo vamos a perder', 'Yo nací para mirar lo que pocos pueden ver']
const imgs = ['./imgs/einstein.jpg', './imgs/nische.jpg', './imgs/descartes.jpg', './imgs/socrates.jpg', './imgs/groucho.jpg', './imgs/borges.jpg', './imgs/freud.jpg', './imgs/ghandi.jpg', './imgs/bilardo.jpg', './imgs/charly.jpg']
let imgsRestantesPorAcertar = [...imgs];
let currentFrase;
let imgDeFrase;
let imgsAelegir = [];
let nroRandom;

botonEmpezar.onclick = () => {
    rowImgs.className = "row";
    mostrarPregunta();
    mostrarImagenes();
    botonEmpezar.className = "oculto";

    $imgs.forEach((img) => {
        img.onclick = manejarClick;
    })


}

const mostrarPregunta = () => {


    if (frases.length === 0) {
        ganar();
    } else {
        currentFrase = "";
        nroRandom = Math.floor(frases.length * Math.random())
        $frase.innerHTML = frases[nroRandom];
        currentFrase = frases[nroRandom];
        imgDeFrase = imgsRestantesPorAcertar[nroRandom];

    }


}

const mostrarImagenes = () => {
    mezclarImgsAelegir();
    img1.setAttribute("src", imgsAelegir[0]);
    img2.setAttribute("src", imgsAelegir[1]);
    img3.setAttribute("src", imgsAelegir[2]);

}

const mezclarImgsAelegir = () => {
    let aux = [...imgsRestantesPorAcertar];
    imgsAelegir = [];

    for (i = 0; i < imgs.length; i++) {
        if (aux[i] === imgDeFrase) {

            aux.splice(i, 1);
        }
    }
    mezclar(aux);
    imgsAelegir.push(aux[0]);
    imgsAelegir.push(aux[1]);
    imgsAelegir.push(imgDeFrase);
    mezclar(imgsAelegir);

}

const mezclar = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const manejarClick = (event) => {

    let clickeado = event.target;
    if (!clickeado.src.includes(imgDeFrase.substring(1))) {
        error.innerText = parseInt(error.innerText) + 1;
        if (error.innerText == 3) {
            perder();
        } else {
            mostrarPregunta();
            mostrarImagenes();
        }

    } else {
        if (frases.length == 0) {
            ganar()
        } else {
            frases.splice(nroRandom, 1);
            imgsRestantesPorAcertar.splice(nroRandom, 1);
            mostrarPregunta();
            mostrarImagenes();
        }
    }
}

const ganar = () => {
    rowImgs.className = "oculto";
    $frase.innerText = "Felicitaciones, ganaste!"
}

const perder = () => {
    rowImgs.className = "oculto";
    $frase.innerText = "Perdiste, seguí participando!"
}



reset.onclick = () => {
    location.reload();
}
