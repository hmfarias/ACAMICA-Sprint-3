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
const CELULARES = [
    {
        id: 1,
        marca: "Iphone",
        modelo: "X",
        precio: 1200,
    },
    {
        id: 2,
        marca: "Iphone",
        modelo: "12",
        precio: 1500,
    },
    {
        id: 3,
        marca: "Samsung",
        modelo: "Note 10",
        precio: 1100,
    },
    {
        id: 4,
        marca: "Samsung",
        modelo: "S10",
        precio: 400,
    },
    {
        id: 5,
        marca: "Motorola",
        modelo: "G-30",
        precio: 450,
    },
];

//4. escribir rutas o endpoints
//localhost:3000/celulares
server.get("/celulares", (req, res) => {
    //localhost:3000/celulares?precio=500
    console.log(req.query.precio);
    if (req.query.precio) {
        const parametroPrecio = req.query.precio;
        const celularesPrecio = CELULARES.filter(
            (cel) => cel.precio < parametroPrecio
        );
        res.status(200);
        res.json(celularesPrecio);
    } else {
        res.status(200);
        res.json(CELULARES);
    }
});

//localhost:3000/celulares/precio/ALGUNPRECIO
server.get("/celulares/precio/:precioParam", (req, res) => {
    const parametroPrecio = req.params.precioParam;
    console.log(parametroPrecio);
    const celularesPrecio = CELULARES.filter(
        (cel) => cel.precio < parametroPrecio
    );

    res.status(200);
    res.json(celularesPrecio);
});

//POST
//localhost:3000/celulares/
server.post("/celulares", (req, res) => {
    //validar body
    if (!req.body.marca || !req.body.modelo || !req.body.precio) {
        res.status(400);
        res.json({ error: "marca, modelo y precio son obligatorios" });
    } else {
        const nuevoCelular = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            precio: req.body.precio,
            id: CELULARES.length + 1,
        };
        CELULARES.push(nuevoCelular);
        res.status(200);
        res.json(nuevoCelular);
    }
});

//put
//localhost:3000/celulares/ALGUNID
server.put("/celulares/:id", (req, res) => {
    CELULARES.forEach((cel) => {
        if (cel.id == req.params.id) {
            cel.marca = !req.body.marca ? cel.marca : req.body.marca;
            cel.modelo = !req.body.modelo ? cel.modelo : req.body.modelo;
            cel.precio = !req.body.precio ? est.precio : req.body.precio;
        }
    });
    res.status(200);
    res.json({});
});

//DELETE
//localhost:3000/celulares/ALGUNID
server.delete("/celulares/:id", (req, res) => {
    const index = CELULARES.findIndex((cel) => cel.id == req.params.id);
    if (index >= 0) { //found item
        const arrEliminado = CELULARES.splice(index, 1);
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
