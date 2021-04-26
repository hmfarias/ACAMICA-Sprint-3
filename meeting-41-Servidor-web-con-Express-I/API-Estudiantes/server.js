//1. importar express y demas librerias
const express = require("express");
//cosnt otralibreria = require('otralibreria');
//2. crear la instacia de express
const server = express();
//3. agregar middlewares (los vamos a ver luego) globales
server.use(express.json()); // este middleware nos convierte el json del body en objeto de js
//3.1 definir constantes
const PORT = 3000;
//localhost -> 127.0.0.1:3000
const ESTUDIANTES = [
  {
    id: 1,
    nombre: "Marcelo",
    pais: "Argentina",
    
  },
  {
    id: 2,
    nombre: "Federico",
    pais: "Argentina",
  },
  {
    id: 3,
    nombre: "André",
    pais: "Argentina",
  },
  {
    id: 4,
    nombre: "Andres",
    pais: "Argentina",
  },
  {
    id: 5,
    nombre: "Dany",
    pais: "Colombia",
  },
];
//4. escribir rutas o endpoints
//localhost:3000/estudiantes
server.get("/estudiantes", (req, res) => {
  //localhost:3000/estudiantes?pais=Argentina
  console.log(req.query.pais);
  if (req.query.pais) {
    const parametroPais = req.query.pais;
    //const estudiantesPais = ESTUDIANTES.filter (est => est.pais.toLowerCase() == parametroPais.toLowerCase())
    const estudiantesPais = [];
    ESTUDIANTES.forEach((est) => {
      if (est.pais == parametroPais) {
        estudiantesPais.push(est);
      }
    });
    res.status(200);
    res.json(estudiantesPais);
  } else {
    res.status(200);
    res.json(ESTUDIANTES);
  }                                               
});
//localhost:3000/estudiantes/pais/ALGUNPAIS
server.get("/estudiantes/pais/:paisParam", (req, res) => {
  const parametroPais = req.params.paisParam;
  console.log(parametroPais);
  //const estudiantesPais = ESTUDIANTES.filter (est => est.pais.toLowerCase() == parametroPais.toLowerCase())
  const estudiantesPais = [];
  ESTUDIANTES.forEach((est) => {
    if (est.pais == parametroPais) {
      estudiantesPais.push(est);
    }
  });
  res.status(200);
  res.json(estudiantesPais);
});
server.post("/estudiantes", (req, res) => {
    //validar body
  if (!req.body.nombre || !req.body.pais) {
    res.status(400);
    res.json({ error: "nombre y pais son obligatorios" });
  } else {
    const nuevoEstudiante = {
      nombre: req.body.nombre,
      pais: req.body.pais,
      id: ESTUDIANTES.length + 1,
    };
    ESTUDIANTES.push(nuevoEstudiante);
    res.status(200);
    res.json(nuevoEstudiante);
  }
});
//put
server.put("/estudiantes/:id", (req,res)=> {
    ESTUDIANTES.forEach(est => {
      if ( est.id == req.params.id) {
          console.log(est.id);
          console.log(est.nombre);
          console.log(est.pais);
          est.nombre = !req.body.nombre ?  est.nombre : req.body.nombre ;
          est.pais = !req.body.pais ? est.pais : req.body.pais;
          console.log(est.nombre);
          console.log(est.pais);
        };
    });
    res.status(200);
    res.json({ESTUDIANTES});
})

//delete
server.delete('/estudiantes/:id', (req,res) => {
  const index = ESTUDIANTES.findIndex((cel) => cel.id == req.params.id);
  if (index >= 0) { //found item
      const arrEliminado = ESTUDIANTES.splice(index, 1);
      res.status(200);
      res.json(arrEliminado);
  } else {
      res.status(400);
      res.json({ error: "elemento no encontrado en la base de datos" });
  }
});

//5. levantar el servidor
server.listen(PORT, () => {
  console.log(`se ha iniciado el servidor en el puerto ${PORT}`);
});