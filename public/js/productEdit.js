//se consigue el select de subcategorías
let inputSubcategoria = document.querySelector("#subcategoria");
//se consiguen todos los inputs con la clase 'input--atributos'
let inputAtributos = document.querySelectorAll(".input--atributos");

window.addEventListener("load", function(e){
    let opcionSeleccionada = inputSubcategoria.selectedOptions[0].dataset.nombre
    if (opcionSeleccionada){
        document.querySelector(`#${opcionSeleccionada}`).style.display = "flex";
    }
})

//función que muestra los atributos para cada subcategoría
inputSubcategoria.addEventListener("change", function(e){
    //se esconden todos los atributos
    for (input of inputAtributos){
        input.style.display = "none";
    }

    //se consigue el nombre de la subcategoría elegida y se muestran sus atributos
    let opcionSeleccionada = e.target.selectedOptions[0].dataset.nombre;
    //Caso especial para 'Juegos de mesa' por sus espacios
    if ( opcionSeleccionada == "Juego de mesa"){
        document.querySelector("#JuegoDeMesa").style.display = "flex";
    }else{
        document.querySelector(`#${opcionSeleccionada}`).style.display = "flex";
    }
})
