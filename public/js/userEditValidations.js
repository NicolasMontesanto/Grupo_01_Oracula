let formulario = document.querySelector(".formulario");

let inputNombre = document.querySelector("#nombre");
let iconValidNombre = document.querySelector("#iconValidNombre");
let iconInvalidNombre = document.querySelector("#iconInvalidNombre");
let errorNombre = document.querySelector("#errorNombre");

let inputApellido = document.querySelector("#apellido");
let iconValidApellido = document.querySelector("#iconValidApellido");
let iconInvalidApellido = document.querySelector("#iconInvalidApellido");
let errorApellido = document.querySelector("#errorApellido");

let inputEmail = document.querySelector("#email");
let iconValidEmail = document.querySelector("#iconValidEmail");
let iconInvalidEmail = document.querySelector("#iconInvalidEmail");
let errorEmail = document.querySelector("#errorEmail");

let inputTel = document.querySelector("#telefono");
let iconValidTel = document.querySelector("#iconValidTel");
let iconInvalidTel = document.querySelector("#iconInvalidTel");
let errorTel = document.querySelector("#errorTel");

let inputImagen = document.querySelector("#profilePicture");
let validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
let errorImagen = document.querySelector("#errorProfilePicture");

let inputPassword = document.querySelector("#password");
let iconValidPassword= document.querySelector("#iconValidPass");
let iconInvalidPassword = document.querySelector("#iconInvalidPass");
let errorPassword = document.querySelector("#errorPassword");

let inputPasswordRepetir = document.querySelector("#password-repetir");
let iconValidPasswordRepetir= document.querySelector("#iconValidPassR");
let iconInvalidPasswordRepetir = document.querySelector("#iconInvalidPassR");
let errorPasswordRepetir = document.querySelector("#errorPasswordR");

let errors = 0;

//Funcion de campos obligatorios min 2 caracteres.
function validateLenght (input, numberOfChar, iconValid, iconInvalid, error, errorMessage){
    if (input.value.length < numberOfChar) {
        if (input.classList.contains("input--valid")) {
            input.classList.remove("input--valid");
            (iconValid != "") ? iconValid.classList.add("hidden") : null;
        }
        if (input.classList.contains("input--invalid") == false) {
            input.classList.add("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
            (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        }
        return 1;
    }

      if (input.value.length >= numberOfChar) {
        if (input.classList.contains("input--invalid")) {
            input.classList.remove("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
        }
        if (input.classList.contains("input--valid") == false) {
            input.classList.add("input--valid");
            (iconValid != "") ? iconValid.classList.remove("hidden") : null;
            (error != "") ? error.innerText = "" : null;
        }
        return 0;
    }
}

//Funcion que valida el archivo de imagen.
function validateExtensions(input, extensions, error, errorMessage) {
    let includes = false;
    if (inputImagen.value !=''){
        extensions.forEach(extension => {
            //Si el archivo tiene una extensión aceptada, pasa la validación y se quita el mensaje de error.
            if (input.value.includes(extension)) {
                input.classList.remove("input--invalid");
                (input.classList.contains("input--valid")) ? null : input.classList.add("input--valid");
                (error != "") ? error.innerText = "" : null;
                includes = true;
            }
            else {
                //Si no tiene una extensión aceptada, no pasa la validación y se agrega el mensaje de error.
                input.classList.remove("input--valid");
                input.classList.add("input--invalid");
                (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
                return 1;
            }
        })
        if (includes) {
            input.classList.remove("input--invalid");
            (input.classList.contains("input--valid")) ? null : input.classList.add("input--valid");
            (error != "") ? error.innerText = "" : null;
            return 0;
        } else {
            return 1;
        }
    } else {
        //Si no tiene una extensión aceptada, no pasa la validación y se agrega el mensaje de error.
        input.classList.add("input--valid");
        input.classList.remove("input--invalid");
        (error != "") ? error.innerText = "" : null;
        return 0;
    }
}

//Funcion que requiere que mail sea válido.
function isEmailValid (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//valida el formato del email
function validateEmail (input, iconValid, iconInvalid, error, errorMessage){
    if(!isEmailValid(inputEmail.value)){
        //si email no es valido
        if (input.classList.contains("input--valid")) {
            input.classList.remove("input--valid");
            (iconValid != "") ? iconValid.classList.add("hidden") : null;
        }
        if (input.classList.contains("input--invalid") == false) {
            input.classList.add("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
            (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        }
        return 1;
    }
    if(isEmailValid(inputEmail.value)){
        if (input.classList.contains("input--invalid")) {
            input.classList.remove("input--invalid");
            (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
        }
        if (input.classList.contains("input--valid") == false) {
            input.classList.add("input--valid");
            (iconValid != "") ? iconValid.classList.remove("hidden") : null;
            (error != "") ? error.innerText = "" : null;
        }
        return 0;
    }
}
// Valida formato de numero de telefono
function validateTel (input, iconValid, iconInvalid, error, errorMessage) {
    let tel =  /^\(?([+0-9]{3})\)?[-. ]?([0-9]{2,3})[-. ]?([0-9]{6,8})$/;
    if(inputTel.value != ""){
        if(inputTel.value.match(tel)){
            if (input.classList.contains("input--invalid")) {
                input.classList.remove("input--invalid");
                (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
            }
            if (input.classList.contains("input--valid") == false) {
                input.classList.add("input--valid");
                (iconValid != "") ? iconValid.classList.remove("hidden") : null;
                (error != "") ? error.innerText = "" : null;
            }
            return 0;
        }else{
            if (input.classList.contains("input--valid")) {
                input.classList.remove("input--valid");
                (iconValid != "") ? iconValid.classList.add("hidden") : null;
            }
            if (input.classList.contains("input--invalid") == false) {
                input.classList.add("input--invalid");
                (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
                (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
            }
            return 1;
        }
    }else{
        return 0;
    }
}

//Funcion que requiere que la contraseña tenga al menos una minuscula, una mayúscula, un número, un caracter especial y contener al menos 8 caracteres.
let isPasswordSecure = (password) => {
    let re = new RegExp("(?=.{8,})");
    return re.test(password);
};
function validatePass (input, iconValid, iconInvalid, error, errorMessage) {
    if(input.value != ""){
        if(!isPasswordSecure(input.value)){
            //si pass no es segura
            if (input.classList.contains("input--valid")) {
                input.classList.remove("input--valid");
                (iconValid != "") ? iconValid.classList.add("hidden") : null;
            }
            if (input.classList.contains("input--invalid") == false) {
                input.classList.add("input--invalid");
                (iconInvalid != "") ? iconInvalid.classList.remove("hidden") : null;
                (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
            }
            return 1;
        }
        //si pass es segura
        if(isPasswordSecure(input.value)){
            if (input.classList.contains("input--invalid")) {
                input.classList.remove("input--invalid");
                (iconInvalid != "") ? iconInvalid.classList.add("hidden") : null;
            }
            if (input.classList.contains("input--valid") == false) {
                input.classList.add("input--valid");
                (iconValid != "") ? iconValid.classList.remove("hidden") : null;
                (error != "") ? error.innerText = "" : null;
            }
            return 0;
        }
    }else{
        return 0;
    }
}

//se validan los campos cuando son modificados

inputNombre.addEventListener("input", function(e){
    validateLenght(inputNombre, 2, iconValidNombre, iconInvalidNombre, errorNombre, 'El nombre debe contener al menos dos caracteres')
})
inputApellido.addEventListener("input", function(e){
    validateLenght(inputApellido, 2, iconValidApellido, iconInvalidApellido, errorApellido, 'El apellido debe contener al menos dos caracteres')
})
inputEmail.addEventListener("input", function(e){
    validateEmail(inputEmail, iconValidEmail, iconInvalidEmail, errorEmail, 'El email no es válido')
})
inputTel.addEventListener("input", function(e){
    validateTel (inputTel, iconValidTel, iconInvalidTel, errorTel, 'El numero de teléfono no es válido')
})
inputImagen.addEventListener("input", function (e) {
    validateExtensions(inputImagen, validExtensions, errorImagen, "Extensiones aceptadas: '.jpg', '.jpeg', '.png' o '.gif'.")
})
inputPassword.addEventListener('input', function(e){
    validatePass(inputPassword, iconValidPassword, iconInvalidPassword, errorPassword, 'Su contraseña debe contener al menos 8 caracteres.')
})
inputPasswordRepetir.addEventListener('input', function(e){
    validatePass(inputPasswordRepetir, iconValidPasswordRepetir, iconInvalidPasswordRepetir, errorPasswordRepetir, 'Sus contraseñas no coinciden')
})


 //Se realizan las validaciones antes de mandar el formulario y se suman los errores. Si no hay errores se submite.
formulario.addEventListener('submit', function (e) {
    
    errors += validateLenght(inputNombre, 2, iconValidNombre, iconInvalidNombre, errorNombre, 'El nombre debe contener al menos dos caracteres')
    errors += validateLenght(inputApellido, 2, iconValidApellido, iconInvalidApellido, errorApellido, 'El apellido debe contener al menos dos caracteres')
    errors += validateEmail(inputEmail, iconValidEmail, iconInvalidEmail, errorEmail, 'El email no es válido')
    errors += validateExtensions(inputImagen, validExtensions, errorImagen, "Extensiones aceptadas: '.jpg', '.jpeg', '.png' o '.gif'.")
    errors += validateTel (inputTel, iconValidTel, iconInvalidTel, errorTel, 'El numero de teléfono no es válido')
    errors += validatePass(inputPassword, iconValidPassword, iconInvalidPassword, errorPassword, 'Su contraseña debe contener al menos 8 caracteres, una minuscula, una mayúscula, un número y un caracter especial.')
    errors += validatePass(inputPasswordRepetir, iconValidPasswordRepetir, iconInvalidPasswordRepetir, errorPasswordRepetir, 'Sus contraseñas no coinciden')

    // impide que el form se submita si tiene errores
    errors > 0 ? e.preventDefault() : null;
    errors = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
});





