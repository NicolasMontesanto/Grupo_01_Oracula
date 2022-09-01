//Burger icon
let menuIcon = document.querySelector(".burger")

//elemento menú
let menu = document.querySelector(".menu--mobile");

//Botón de categorias y su contenido
let botonCategorias = document.querySelector("#botonCategoriasMobile");
let dropdownCategorias = document.querySelector("#dropdownCategorias");
let iconCategorias = document.querySelector("#iconDropdownCategorias")

//Botón de usuarix y su contenido
let botonUsuarix = document.querySelector("#botonUsuarixMobile");
let dropdownUsuarix = document.querySelector("#dropdownUsuarix");
let iconUsuarix = document.querySelector("#iconDropdownUsuarix")

//Botón de admin y su contenido
let botonAdmin = document.querySelector("#botonAdminMobile");
let dropdownAdmin = document.querySelector("#dropdownAdmin");
let iconAdmin = document.querySelector("#iconDropdownAdmin")


menuIcon.addEventListener('click', function () {
    menu.classList.toggle("active");
})


menu.addEventListener("mouseleave", function () {
    console.log("blur");
    menu.classList.toggle("active");
})



function dropdownButton(button, icon, contentToShow, contentToHide, iconsToFix) {
    button.addEventListener("click", function () {
        contentToShow.classList.toggle("dropdown--down");
        contentToShow.classList.toggle("dropdown--animated");
        icon.classList.toggle("icon--upside-down");
        contentToHide.forEach(content => {
            if (content) {
                content.classList.remove("dropdown--down");
                content.classList.remove("dropdown--animated");
            }
        
        });
        iconsToFix.forEach(icon => {
            if (icon) {
                icon.classList.remove("icon--upside-down");
            }
        });
    })
}

dropdownButton(botonCategorias, iconCategorias, dropdownCategorias, [dropdownAdmin, dropdownUsuarix], [iconUsuarix, iconAdmin]);
if (botonUsuarix) {
    dropdownButton(botonUsuarix, iconUsuarix, dropdownUsuarix, [dropdownAdmin, dropdownCategorias], [iconCategorias, iconAdmin]);
}
if (botonAdmin) {
    dropdownButton(botonAdmin, iconAdmin, dropdownAdmin, [dropdownUsuarix, dropdownCategorias], [iconUsuarix, iconCategorias]);
}