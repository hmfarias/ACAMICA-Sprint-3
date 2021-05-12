-- Obtener todas las bandas
SELECT * FROM bandas.bandas;

-- obtener todas las bandas de Argentina
SELECT * FROM bandas.bandas
WHERE bandas.pais = "Argentina";

-- obtener una banda solista (es decir con integrantes = 1) no devuelve nada en este caso
SELECT * FROM bandas.bandas
WHERE bandas.integrantes = 1;

-- obtener todas las canciones publicadas despues del 1980
SELECT * FROM bandas.canciones
WHERE YEAR(canciones.fecha_publicacion) >= 1980;

-- obtener todas las canciones que duren mas de 3 minutos
SELECT * FROM bandas.canciones
WHERE canciones.duracion > 180;

-- obtener todos los albumes
SELECT * FROM bandas.albumes;
