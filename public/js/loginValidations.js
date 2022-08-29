//El formulario
let formulario = document.querySelector(".formulario");

//Elementos para el input Email
let inputEmail = document.querySelector("#email");
let iconValidEmail = document.querySelector("#iconValidEmail");
let iconInvalidEmail = document.querySelector("#iconInvalidEmail");
let errorEmail = document.querySelector("#errorEmail");

//Elementos para el inpout Password
let inputPassword = document.querySelector("#password");
let iconInvalidPassword = document.querySelector("#iconInvalidPassword");
let errorPassword = document.querySelector("#errorPassword");

//Flag que cuenta la cantidad de errores que tiene el formulario.
let numberOfErrors = 0;

console.log("Dentro de las validaciones");

//Función que valida que un input tenga la cantidad de caracteres especificada.
//Al input le agrega las clases "input--valid" o "input--invalid" según corresponda.
//A los íconos los muestra y oculta según corresponda.
//Y al error se le da o quita el mensaje de error.
//Recibe el input que se quiere validar, la cantidad de caracteres, el ícono de no válido, el elemento donde se va a mostrar el error, y el mensaje de error a mostrar.
//Devuelve 1 si hay errores o 0 si no. Esto se usa para contar la cantidad de errores que quedan en el formulario.
function validateNumberOfChar(input, numberOfChar, iconInvalid, error, errorMessage) {
    //Si no cumple con la validación:
    if (input.value.length < numberOfChar) {
        //Se quita todo lo que indique que sea válido
        if (input.classList.contains("input--valid")) {
            input.classList.remove("input--valid");
        }

        //Se agrega lo que indica que no es válido
        if (input.classList.contains("input--invalid") == false) {
            input.classList.add("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
            (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        }
        return 1;
    }

    //Si cumple con la validación:
    if (input.value.length >= numberOfChar) {
        //Se quita todo lo que indique que no sea válido
        if (input.classList.contains("input--invalid")) {
            input.classList.remove("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
        }

        //Se agrega lo que indica que es válido
        if (input.classList.contains("input--valid") == false) {
            input.classList.add("input--valid");
            (error != "") ? error.innerText = "" : null;
        }
        return 0;
    }
}

//funcion que utiliza expresion regular para validar el email 
function esEmailValido(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email)
}

//Función que valida que un email sea válido.
//Al input le agrega las clases "input--valid" o "input--invalid" según corresponda.
//A los íconos los muestra y oculta según corresponda.
//Y al error se le da o quita el mensaje de error.
//Recibe el input que se quiere validar, los íconos de válido y no válido, el elemento donde se va a mostrar el error, y el mensaje de error a mostrar.
//Devuelve 1 si hay errores o 0 si no. Esto se usa para contar la cantidad de errores que quedan en el formulario.
function validateEmail(input, iconValid, iconInvalid, error, errorMessage) {
    //Si no cumple con la validación:
    if (esEmailValido(input.value) == false) {
        //Se quita todo lo que indique que sea válido
        if (input.classList.contains("input--valid")) {
            input.classList.remove("input--valid");
            (iconValid != "") ? iconValid.classList.add("hidden") : null;
        }

        //Se agrega lo que indica que no es válido
        if (input.classList.contains("input--invalid") == false) {
            input.classList.add("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
            (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        }
        return 1;
    }

    //Si cumple con la validación:
    if (esEmailValido(input.value)) {
        //Se quita todo lo que indique que no sea válido
        if (input.classList.contains("input--invalid")) {
            input.classList.remove("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
        }

        //Se agrega lo que indica que es válido
        if (input.classList.contains("input--valid") == false) {
            input.classList.add("input--valid");
            (iconValid != "") ? iconValid.classList.remove("hidden") : null;
            (error != "") ? error.innerText = "" : null;
        }
        return 0;
    }
}

inputEmail.addEventListener('change', function(){
    validateEmail(inputEmail, iconValidEmail, iconInvalidEmail, errorEmail, "Ingresá un email válido.");
})

inputPassword.addEventListener('input', function(){
    inputPassword.classList.remove("input--invalid");
    (iconInvalidPassword != "") ? iconInvalidPassword.classList.add("hidden") : null;
    (errorPassword != "") ? errorPassword.innerText = "" : null;
})


formulario.addEventListener("submit", function (event) {

    //Se realizan las validaciones antes de mandar el formulario y se agrega su resultado a numberOfErrors.
    numberOfErrors += validateEmail(inputEmail, iconValidEmail, iconInvalidEmail, errorEmail, "Ingresá un email válido.");
    numberOfErrors += validateNumberOfChar(inputPassword, 1, iconInvalidPassword, errorPassword, "Ingresá tu contraseña");

    //Si hay errores se previene la acción predeterminada y se resetea numberOfErrors
    numberOfErrors > 0 ? event.preventDefault() : null;
    numberOfErrors = 0;

    //Se hace un scroll al principio de la página
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})