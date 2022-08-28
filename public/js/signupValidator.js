let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let inputEmail = document.getElementById("email");
let inputImagen = document.getElementById("profilePicture");
let inputPassword = document.getElementById("password");
let inputPasswordRepetir = document.getElementById("passwordRepetir");
let formulario = document.querySelector(".formulario");

/*cuando tenemos errores en los campos mientras se rellena el formulario, el mensaje es tranqui en
el color negro, si hacemos submit con errores los mensajes se ponen rojos y/o aparecen alertas*/

let camposObligatorios = [inputNombre, inputImagen, inputApellido, inputEmail, inputPassword, inputPasswordRepetir]
formulario.addEventListener("submit", function(e){
    let errores = 0; 
    camposObligatorios.forEach(input => {
        input.nextElementSibling.innerHTML = "";
        //campos no vacios al enviar el formulario
        if(input.value.length == 0){
            input.classList.add("invalid");
            errores++;
            input.nextElementSibling.classList.add("text-danger");
            input.nextElementSibling.innerHTML = "Por favor, completá este campo para continuar";
            return;
        }else{
            input.classList.remove("invalid");
        }
        //nombre y apellido con al menos dos caracteres 
        if((input.dataset.nombre == "nombre" || input.dataset.nombre == "apellido")  && (input.value.length < 2)){
            input.classList.add("invalid");
            errores++;
            input.nextElementSibling.classList.add("text-danger");
            input.nextElementSibling.innerHTML = "Este campo debe contener al menos 2 caracteres";
            return;
        }else{
            input.classList.remove("invalid");
        }
        //valida el formato de la imagen
        if(input.dataset.nombre == "imagen") {
            let extension = input.value.split(".").pop().toLowerCase();
            if(extension != ("jpg" || "png" || "jpeg" || "gif" )){
                    input.classList.add("invalid");
                    errores++;
                    alert("Ups! El formato de tu imagen no esta permitido. \n Por favor ingresá una imagen .jpg/.jpeg/.png/.gif");
                    return;
                }else{
                    input.classList.remove("invalid");
                }
            
        }
    });
   
    //valida el formato del email
    if(!esEmailValido(inputEmail.value)){
        inputEmail.classList.add("invalid");
        errores++;
        inputEmail.nextElementSibling.classList.add("text-danger");
        inputEmail.nextElementSibling.innerHTML = "El formato del email ingresado no es válido";
    }

    if(errores > 0){
        e.preventDefault();
    }
})

camposObligatorios.forEach(function(input){
    
    input.addEventListener("blur", () => {
        //campos no vacios al salir del input 
    if(input.value == "") {
        input.classList.add("invalid");
        input.nextElementSibling.innerHTML = "No te olvides de completar este campo";
    }
    if(input.value != ""){
        input.classList.remove("invalid");
        input.nextElementSibling.innerHTML = "";
    }
    //longitud de campos al salir del input
    if((input.dataset.nombre == "nombre" || input.dataset.nombre == "apellido")  && (input.value.length < 2)){
        input.classList.add("invalid");
        input.nextElementSibling.innerHTML = "Este campo debe contener al menos 2 caracteres";
        return;
    }else{
        input.classList.remove("invalid");
    }
    
       
})
})

//validamos email


//funcion que utiliza expresion regular para validar el email 
function esEmailValido(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email) 
}

