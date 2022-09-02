let inputSubcategoria = document.querySelector("#subcategoria");

//EventListener que muestra los atributos para cada subcategoría cuando se selecciona una:
window.addEventListener("load", function(){
     //Se consiguen todos los atributos con la clase 'formulario__atributo'
     let inputAtributos = document.querySelectorAll(".formulario__atributo");
     //Se consiguen todos los inputs de los atributos con la clase "input--atributo"
     let allAttributes = document.querySelectorAll(".input--atributo");
 
     //Se esconden todos los atributos
     for (input of inputAtributos) {
         input.style.display = "none";
     }
     //Se quita la clase "atributo--seleccionado" a todos los inputs de atributos
     for (attribute of allAttributes) {
         attribute.classList.remove("atributo--seleccionado");
     }
 
     //Se consigue el nombre de la subcategoría elegida y se muestran sus atributos
     //Además se le agrega la clase "atributo--seleccionado" a sus atributos para poder validarlos después
     let opcionSeleccionada = inputSubcategoria.selectedOptions[0].dataset.nombre;
 
     if (opcionSeleccionada == "Juego de mesa") {
         //Caso especial para 'Juegos de mesa' por sus espacios
         document.querySelector("#JuegoDeMesa").style.display = "flex";
 
         //Se consiguen los inputs de los atributos y se les agrega la clase "atributo--seleccionado" para validarlos.
         let atributosSeleccionados = document.querySelectorAll("#JuegoDeMesa div input")
         for (let i = 0; i < atributosSeleccionados.length; i++) {
             atributosSeleccionados[i].classList.add("atributo--seleccionado");
         }
 
     } else if (opcionSeleccionada == "Ropa") {
         //Caso especial para 'Ropa' por tener un select en vez de inputs
         document.querySelector("#Ropa").style.display = "flex";
 
         //Se consigue el select y se le agrega la clase "atributo--seleccionado" para validarlo.
         document.querySelector("#Ropa div select").classList.add("atributo--seleccionado");
 
     } else {
         //Se usa el nombre guardado en "opcionSeleccionada" para encontrar los atributos y cambiar su display
         document.querySelector(`#${opcionSeleccionada}`).style.display = "flex";
 
         //Se consiguen los inputs de los atributos y se les agrega la clase "atributo--seleccionado" para validarlos.
         let atributosSeleccionados = document.querySelectorAll(`#${opcionSeleccionada} div input`);
         for (let i = 0; i < atributosSeleccionados.length; i++) {
             atributosSeleccionados[i].classList.add("atributo--seleccionado");
         }
     }
})

inputSubcategoria.addEventListener("change", function (e) {

    //Se consiguen todos los atributos con la clase 'formulario__atributo'
    let inputAtributos = document.querySelectorAll(".formulario__atributo");
    //Se consiguen todos los inputs de los atributos con la clase "input--atributo"
    let allAttributes = document.querySelectorAll(".input--atributo");

    //Se esconden todos los atributos
    for (input of inputAtributos) {
        input.style.display = "none";
    }
    //Se quita la clase "atributo--seleccionado" a todos los inputs de atributos
    for (attribute of allAttributes) {
        attribute.classList.remove("atributo--seleccionado");
    }

    //Se consigue el nombre de la subcategoría elegida y se muestran sus atributos
    //Además se le agrega la clase "atributo--seleccionado" a sus atributos para poder validarlos después
    let opcionSeleccionada = e.target.selectedOptions[0].dataset.nombre;

    if (opcionSeleccionada == "Juego de mesa") {
        //Caso especial para 'Juegos de mesa' por sus espacios
        document.querySelector("#JuegoDeMesa").style.display = "flex";

        //Se consiguen los inputs de los atributos y se les agrega la clase "atributo--seleccionado" para validarlos.
        let atributosSeleccionados = document.querySelectorAll("#JuegoDeMesa div input")
        for (let i = 0; i < atributosSeleccionados.length; i++) {
            atributosSeleccionados[i].classList.add("atributo--seleccionado");
        }

    } else if (opcionSeleccionada == "Ropa") {
        //Caso especial para 'Ropa' por tener un select en vez de inputs
        document.querySelector("#Ropa").style.display = "flex";

        //Se consigue el select y se le agrega la clase "atributo--seleccionado" para validarlo.
        document.querySelector("#Ropa div select").classList.add("atributo--seleccionado");

    } else {
        //Se usa el nombre guardado en "opcionSeleccionada" para encontrar los atributos y cambiar su display
        document.querySelector(`#${opcionSeleccionada}`).style.display = "flex";

        //Se consiguen los inputs de los atributos y se les agrega la clase "atributo--seleccionado" para validarlos.
        let atributosSeleccionados = document.querySelectorAll(`#${opcionSeleccionada} div input`);
        for (let i = 0; i < atributosSeleccionados.length; i++) {
            atributosSeleccionados[i].classList.add("atributo--seleccionado");
        }
    }
})
