                                    DROP database IF EXISTS oraculaDB;
CREATE DATABASE IF NOT EXISTS oraculaDB ;
USE oraculaDB;

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `nombre` varchar(50) NOT NULL
);

DROP TABLE IF EXISTS `Subcategories`;
CREATE TABLE `Subcategories` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `nombre` varchar(50) NOT NULL,
  `categoryID` int NOT NULL,
  FOREIGN KEY (`categoryID`) REFERENCES `Categories`(`id`)
);

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products`(
`id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
`nombre` VARCHAR(50) NOT NULL,
`descripcion` TEXT NOT NULL,
`precio` DECIMAL(10,2) NOT NULL,
`descuento` TINYINT UNSIGNED,
`esNovedad` TINYINT NOT NULL DEFAULT 0,
`esDestacado` TINYINT NOT NULL DEFAULT 0,
`esMagicPass` TINYINT NOT NULL DEFAULT 0,
`createdAt` DATETIME DEFAULT NOW(),
`updatedAt` DATETIME DEFAULT NOW() ON UPDATE NOW(),
`categoryID` INT NOT NULL,
`subcategoryID` INT NOT NULL,
FOREIGN KEY(`categoryID`) REFERENCES `Categories`(`id`),
FOREIGN KEY(`subcategoryID`) REFERENCES `Subcategories`(`id`)
);

DROP TABLE IF EXISTS `Attributes`;
CREATE TABLE `Attributes`(
`id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
`nombre` VARCHAR(50) NOT NULL,
`unidad` VARCHAR(50),
`subcategoryID` INT NOT NULL,
FOREIGN KEY(`subcategoryID`) REFERENCES Subcategories(`id`)
);

DROP TABLE IF EXISTS `AttributesProducts`;
CREATE TABLE `AttributesProducts`(
`id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
`valor` VARCHAR(50) NOT NULL,
`attributeID` INT NOT NULL,
`productID` INT NOT NULL,
FOREIGN KEY(`attributeID`) REFERENCES `Attributes`(`id`),
FOREIGN KEY(`productID`) REFERENCES `Products`(`id`)
);

DROP TABLE IF EXISTS `Stocks`;
CREATE TABLE `Stocks`(
`id` INT AUTO_INCREMENT PRIMARY KEY,
`cantidad` INT NOT NULL,
`updatedAt` DATETIME DEFAULT NOW() ON UPDATE NOW(),
`productID` INT NOT NULL,
FOREIGN KEY(`productID`) REFERENCES Products(`id`)
);

DROP TABLE IF EXISTS `Images`;
CREATE TABLE `Images` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `url` varchar(200) NOT NULL,
  `productID` int NOT NULL,
  FOREIGN KEY (`productID`) REFERENCES Products(`id`)
);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` INT PRIMARY KEY NOT NULL auto_increment,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(50) NULL,
  `telefono` VARCHAR(20) NULL,
  `imagen` VARCHAR(200) NOT NULL,
  `password` TEXT NOT NULL,
  `esAdmin` TINYINT NOT NULL,
  `magicPass` TINYINT NOT NULL,
  `createdAt` DATE NOT NULL,
  `estaActivo` TINYINT NOT NULL DEFAULT 1
);

DROP TABLE IF EXISTS `Wishlists`;
CREATE TABLE `Wishlists`(
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `userID` int NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES `Users`(`id`)
);

DROP TABLE IF EXISTS `Purchases`;
CREATE TABLE `Purchases` (
  `id` INT PRIMARY KEY NOT NULL auto_increment,
  `userID` INT NOT NULL,
  `createdAt` DATE NOT NULL,
  `montoTotal` DECIMAL NOT NULL,
  `esCancelado` TINYINT NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES `Users` (`id`)
 );

DROP TABLE IF EXISTS `PurchasesProducts`;
CREATE TABLE `PurchasesProducts` (
  `id` INT PRIMARY KEY NOT NULL auto_increment,
  `productID` INT NOT NULL,
  `purchasesID` INT NOT NULL,
  `precioFinal` DECIMAL NOT NULL,
  `porcentajeDescuento` INT NOT NULL,
  `cantidad` INT NOT NULL,
  FOREIGN KEY (`productID`) REFERENCES `Products` (`id`),
  FOREIGN KEY (`purchasesID`) REFERENCES `Purchases` (`id`)
);

DROP TABLE IF EXISTS `Favorites`;
CREATE TABLE `Favorites` (
  `id` INT NOT NULL auto_increment,
  `userID` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userID`) REFERENCES `Users` (`id`)
);

DROP TABLE IF EXISTS `Genres`;
CREATE TABLE `Genres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL
);

DROP TABLE IF EXISTS `Carts`;
CREATE TABLE `Carts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `montoTotal` decimal(10,2) NOT NULL,
  `userID` int NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES Users(`id`)
);

DROP TABLE IF EXISTS `ProductsGenres`;
CREATE TABLE `ProductsGenres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `productID` int NOT NULL,
  `genreID` int NOT NULL,
   FOREIGN KEY (`productID`) REFERENCES Products(`id`),
   FOREIGN KEY (`genreID`) REFERENCES Genres(`id`)
);

DROP TABLE IF EXISTS `CartsProducts`;
CREATE TABLE `CartsProducts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `productID` int NOT NULL,
  `cartID` int NOT NULL,
  `cantidad` int NOT NULL,
   FOREIGN KEY (`productID`) REFERENCES Products(`id`),
   FOREIGN KEY (`cartID`) REFERENCES Carts(`id`)
);

DROP TABLE IF EXISTS `ProductsFavorites`;
CREATE TABLE `ProductsFavorites` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `productID` int NOT NULL,
  `favoriteID` int NOT NULL,
   FOREIGN KEY (`productID`) REFERENCES `Products`(`id`),
   FOREIGN KEY (`favoriteID`) REFERENCES `Favorites`(`id`)
);

DROP TABLE IF EXISTS `ProductsWishlists`;
CREATE TABLE `ProductsWishlists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `productID` int NOT NULL,
  `wishlistID` int NOT NULL,
   FOREIGN KEY (`productID`) REFERENCES `Products`(`id`),
   FOREIGN KEY (`wishlistID`) REFERENCES `Wishlists`(`id`)
);

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
INSERT INTO oraculaDB.attributes (nombre, unidad, subcategoryID) VALUES ('Cantidad de jugadorxs', null, 1 ),('Edad Recomendada', 'años', 1),('Desarrollador', null, 2),('Lanzamiento', 'fecha', 2),('Extensión', 'cantidad de páginas', 3),('Autoría', null, 3), ('Duración', 'minutos', 4), 
('Autoría', null, 4),('Narrado por', null, 4),('Talle', null, 5),('Duración', 'minutos', 8), ('Duración', 'minutos', 9);

/*Cargar los géneros*/
INSERT INTO oraculaDB.genres (nombre)
 VALUES ('Fantasía Clásica'), ('Fantasía Medieval'), ('Fantasía Juvenil'), ('Fantasía Urbana'), ('Fantasía Oscura'), ('Inclasificable') ;

/*Cargar User Admin*/

INSERT INTO oraculaDB.users (id, nombre, apellido, email, direccion, telefono, imagen, password, magicPass, esAdmin, createdAt)
VALUES (1, "Admin", "Admin", "admin@email.com","","", "/img/Profile-pictures/1661038507014-profileImg.jpg", "$2a$10$V5Fx1YBAFvxd5T1Dm8AOKeIzDamdSvt7lnMBJOJYLfL0uSUy4NFrC", 0, 1, CURRENT_TIMESTAMP());

INSERT INTO oraculaDB.carts (id, montoTotal, userID)
VALUES (1, 0, 1);

Delete from images where id > 0;
Delete from productsGenres where id > 0; 
Delete from attributesProducts where id > 0; 
Delete from products where id > 0; 

/*Carga de  Productos*/

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (1, 'Cuentos de Beedle el Bardo', 
'Serie de cuentos escritos por la figura legendaria de Beedle el bardo, traducidos de su lenguaje rúnico original por Hermione Granger, y anotados por Albus Dumbledore', 
3500, 
10,
1, 1, 1, '2022-08-18 00:40:50', '2022-08-18 00:40:50', 2, 3);

INSERT INTO images (id, url, productID)
VALUES (1, '/img/productos/1656443047391-prodImg.jpg', 1);

INSERT INTO productsGenres ( productID, genreID)
VALUES (1, 3), (1, 3), (1, 4);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('J. K. Rowling', 6, 1), ('360', 5, 1);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (2, 'Antología de la Literatura fantástica', 
'Borges, Bioy Casares y Silvina Ocampo nos ofrecen en esta Antologia de la Literatura fantastica lo mejor de un genero literario que siempre ha ejercido un atractivo irresistible en el publico lector. Es el genero representado por las irrupciones de la fantasía creadora y la intuición artística en lo desconocido, lo inexplicable, lo misterioso, lo sobrenatural.', 
2300, 
5,
1, 1, 1, '2022-08-18 00:41:50', '2022-08-18 00:41:50', 2, 3);

INSERT INTO images (id, url, productID)
VALUES (2, '/img/productos/1656443192626-prodImg.jpg', 2);

INSERT INTO productsGenres (productID, genreID)
VALUES (2, 1);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Borges, Casares, Ocampo', 6, 2), ('423', 5, 2);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (3, 'Coraline', 
'Al día siguiente de mudarse de casa, Coraline explora las catorce puertas de su nuevo hogar. Trece se pueden abrir con normalidad, pero la decimocuarta está cerrada y tapiada. Cuando por fin consigue abrirla, Coraline se encuentra con un pasadizo secreto que la conduce a otra casa tan parecida a la suya que resulta escalofriante.\r\n\r\nSin embargo, hay ciertas diferencias que llaman su atención: la comida es más rica, los juguetes son tan desconocidos como maravillosos y, sobre todo, hay otra madre y otro padre que quieren que Coraline se quede con ellos, se convierta en su hija y no se marche nunca. Pronto Coraline se da cuenta de que, tras los espejos, hay otros niños que han caído en la trampa. Son como almas perdidas, y ahora ella es su única esperanza de salvación. Pero para rescatarlos tendrá también que recuperar a sus verdaderos padres, y cumplir así el desafío que le permitirá volver a su vida anterior.', 
1100, 
10,
1, 1, 1, '2022-08-18 00:42:50', '2022-08-18 00:42:50', 2, 3);

INSERT INTO images (id, url, productID)
VALUES (3, '/img/productos/1656443421367-prodImg.jpg', 3);

INSERT INTO productsGenres (productID, genreID)
VALUES (3, 3), (3, 5);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Neil Gaiman', 6, 3), ('500', 5, 3);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (4, 'El laberinto del Fauno', 
'Ambientada en el año 1944, El laberinto del fauno cuenta el viaje de Ofelia, una niña de 13 años que se traslada hasta un pequeño pueblo donde su madre se casa con un cruel capitán del ejército franquista. Una noche, Ofelia descubre las ruinas de un laberinto donde se encuentra con un fauno, una extraña criatura que le hace una increíble revelación: Ofelia es en realidad una princesa, última de su estirpe, a la que los suyos llevan mucho tiempo esperando.', 
3100, 
10,
1, 1, 1, '2022-08-18 00:43:50', '2022-08-18 00:43:50', 2, 3);

INSERT INTO productsGenres (productID, genreID)
VALUES (4, 5);

INSERT INTO images (id, url, productID)
VALUES (4, '/img/productos/1656443520775-prodImg.jpg', 4);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('G. del Toro - Cornelia Funke', 6, 4), ('730', 5, 4);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (5, 'Mort Cinder', 
'En esta historieta argentina Ezra Winston, un anticuario de Londres, es guiado por misteriosas señales hasta la tumba de un ajusticiado, un tal Mort Cinder. Este vuelve de la muerte para arrastrarlo a sombrías aventuras y para contarle historias ocurridas en el fondo de los tiempos.\r\n\r\nEn esta edición de tamaño especial, las ilustraciones oscuras de Breccia se ven con un detalle que asusta.', 
7600, 
20,
1, 1, 1, '2022-08-18 00:44:50', '2022-08-18 00:44:50', 2, 3);

INSERT INTO images (id, url, productID)
VALUES (5, '/img/productos/1656443944880-prodImg.jpg', 5);

INSERT INTO productsGenres (productID, genreID)
VALUES (5, 5);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('H. G. Oesterheld', 6, 5), ('240', 5, 5);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (6, 'Mort', 
'Cuarta novela de la hilarante saga del Mundodisco.\r\nEn esta entrega, Mortimer es un joven soñador y despistado a quien le toca en suerte una inesperada tarea: convertirse en aprendiz de la Muerte y aplicarse en liberar almas de su envoltura carnal.', 
2200, 
25,
1, 1, 1, '2022-08-18 00:45:50', '2022-08-18 00:45:50', 2, 3);

INSERT INTO images (id, url, productID)
VALUES (6, '/img/productos/1656444097772-prodImg.jpg', 6);

INSERT INTO productsGenres (productID, genreID)
VALUES (6, 6);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Terry Pratcchett', 5, 6), ('657', 6, 6);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (25, 'The hobbit soundtrack', 
'Soudtrack de la trilogía \"The Hobbit\"', 
200, 
0,
1, 1, 1, '2022-08-10 00:40:50', '2022-08-18 00:40:50', 3, 9);

INSERT INTO images (id, url, productID)
VALUES (25, '/img/productos/1656452229163-prodImg.jfif', 25);

INSERT INTO productsGenres ( productID, genreID)
VALUES (25, 2);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('140', 12, 25);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (26, 'Fantasy Music by Adrian von Ziegler', '2 horas dela mejor música de fantasía por Adrian von Ziegler ', 350 , 5,
1, 1, 0, '2022-06-28 21:39:13', '2022-06-28 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (26, '/img/productos/1656452353679-prodImg.PNG', 26);

INSERT INTO productsGenres ( productID, genreID)
VALUES (26, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('180', 12 , 26 );


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (27, 'Final Fantasy Soundtrack original', 
'Soundtrack original compuesto por Yoko Shimomura.  2016', 
280, 
5,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (27, '/img/productos/1656452471675-prodImg.jpg', 27);

INSERT INTO productsGenres ( productID, genreID)
VALUES (27, 1), (27, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('136', 12 , 27 );

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (28, 'Las crónicas de Narnia Soundtrack', 
'Ejecutado por Global Stage Orchestra', 
120, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (28, '/img/productos/1656452538595-prodImg.jpg', 28);

INSERT INTO productsGenres ( productID, genreID)
VALUES (28, 1);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('90', 12, 28);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (29, 'KINGDOM Majestic Fantasy Orchestral Music', 
'Fantasy  & Adventure Fantasy Music.\r\nEsta mezcla presenta pistas aventureras, asombrosas, dramáticas y heroicas, que aportan energía y vida a cualquier narrativa de búsqueda y descubrimiento.', 
159, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (29, '/img/productos/1656452761763-prodImg.PNG', 29);

INSERT INTO productsGenres ( productID, genreID)
VALUES (29, 2);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('112', 12, 29);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (30, 'Willy Wonka & the Chocolate Factory ', 
'Clásico del cine. Willy Wonka, un famoso fabricante de dulces ofrece suministrar dulces de por vida a los cinco ganadores que encuentren el tesoro. 1971', 
1200, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 8);

INSERT INTO images (id, url, productID)
VALUES (30, '/img/productos/1656453041923-prodImg.jpg', 30);

INSERT INTO productsGenres ( productID, genreID)
VALUES (30, 1), (30, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('100', 11, 30);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (31, 'Hocus Pocus 2', 
'Sarah Jessica Parker, Bette Midler y Kathy Najimy regresan en la segunda entrega de El retorno de las brujas. Disney, 2022\r\nDirigida por Anne Fletcher, la secuela contará también con el regreso de Doug Jones como Billy Butcherson, el hombre muerto que las hermanas Sanderson resucitaron en la primera entrega. Aunque, en un principio su propósito era atacar a los jóvenes protagonistas, finalmente se une a ellos en su intento por evitar los planes de las brujas.', 
'1740',
5, 
1, 1, 1, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 8);

INSERT INTO images (id, url, productID)
VALUES (31, '/img/productos/1656453088837-prodImg.jpg', 31);

INSERT INTO productsGenres ( productID, genreID)
VALUES (31, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('95', 11, 31);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (32, 'The Dark Crystal: Age of Resistance', 
'Hace mil años, el cristal encantado fue partido, iniciando una era de caos, dominada por una raza maligna. El huérfano Jen, creado por hechiceros pacíficos, va en busca del pedazo perdido del cristal para restaurar el equilibrio del universo. ', 
'1800',
10, 
1, 1, 0, '2022-06-29 21:49:15', '2022-06-29 21:49:15',3, 8);

INSERT INTO images (id, url, productID)
VALUES (32, '/img/productos/1656453207011-prodImg.jpg', 32);

INSERT INTO productsGenres ( productID, genreID)
VALUES (32, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('102', 11, 32);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (33, 'Spellbound', 
'Spellbound es una película de fantasía musical animada por computadora dirigida por Vicky Jenson. Su música fue compuesta por Alan Menken. La película fue producida por Skydance Animation y Skydance Animation Madrid. 2022', 
'1200',
5, 
1, 1, 0, '2022-06-29 21:49:15', '2022-06-29 21:49:15', 3, 8);

INSERT INTO images (id, url, productID)
VALUES (33, '/img/productos/1656453300750-prodImg.jpg', 33);

INSERT INTO productsGenres ( productID, genreID)
VALUES (33, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('110', 11, 33);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (34, 'A Fairy Tale After All', 
'A Fairy Tale After All es una película de fantasía musical estadounidense de 2022 producida, escrita y dirigida por Erik Peter Carlson. La película está protagonizada por Emily Shenaut, Brian Hull, Gabriel Burrafato, Bridget Winder, Timothy N. Kopacz y Anna Brisbin.', 
'1100',
0, 
1, 1, 1, '2022-06-29 21:49:15', '2022-06-29 21:49:15', 3, 8);

INSERT INTO images (id, url, productID)
VALUES (34, '/img/productos/1656453406967-prodImg.png', 34);

INSERT INTO productsGenres ( productID, genreID)
VALUES (34, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('87', 11, 34);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (35, 'Bastion', 
'Bastion es un videojuego de rol de acción (o ARPG) elaborado por el desarrollador independiente Supergiant Games. En este juego, el jugador controla al protagonista, nombrado \"the Kid\", mientras se mueve entre plataformas flotantes a través de un mundo fantasioso al tiempo que combate varios tipos de enemigos que se interponen en su camino.', 
'200',
50, 
1, 1, 1, 1, 2);

INSERT INTO images (id, url, productID)
VALUES (35, '/img/productos/1656456279212-prodImg.jpg', 35);

INSERT INTO productsGenres ( productID, genreID)
VALUES (35, 1);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Supergiant Games', 3, 35);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('2010-07-20', 4, 35);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (36, 'Hades', 
'Hades es un juego de rol de acción roguelike desarrollado y publicado por Supergiant Games. Los jugadores controlan a Zagreus, el hijo de Hades, mientras intenta escapar del Inframundo para llegar al Monte Olimpo, en ocasiones con la ayuda de los obsequios que le otorgan los otros olímpicos. Cada carrera desafía al jugador a través de una serie aleatoria de habitaciones pobladas de enemigos y recompensas.', 
'270',
0, 
1, 1, 1, 1, 2);

INSERT INTO images (id, url, productID)
VALUES (36, '/img/productos/1656456410469-prodImg.png', 36);

INSERT INTO productsGenres ( productID, genreID)
VALUES (36, 5);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Supergiant Games', 3, 36);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('2019-10-12', 4, 36);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (37, 'Stardew Valley', 
'Stardew Valley es un videojuego indie de simulación de granja desarrollado por Eric \"ConcernedApe\" Barone. En Stardew Valley, el jugador toma el rol de un personaje que se encuentra atrapado en un trabajo de oficina, para escapar de él se va a vivir a la granja de su abuelo, la cual se encuentra en ruinas. La granja se encuentra ubicada en un lugar llamado Pueblo Pelícano. El jugador controla las acciones del personaje, utilizando energía al realizar acciones como regar los cultivos o minar, entre muchos otros. El tiempo y la energía utilizada para realizar las acciones dependiendo del nivel que el personaje cuente en dichas actividades, las cuales aumentan con el tiempo al repetir la tarea una y otra vez.', 
'150',
0, 
1, 1, 1, 1, 2);

INSERT INTO images (id, url, productID)
VALUES (37, '/img/productos/1656456496210-prodImg.jpg', 37);

INSERT INTO productsGenres ( productID, genreID)
VALUES (37, 4);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Concerned Ape', 3, 37);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('2016-02-26', 4, 37);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (38, 'Alquimistas', 
'¿Qué pasará si mezclamos pluma de cuervo con sapo? ¿Y si mezclamos raíz de mandrágora con escorpión? A lo largo de seis rondas, los jugadores, convertidos en alquimistas, intentarán ganar prestigio descubriendo las propiedades mágicas de sus ingredientes. Alquimistas, además, incorpora una gran novedad, una app para el móvil que da a los jugadores el resultado de sus combinaciones de ingredientes.', 
'11000',
20, 
1, 1, 0, 1, 1);

INSERT INTO images (id, url, productID)
VALUES (38, '/img/productos/1656456616950-prodImg.jpg', 38);

INSERT INTO productsGenres ( productID, genreID)
VALUES (38, 2);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('4', 1, 38);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('13', 2, 38);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (39, 'Munchkin', 
'Munchkin es un juego de cartas de rol diseñado por Steve Jackson e ilustrado por John Kovalic para Steve Jackson Games. El lema que resume el objetivo del juego es Mata a los monstruos, roba el tesoro, apuñala a tus amigos.', 
'3000',
0, 
1, 1, 0, 1, 1);

INSERT INTO images (id, url, productID)
VALUES (39, '/img/productos/1656457045469-prodImg.jpg', 39);

INSERT INTO productsGenres ( productID, genreID)
VALUES (39, 3);

INSERT INTO productsGenres ( productID, genreID)
VALUES (39, 2);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('6', 1, 39);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('10', 2, 39);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (40, 'Dungeons & Dragons: Wrath of Ashardalon', 
'Las tierras alrededor del Pico Fuegotormentoso se han vuelto peligrosas. Los pocos pueblos cerca del volcán han sido acosados por bandas merodeadoras de orcos y kóbold, y horrores más peligrosos acechan en las sombras. Lo peor de todo, un nuevo villano tiene su hogar en la montaña - el terrible dragón rojo Ashardalon ha convertido el volcán en su guarida.', 
'20000',
40, 
1, 1, 0, 1, 1);

INSERT INTO images (id, url, productID)
VALUES (40, '/img/productos/1656457101125-prodImg.jpeg', 40);

INSERT INTO productsGenres ( productID, genreID)
VALUES (40, 1);

INSERT INTO productsGenres ( productID, genreID)
VALUES (40, 2);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('5', 1, 40);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('12', 2, 40);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (41, 'The Witcher 3: Wild Hunt', 
'The Witcher 3: Wild Hunt es un videojuego de rol desarrollado y publicado por la compañía polaca CD Projekt RED. El juego es la tercera parte de la saga, precedido por The Witcher y The Witcher 2: Assassins of Kings, las cuales están basadas en la saga literaria de Geralt de Rivia escrita por Andrzej Sapkowski. Es un juego de perspectiva en tercera persona, el jugador controla al protagonista Geralt de Rivia, un cazador de monstruos conocido como Lobo Blanco, es un brujo, el cual emprende un largo viaje a través de Los reinos del norte. Ellx jugadorx lucha contra el peligroso mundo mediante magia y espadas, mientras interactúa con los NPC y completa tanto misiones secundarias como la misión principal de la historia, La cual es encontrar a la hija adoptiva de Geralt, Ciri, y detener la profecía del invierno blanco.', 
'1000',
30, 
1, 1, 1, 1, 2);

INSERT INTO images (id, url, productID)
VALUES (41, '/img/productos/1656456913782-prodImg.jpeg', 41);

INSERT INTO productsGenres ( productID, genreID)
VALUES (41, 2);

INSERT INTO productsGenres ( productID, genreID)
VALUES (41, 5);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('CD Projekt', 3, 41);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('2015-05-18', 4, 41);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (42, 'Pyre', 
'Pyre es un RPG por equipos de los creadores de Bastion y Transistor, Supergiant Games. Conduce a la libertad a una banda de exiliados en una serie de competiciones místicas en el modo campaña o desafía a un amigo a un frenético combate ritual en el modo enfrentamiento.', 
'150',
25, 
1, 1, 1, 1, 2);

INSERT INTO images (id, url, productID)
VALUES (42, '/img/productos/1656456671241-prodImg.jpg', 42);

INSERT INTO productsGenres ( productID, genreID)
VALUES (42, 6);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('Supergiant Games', 3, 42);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('2017-07-25', 4, 42);



INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (43, 'Llavero Plastico Totoro', 
'Llavero plástico de alta calidad con diseño de Totoro. No te lo pierdas!',
300, 
10,
1, 1, 1, 4, 7);

INSERT INTO images (id, url, productID)
VALUES (43, '/img/productos/1656458796584-prodImg.jpg', 43);

INSERT INTO productsGenres ( productID, genreID)
VALUES (43, 3);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (44, 'Figura The Witcher', 
'Figura de 7 pulgadas coleccionable con Accesorios y base. En esta oportunidad, traemos para ti a Wild Hunt. No te la pierdas!',
10000, 
10,
1, 1, 1, 4, 6);

INSERT INTO images (id, url, productID)
VALUES (44, '/img/productos/1656458939909-prodImg.jpg', 44);

INSERT INTO productsGenres ( productID, genreID)
VALUES (44, 2);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (45, 'Llavero coleccionable WOW alianza', 
'Llavero plastico de alta calidad con diseño de Alianza, perteneciente al popular videojuego World of Warcraft.',
300, 
5,
1, 1, 1, 4, 7);

INSERT INTO images (id, url, productID)
VALUES (45, '/img/productos/1656458977582-prodImg.jpg', 45);

INSERT INTO productsGenres ( productID, genreID)
VALUES (45, 2);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (46, 'Medias Harry Potter', 
'Medias tematicas de Gryffindor',
700, 
5,
1, 1, 1, 4, 7);

INSERT INTO images (id, url, productID)
VALUES (46, '/img/productos/1656459052016-prodImg.jpg', 46);

INSERT INTO productsGenres ( productID, genreID)
VALUES (46, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('M', 10, 46);



INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (47, 'Anillo Harry Potter', 
'Anillo de Harry Potter con la palabra \"ALWAYS\" y el simbolo de las reliquias de la muerte.',
10000, 
10,
1, 1, 1, 4, 7);

INSERT INTO images (id, url, productID)
VALUES (47, '/img/productos/1656460464366-prodImg.jpg', 47);

INSERT INTO productsGenres ( productID, genreID)
VALUES (47, 3);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (48, 'Funko POP Eivor', 
'Figura Original Funko Pop Games de la Coleccion Assassins Creed Valhalla Numero 776 Eivor, tal como se lo puede apreciar en el popular Videojuego',
6000, 
5,
1, 1, 1, 4, 6);

INSERT INTO images (id, url, productID)
VALUES (48, '/img/productos/1656460913482-prodImg.jpg', 48);

INSERT INTO productsGenres ( productID, genreID)
VALUES (48, 2);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, categoryID, subcategoryID )
VALUES (49, 'Peluche Chimuelo', 
'Peluche de Chimuelo, de Como Entrenar a tu Dragon',
5000, 
5,
1, 1, 1, 4, 7);

INSERT INTO images (id, url, productID)
VALUES (49, '/img/productos/1656463365597-prodImg.jpg', 49);

INSERT INTO productsGenres ( productID, genreID)
VALUES (49, 3);