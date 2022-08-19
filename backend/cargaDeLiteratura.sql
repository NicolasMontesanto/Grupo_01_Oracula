
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

