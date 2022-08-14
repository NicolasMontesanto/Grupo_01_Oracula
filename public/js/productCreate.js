let inputSubcategoria = document.querySelector("#subcategoria");

//función que muestra los atributos para cada subcategoría
inputSubcategoria.addEventListener("change", function(e){
    //se consiguen todos los inputs con la clase 'input--atributos'
    let inputAtributos = document.querySelectorAll(".input--atributos");
    
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
