//1. importar express y demas librerias
const express = require("express");
const compression = require("compression");

//cosnt otralibreria = require('otralibreria');

//1.2 recomendaciones seguridad importar librerias de prevencion
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

//2. crear la instacia de express
const server = express();

//3. agregar middlewares (los vamos a ver luego) globales
server.use(express.json()); // este middleware nos convierte el json del body en objeto de js
server.use(express.urlencoded({ extended: true }));

// 3.1 crear middlewares propios de nuestra API

// middleware global para loggear toda peticion

server.use(compression());

//usar helmet como middleware global
//server.use(helmet());

// definir un limiter

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "muchas peticiones por ahora espere un minuto",
});

//server.use(limiter);

//deshabilitar el xpowered-by

server.disable("x-powered-by");

//3.1 definir constantes
const PORT = 3000;
//localhost -> 127.0.0.1:3000
const USERS = [
  {
    id: 1,
    username: "danyjavierb",
    password: "pass123",
    nombre: "Dany Bautista",
    pais: "colombia",
  },
  {
    id: 2,
    username: "andres2021",
    password: "malpassword",
    nombre: "Andres Pezza",
    pais: "argentina",
  },
];

server.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);
  const usuarioLogueado = USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (!usuarioLogueado) {
    res.status(401).json({ error: "username o password incorrectos" });
  } else {
    res
      .status(200)
      .json({ nombre: usuarioLogueado.nombre, pais: usuarioLogueado.pais });
  }
});

//5. levantar el servidor
server.listen(PORT, () => {
  console.log(`se ha iniciado el servidor en el puerto ${PORT}`);
});
