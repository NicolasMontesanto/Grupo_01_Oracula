let formulario = document.querySelector(".formulario");
//Elementos de nombre
let inputNombre = document.querySelector("#nombre");
let iconValidNombre = document.querySelector("#iconValidNombre");
let iconInvalidNombre = document.querySelector("#iconInvalidNombre");
let errorNombre = document.querySelector("#errorNombre");
//Elementos de descripción
let inputDescripcion = document.querySelector("#descripcion");
let iconValidDescripcion = document.querySelector("#iconValidDescripcion");
let iconInvalidDescripcion = document.querySelector("#iconInvalidDescripcion");
let errorDescripcion = document.querySelector("#errorDescripcion");
//Elementos de categoría
let inputCategoria = document.querySelector("#categoria");
let errorCategoria = document.querySelector("#errorCategoria");
//Elementos de subcategoría
let errorSubcategoria = document.querySelector("#errorSubcategoria");
//Elementos de precio
let inputPrecio = document.querySelector("#precio");
let iconValidPrecio = document.querySelector("#iconValidPrecio");
let iconInvalidPrecio = document.querySelector("#iconInvalidPrecio");
let errorPrecio = document.querySelector("#errorPrecio");
//Elementos de imagen
let inputImagenes = document.querySelector(".input--file");
let errorImagenes = document.querySelector("#errorImagenes");
//Extensiones váldias
let validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
//Flag con el número de errores
let numberOfErrors = 0;

function insertAfter(elementoNuevo, elementoSeleccionado) {
    elementoSeleccionado.parentNode.insertBefore(elementoNuevo, elementoSeleccionado.nextSibling);
}

function validateNumberOfChar(input, numberOfChar, iconValid, iconInvalid, error, errorMessage) {
    //Si no cumple con la validación:
    if (input.value.length < numberOfChar) {
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
    if (input.value.length >= numberOfChar) {
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


function validateExtensions(input, extensions, error, errorMessage) {
    //Se recorren las extensiones buscando si el archivo cargado tiene alguna.
    let includes = false;
    extensions.forEach(extension => {
        //Si el archivo tiene una extensión aceptada, pasa la validación y se quita el mensaje de error.
        if (input.value.includes(extension)) {
            input.classList.remove("input--invalid");
            (input.classList.contains("input--valid")) ? null : input.classList.add("input--valid");
            (error != "") ? error.innerText = "" : null;
            includes = true;
        }
    })
    if (includes) {
        return 0;
    } else {
        //Si no tiene una extensión aceptada, no pasa la validación y se agrega el mensaje de error.
        input.classList.remove("input--valid");
        input.classList.add("input--invalid");
        (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        return 1;
    }
}

window.addEventListener('load', function () {
    //Array donde se guardan los atributos
    var inputAtributos = document.querySelectorAll('.atributo--seleccionado');
    //A cada atributo se le agrega un elemento <p>, con una clase 'formulario__error' y un id, debajo, y un evento que valida que no esté vacío.
    for (let i = 0; i < inputAtributos.length; i++) {
        //Si tiene elemento <p> previo, se borra.
        let errorPrevio = document.querySelector(`#atributo${i}`);
        if (errorPrevio) {
            errorPrevio.remove();
        }
        //Se crea el elemento <p>
        let errorAtributo = document.createElement('p');
        //Se le agrega la clase 'formulario__error'
        errorAtributo.classList.add("formulario__error");
        //Se le agrega el id
        errorAtributo.setAttribute('id', `atributo${i}`);
        //Se agrega el elemento luego del input
        insertAfter(errorAtributo, inputAtributos[i]);
        //Se agrega el evento para validar su contenido.

        inputAtributos[i].addEventListener('input', function (event) {
            validateNumberOfChar(inputAtributos[i], 1, "", "", document.querySelector(`#atributo${i}`), "Completá este campo.")
        })
    }
})


//Validación para el Nombre cada vez que se cambia el input
inputNombre.addEventListener("input", function (event) {
    validateNumberOfChar(inputNombre, 5, iconValidNombre, iconInvalidNombre, errorNombre, "El nombre debe tener al menos cinco caracteres.")
})

//Validación para la Descripción  cada vez que se cambia el input
inputDescripcion.addEventListener("input", function (event) {
    validateNumberOfChar(inputDescripcion, 20, iconValidDescripcion, iconInvalidDescripcion, errorDescripcion, "La descripción debe tener al menos veinte caracteres.")
})


//Evento que agrega elementos <p> para contener el error a todos los atributos de la subcategoría seleccionada.
inputSubcategoria.addEventListener('change', function (event) {
    //Se consiguen los atributos seleccionados.
    inputAtributos = document.querySelectorAll('.atributo--seleccionado');

    //A cada atributo se le agrega un elemento <p>, con una clase 'formulario__error' y un id, debajo, y un evento que valida que no esté vacío.
    for (let i = 0; i < inputAtributos.length; i++) {
        //Si tiene elemento <p> previo, se borra.
        let errorPrevio = document.querySelector(`#atributo${i}`);
        if (errorPrevio) {
            errorPrevio.remove();
        }

        //Se crea el elemento <p>
        var errorAtributo = document.createElement('p');
        //Se le agrega la clase 'formulario__error'
        errorAtributo.classList.add("formulario__error");
        //Se le agrega el id
        errorAtributo.setAttribute('id', `atributo${i}`);
        //Se agrega el elemento luego del input
        insertAfter(errorAtributo, inputAtributos[i]);

        //Se agrega el evento para validar su contenido.
        inputAtributos[i].addEventListener('input', function (event) {
            validateNumberOfChar(inputAtributos[i], 1, "", "", document.querySelector(`#atributo${i}`), "Completá este campo.")
        })
    }
})

//Validación para el Precio cada vez que se cambia el input
inputPrecio.addEventListener('input', function (event) {
    validateNumberOfChar(inputPrecio, 1, iconValidPrecio, iconInvalidPrecio, errorPrecio, "El precio no puede estar vacío.")

})

//Validación para la imágen
inputImagenes.addEventListener("change", function (event) {
    validateExtensions(inputImagenes, validExtensions, errorImagenes, "Extensiones aceptadas: '.jpg', '.jpeg', '.png' o '.gif'.")
})

//Evento en el formulario que no permite que se mande si hay errores.
formulario.addEventListener("submit", function (event) {

    //Se realizan las validaciones antes de mandar el formulario y se agrega su resultado a numberOfErrors.
    numberOfErrors += validateNumberOfChar(inputNombre, 5, iconValidNombre, iconInvalidNombre, errorNombre, "El nombre debe tener al menos cinco caracteres.")
    numberOfErrors += validateNumberOfChar(inputDescripcion, 20, iconValidDescripcion, iconInvalidDescripcion, errorDescripcion, "La descripción debe tener al menos veinte caracteres.")
    numberOfErrors += validateNumberOfChar(inputPrecio, 1, iconValidPrecio, iconInvalidPrecio, errorPrecio, "El precio no puede estar vacío.");
    numberOfErrors += validateExtensions(inputImagenes, validExtensions, errorImagenes, "Extensiones aceptadas: '.jpg', '.jpeg', '.png' o '.gif'.")

    //Validaciones para cada atributo
    for (let i = 0; i < inputAtributos.length; i++) {
        numberOfErrors += validateNumberOfChar(inputAtributos[i], 1, "", "", document.querySelector(`#atributo${i}`), "Completá este campo.")
    }

    //Si hay errores se previene la acción predeterminada y se resetea numberOfErrors
    numberOfErrors > 0 ? event.preventDefault() : null;
    numberOfErrors = 0;

    //Se hace un scroll al principio de la página
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})
