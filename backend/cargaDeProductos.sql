
use oraculaDB; 

Delete from images where id > 0;
Delete from productsGenres where id > 0; 
Delete from attributesProducts where id > 0; 
Delete from products where id > 0; 

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
VALUES (25, 8);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('140', 24, 25);


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (26, 'Fantasy Music by Adrian von Ziegler', '2 horas dela mejor música de fantasía por Adrian von Ziegler ', 350 , 5,
1, 1, 0, '2022-06-28 21:39:13', '2022-06-28 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (26, '/img/productos/1656452353679-prodImg.PNG', 26);

INSERT INTO productsGenres ( productID, genreID)
VALUES (26, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('180', 24 , 26 );


INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (27, 'Final Fantasy Soundtrack original', 
'Soundtrack original compuesto por Yoko Shimomura.  2016', 
280, 
5,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (27, '/img/productos/1656452471675-prodImg.jpg', 27);

INSERT INTO productsGenres ( productID, genreID)
VALUES (27, 7), (27, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('136', 24 , 26 );

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (28, 'Las crónicas de Narnia Soundtrack', 
'Ejecutado por Global Stage Orchestra', 
120, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (28, '/img/productos/1656452538595-prodImg.jpg', 28);

INSERT INTO productsGenres ( productID, genreID)
VALUES (28, 7);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('90', 24, 28);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (29, 'KINGDOM Majestic Fantasy Orchestral Music', 
'Fantasy  & Adventure Fantasy Music.\r\nEsta mezcla presenta pistas aventureras, asombrosas, dramáticas y heroicas, que aportan energía y vida a cualquier narrativa de búsqueda y descubrimiento.', 
159, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 9);

INSERT INTO images (id, url, productID)
VALUES (29, '/img/productos/1656452761763-prodImg.PNG', 29);

INSERT INTO productsGenres ( productID, genreID)
VALUES (29, 8);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('112', 24, 29);

INSERT INTO products (id, nombre, descripcion, precio, descuento, esNovedad, esDestacado, esMagicPass, createdAt, updatedAt, categoryID, subcategoryID )
VALUES (30, 'Willy Wonka & the Chocolate Factory ', 
'Clásico del cine. Willy Wonka, un famoso fabricante de dulces ofrece suministrar dulces de por vida a los cinco ganadores que encuentren el tesoro. 1971', 
1200, 
10,
1, 1, 0, '2022-06-29 21:39:13', '2022-06-29 21:39:13',3, 8);

INSERT INTO images (id, url, productID)
VALUES (30, '/img/productos/1656453041923-prodImg.jpg', 30);

INSERT INTO productsGenres ( productID, genreID)
VALUES (30, 7), (30, 3);

INSERT INTO attributesProducts (valor, attributeID, productID)
VALUES ('100', 23, 30);

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
VALUES ('95', 23, 31);

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
VALUES ('102', 23, 32);

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
VALUES ('110', 23, 33);

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
VALUES ('87', 23, 34);