use oraculaDB; 

Delete from attributes where id > 0; 
Delete from subcategories where id > 0; 
Delete from categories where id > 0;
Delete from genres where id > 0; 
Delete from carts where id > 0; 
Delete from users where id > 0; 


/*Cargar las categorías*/
INSERT INTO oraculaDB.categories (nombre) 
VALUES ('Juegos'), ('Literatura'), ('Multimedia'), ('Baratijas');

/*Cargar las subcategorías*/
INSERT INTO oraculaDB.subcategories (nombre, categoryID)
 VALUES ('Juego de mesa', 1), ('Videojuego', 1), ('Libro', 2), ('Audiolibro', 2), ('Ropa' , 4), ('Coleccionable' , 4), ('Accesorio' , 4), ('Pelicula' , 3), ('Soundtrack' , 3);

/*Cargar los atributos */
INSERT INTO oraculaDB.attributes (nombre, unidad, subcategoryID) VALUES ('Cantidad de jugadorxs', null, 1 ),('Edad Recomendada', 'años', 1),('Desarrolladorx', null, 2),('Lanzamiento', 'fecha', 2),('Extensión', 'cantidad de páginas', 3),('Autoría', null, 3), ('Duración', 'minutos', 4), 
('Autoría', null, 4),('Narrado por', null, 4),('Talle', null, 5),('Duración', 'minutos', 8), ('Duración', 'minutos', 9);

/*Cargar los géneros*/
INSERT INTO oraculaDB.genres (nombre)
 VALUES ('Fantasía Clásica'), ('Fantasía Medieval'), ('Fantasía Juvenil'), ('Fantasía Urbana'), ('Fantasía Oscura'), ('Inclasificable') ;

/*Cargar User Admin*/

INSERT INTO oraculaDB.users (id, nombre, apellido, email, direccion, telefono, imagen, password, magicPass, esAdmin, createdAt)
VALUES (1, "Admin", "Admin", "admin@email.com","","", "/img/Profile-pictures/1661038507014-profileImg.jpg", "$2a$10$V5Fx1YBAFvxd5T1Dm8AOKeIzDamdSvt7lnMBJOJYLfL0uSUy4NFrC", 0, 1, CURRENT_TIMESTAMP());

INSERT INTO oraculaDB.carts (id, montoTotal, userID)
VALUES (1, 0, 1);