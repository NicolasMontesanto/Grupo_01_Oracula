//El formulario
let formulario = document.querySelector(".formulario");

//Elementos para el input Nombre
let inputNombre = document.querySelector("#nombre");
let iconValidNombre = document.querySelector("#iconValidNombre");
let iconInvalidNombre = document.querySelector("#iconInvalidNombre");
let errorNombre = document.querySelector("#errorNombre");

//Elementos para el inpout Descripción
let inputDescripcion = document.querySelector("#descripcion");
let iconValidDescripcion = document.querySelector("#iconValidDescripcion");
let iconInvalidDescripcion = document.querySelector("#iconInvalidDescripcion");
let errorDescripcion = document.querySelector("#errorDescripcion");

//Elementos para el input Categoría
let inputCategoria = document.querySelector("#categoria");
let errorCategoria = document.querySelector("#errorCategoria");

//Elementos para el input Subcategoría
let errorSubcategoria = document.querySelector("#errorSubcategoria");

//Elementos de los atributos de la subcategoría elegida
let inputAtributos = [];

//Elementos para el input Precio
let inputPrecio = document.querySelector("#precio");
let iconValidPrecio = document.querySelector("#iconValidPrecio");
let iconInvalidPrecio = document.querySelector("#iconInvalidPrecio");
let errorPrecio = document.querySelector("#errorPrecio");

//Elemento imagen
let inputImagenes = document.querySelector(".input--file");
let errorImagenes = document.querySelector("#errorImagenes");
let validExtensions = [".jpg", ".jpeg", ".png", ".gif"];

//Flag que cuenta la cantidad de errores que tiene el formulario.
let numberOfErrors = 0;

//Función que inserta un elemento luego del seleccionado
function insertAfter(elementoNuevo, elementoSeleccionado) {
    elementoSeleccionado.parentNode.insertBefore(elementoNuevo, elementoSeleccionado.nextSibling);
}

//Función que valida que un input tenga la cantidad de caracteres especificada.
//Al input le agrega las clases "input--valid" o "input--invalid" según corresponda.
//A los íconos los muestra y oculta según corresponda.
//Y al se error le da o quita el mensaje de error.
//Recibe el input que se quiere validar, la cantidad de caracteres, los íconos de válido y no válido, el elemento donde se va a mostrar el error, y el mensaje de error a mostrar.
//Devuelve 1 si hay errores o 0 si no. Esto se usa para contar la cantidad de errores que quedan en el formulario.
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

//Función que valida que un input select no tenga seleccionado su primer elemento (el placeholder).
//Al input le agrega las clases "input--valid" o "input--invalid" según corresponda.
//Y al error se le da o quita el mensaje de error.
//Recibe el input que se quiere validar, el elemento donde se va a mostrar el error, y el mensaje de error a mostrar.
//Devuelve 1 si hay errores o 0 si no. Esto se usa para contar la cantidad de errores que quedan en el formulario.
function validateOptionSelected(input, error, errorMessage) {
    if (input.selectedIndex == 0) {
        //Se quita todo lo que indique que sea válido
        if (input.classList.contains("input--valid")) {
            input.classList.remove("input--valid");
        }

        //Se agrega lo que indica que no es válido
        if (input.classList.contains("input--invalid") == false) {
            input.classList.add("input--invalid");
            (error != "" && errorMessage != "") ? error.innerText = errorMessage : null;
        }
        return 1;
    }
    if (input.selectedIndex != 0) {
        //Se quita todo lo que indique que no sea válido
        if (input.classList.contains("input--invalid")) {
            input.classList.remove("input--invalid");
        }

        //Se agrega lo que indica que es válido
        if (input.classList.contains("input--valid") == false) {
            input.classList.add("input--valid");
            (error != "") ? error.innerText = "" : null;
        }
        return 0;
    }

}

//Función que valida que un input de file tenga alguna de las extensiones aceptadas.
//Al input le agrega las clases "input--valid" o "input--invalid" según corresponda.
//Y al error se le da o quita el mensaje de error.
//Recibe el input que se quiere validar, las extensiones aceptadas, el elemento donde se va a mostrar el error, y el mensaje de error a mostrar.
//Devuelve 1 si hay errores o 0 si no. Esto se usa para contar la cantidad de errores que quedan en el formulario.
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

//Validación para el Nombre cada vez que se cambia el input
inputNombre.addEventListener("input", function (event) {
    validateNumberOfChar(inputNombre, 5, iconValidNombre, iconInvalidNombre, errorNombre, "El nombre debe tener al menos cinco caracteres.")
})

//Validación para la Descripción  cada vez que se cambia el input
inputDescripcion.addEventListener("input", function (event) {
    validateNumberOfChar(inputDescripcion, 20, iconValidDescripcion, iconInvalidDescripcion, errorDescripcion, "La descripción debe tener al menos veinte caracteres.")
})

inputCategoria.addEventListener('change', function (event) {
    validateOptionSelected(inputCategoria, errorCategoria, "Seleccioná una categoría.");

})

//Evento que agrega elementos <p> para contener el error a todos los atributos de la subcategoría seleccionada.
inputSubcategoria.addEventListener('change', function (event) {
    //Se valida si hay una opción seleccionada
    validateOptionSelected(inputSubcategoria, errorSubcategoria, "Seleccioná una subcategoría.");

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
    numberOfErrors += validateOptionSelected(inputCategoria, errorCategoria, "Seleccioná una categoría.");
    numberOfErrors += validateOptionSelected(inputSubcategoria, errorSubcategoria, "Seleccioná una subcategoría.");
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

