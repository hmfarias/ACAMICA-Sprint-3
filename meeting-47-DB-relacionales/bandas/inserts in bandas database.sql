-- La Beriso --
INSERT INTO bandas.bandas (nombre, integrantes, fecha_inicio, pais)
VALUES ("La Beriso", 8, "1998-06-10", "Argentina");

INSERT INTO bandas.albumes (nombre_album, fecha_publicacion, bandas_id)
VALUES ("Historias","2014-01-01", 1);

INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Madrugada", 282, "2014-01-01", 1, 1);
INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Traicionero", 300, "2014-01-01", 1, 1);

-- Queen --
INSERT INTO bandas.bandas (nombre, integrantes, fecha_inicio, pais)
VALUES ("Queen", 4, "1971-01-01", "Gran Bretaña");

INSERT INTO bandas.albumes (nombre_album, fecha_publicacion, bandas_id)
VALUES ("A Night at the Opera","1975-01-01", 2);

INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Love of my life", 217, "1975-01-01", 2, 2);
INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Bohemian Rapsody", 354, "1975-01-01", 2, 2);

-- The Beatles --
INSERT INTO bandas.bandas (nombre, integrantes, fecha_inicio, fecha_separacion, pais)
VALUES ("The Beatles", 4, "1960-01-01", "1970-01-01","Gran Bretaña");

INSERT INTO bandas.albumes (nombre_album, fecha_publicacion, bandas_id)
VALUES ("Help","1965-01-01", 3);

INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Help!", 140, "1965-01-01", 3, 3);
INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Yesterday", 126, "1965-01-01", 3, 3);

-- The Rollings --
INSERT INTO bandas.bandas (nombre, integrantes, fecha_inicio, pais)
VALUES ("The Rolling Stones", 4, "1962-04-01","Gran Bretaña");

INSERT INTO bandas.albumes (nombre_album, fecha_publicacion, bandas_id)
VALUES ("Hot Rocks","1971-01-01", 4);

INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Time is on my side!", 180, "1971-01-01", 4, 4);
INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("As tears go by", 225, "1965-01-01", 4, 4);

-- Aerosmith --
INSERT INTO bandas.bandas (nombre, integrantes, fecha_inicio, pais)
VALUES ("Aerosmith", 5, "1970-01-01","Estados Unidos");

INSERT INTO bandas.albumes (nombre_album, fecha_publicacion, bandas_id)
VALUES ("Get a Grip","1993-01-01", 5);

INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Crazy", 317, "1993-01-01", 5, 5);
INSERT INTO bandas.canciones (nombre, duracion, fecha_publicacion, bandas_id, albumes_id)
VALUES ("Livin On The Edge", 381, "1993-01-01", 5, 5);

