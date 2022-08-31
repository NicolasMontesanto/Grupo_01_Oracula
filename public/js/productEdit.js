let inputSubcategoria = document.querySelector("#subcategoria");

inputSubcategoria.addEventListener("change", function (e) {

    let inputAtributos = document.querySelectorAll(".formulario__atributo");

    let allAttributes = document.querySelectorAll(".input--atributo");

    for (input of inputAtributos) {
        input.style.display = "none";
    }

    for (attribute of allAttributes) {
        attribute.classList.remove("atributo--seleccionado");
    }

    let opcionSeleccionada = e.target.selectedOptions[0].dataset.nombre;

    if (opcionSeleccionada == "Juego de mesa") {

        document.querySelector("#JuegoDeMesa").style.display = "flex";
        let atributosSeleccionados = document.querySelectorAll("#JuegoDeMesa div input")
        for (let i = 0; i < atributosSeleccionados.length; i++) {
            atributosSeleccionados[i].classList.add("atributo--seleccionado");
        }

    } else if (opcionSeleccionada == "Ropa") {
        document.querySelector("#Ropa").style.display = "flex";
        document.querySelector("#Ropa div select").classList.add("atributo--seleccionado");
    } else {
        document.querySelector(`#${opcionSeleccionada}`).style.display = "flex";
        let atributosSeleccionados = document.querySelectorAll(`#${opcionSeleccionada} div input`);
        for (let i = 0; i < atributosSeleccionados.length; i++) {
            atributosSeleccionados[i].classList.add("atributo--seleccionado");
        }
    }
})