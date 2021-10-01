const nombre = document.querySelector("#nombre");
const mail = document.querySelector("#mail");
const pass = document.querySelector("#contrasena");
const pass2 = document.querySelector("#contrasena2");
const boton = document.querySelector("#confirmar");
const resultados = document.querySelector(".resultados");
const span  = document.querySelector("span");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    let error = validarForm();
    span.style.display == " ";
    if (error[0]){
        resultados.innerHTML = error[1];
        resultados.classList.add("red");
        

    } else{
        resultados.innerText = "Solicitud enviada correctamente";
        resultados.classList.add("green");
        resultados.classList.remove("red");
        
    }
})

const validarForm = () => {
    let error = [];
    if (nombre.value.length == 0){
        error[0] = true;
        error[1] = "El nombre debe tener al menos 1 caracter.";
        return error;
    } else if(nombre.value.length > 40){
        error[0] = true;
        error[1] = "El nombre debe tener menos de 40 caracteres.";
        return error;
    }

    if (mail.value.length < 6 || 
        mail.value.length > 40 ||
        mail.value.indexOf(".") == -1 ||
        mail.value.indexOf("@") == -1){
        error[0] = true;
        error[1] = "El email es inválido";
        return error;
    }

    if (!pass.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
        error[0] = true;
        error[1] = "La contraseña debe incluir al menos un número y mínimo ocho carácteres";
        return error;
    }

    if (pass2.value !== pass.value){
        error[0] = true;
        error[1] = "Las contraseñas no coinciden";
        return error;
    }

    error[0] = false;
    return error;
};
