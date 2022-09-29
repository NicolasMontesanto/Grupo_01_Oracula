let inputNombre = document.getElementById("nombre");
let iconValidNombre = document.querySelector("#iconValidNombre");
let iconInvalidNombre = document.querySelector("#iconInvalidNombre");
let errorNombre = document.querySelector("#errorNombre");

let inputApellido = document.getElementById("apellido");
let inputEmail = document.getElementById("email");
let inputImagen = document.getElementById("profilePicture");
let inputPassword = document.getElementById("password");
let inputPasswordRepetir = document.getElementById("passwordRepetir");
let formulario = document.querySelector(".formulario");

let extensionesAceptadas = [".jpg", ".jpeg", ".png", ".gif"];

/*cuando tenemos errores en los campos mientras se rellena el formulario, el mensaje es tranqui en
el color negro, si hacemos submit con errores los mensajes se ponen rojos y/o aparecen alertas*/

let camposObligatorios = [inputNombre, inputImagen, inputApellido, inputEmail, inputPassword, inputPasswordRepetir]
formulario.addEventListener("submit", function (e) {
    let errores = 0;
    camposObligatorios.forEach(input => {
        //campos no vacios al enviar el formulario
        if (input.value.length == 0) {
            input.classList.add("input--invalid");
            errores++;
            input.nextElementSibling.innerHTML = "Por favor, completá este campo.";
            if (!(input.dataset.nombre == "imagen")) {
                input.nextElementSibling.nextElementSibling.classList.add('hidden');
                input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else if ((input.dataset.nombre == "nombre" || input.dataset.nombre == "apellido") && (input.value.length < 2)) {
            input.classList.add("input--invalid");
            errores++;
            input.nextElementSibling.innerHTML = "Este campo debe contener al menos 2 caracteres.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else if ((input.dataset.nombre == "password" && (input.value.length < 8))) {
            input.classList.add("input--invalid");
            errores++;
            input.nextElementSibling.innerHTML = "Este campo debe contener al menos 8 caracteres.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else if ((input.dataset.nombre == "passwordRepetir" && (input.value != inputPassword.value))) {
            input.classList.add("input--invalid");
            errores++;
            input.nextElementSibling.innerHTML = "Las contraseñas no coinciden.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else if (input.dataset.nombre == "imagen") {
            let extension = input.value.split(".").pop().toLowerCase();
            if (extension != "jpg" && extension != "png" && extension != "jpeg" && extension != "gif") {
                input.classList.add("input--invalid");
                errores++;
                input.nextElementSibling.innerHTML = "Formato de imagen no válido, las extensiones aceptadas son: '.jpg', '.jpeg', '.png' o '.gif'.";
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                return;
            }
        } else if (!(input.dataset.nombre == "imagen")) {
            input.classList.remove("input--invalid");
            input.classList.add("input--valid");
            input.nextElementSibling.innerHTML = "";
            input.nextElementSibling.nextElementSibling.classList.remove('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('hidden');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else {
            input.classList.remove("input--invalid");
            input.classList.add("input--valid");
            input.nextElementSibling.innerHTML = "";
        }
    });

    //valida el formato del email
    if (!esEmailValido(inputEmail.value)) {
        inputEmail.classList.add("invalid");
        errores++;
        inputEmail.nextElementSibling.classList.add("text-danger");
        inputEmail.nextElementSibling.innerHTML = "El formato del email ingresado no es válido.";
    }
    if (errores > 0) {
        e.preventDefault();
    }
})

camposObligatorios.forEach(function (input) {
    input.addEventListener("blur", () => {
        //campos no vacios al salir del input 
        if (input.value == "" && !(input.dataset.nombre == "imagen")) {
            input.classList.add("input--invalid");
            input.nextElementSibling.innerHTML = "Por favor, completá este campo.";
            if (!(input.dataset.nombre == "imagen")) {
                input.nextElementSibling.nextElementSibling.classList.add('hidden');
                input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return;
        } else if ((input.dataset.nombre == "nombre" || input.dataset.nombre == "apellido") && (input.value.length < 2)) {
            input.classList.add("input--invalid");
            input.nextElementSibling.innerHTML = "Este campo debe contener al menos 2 caracteres.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            return;
        } else if (input.dataset.nombre == "email" && !(esEmailValido(input.value))) {
            input.classList.add("input--invalid");
            input.nextElementSibling.innerHTML = "El formato del email ingresado no es válido.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            return;
        } else if (input.dataset.nombre == "imagen") {
            let includes = false;
            extensionesAceptadas.forEach(extension => {
                if (input.value.includes(extension)) {
                    input.classList.remove("input--invalid");
                    input.classList.add("input--valid");
                    input.nextElementSibling.innerHTML = "";
                    includes = true;
                }
            })
            if (includes) {
                return;
            } else {
                input.classList.add("input--invalid");
                input.nextElementSibling.innerHTML = "Formato de imagen no válido, las extensiones aceptadas son: '.jpg', '.jpeg', '.png' o '.gif'.";
                return;
            }
        } else if ((input.dataset.nombre == "password" && (input.value.length < 8))) {
            input.classList.add("input--invalid");
            input.nextElementSibling.innerHTML = "Este campo debe contener al menos 8 caracteres.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            return;
        } else if ((input.dataset.nombre == "passwordRepetir" && (input.value != inputPassword.value))) {
            input.classList.add("input--invalid");
            input.nextElementSibling.innerHTML = "Las contraseñas no coinciden.";
            input.nextElementSibling.nextElementSibling.classList.add('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
            return;
        } else if (!(input.dataset.nombre == "imagen")) {
            input.classList.remove("input--invalid");
            input.classList.add("input--valid");
            input.nextElementSibling.innerHTML = "";
            input.nextElementSibling.nextElementSibling.classList.remove('hidden');
            input.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('hidden');
        } else {
            input.classList.remove("input--invalid");
            input.classList.add("input--valid");
            input.nextElementSibling.innerHTML = "";
        }
    })
})

//validamos email
//funcion que utiliza expresion regular para validar el email 
function esEmailValido(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email)
}

