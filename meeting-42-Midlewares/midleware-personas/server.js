const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const server = express();
server.use(express.json());
server.use(compression());
server.use(helmet());
const PORT = 3000;
const PERSONAS = [
    { id: 1, nombre: 'Pepe', email: 'pepe@nada.com' },
    { id: 2, nombre: 'Hugo', email: 'hugo@nada.com' },
    { id: 3, nombre: 'Juan', email: 'juan@nada.com' },
]

// Validar los tipos de datos ingresados al Endpoint a través de un Middleware
function validarTipoDatoId(req, res, next) {
    const isANumber = !isNaN(parseInt(req.params.id));
    if (isANumber) {
        next();
    } else {
        res.status(400).json({"error":'Id debe ser un número'});
    }
}

server.get('/personas/id/:id',validarTipoDatoId,(req, res) => {
    const idBusqueda = req.params.id;
    const estudianteEncontrado = PERSONAS.find(per => per.id == idBusqueda);
    (!estudianteEncontrado) ? res.status(400).json({ 'error': 'Error' }) : res.status(200).json(estudianteEncontrado);
});

server.get('/personas/nombre/:nombre', (req, res) => {
    const nombreBusqueda = req.params.nombre.toLowerCase();
    const estudianteEncontrado = PERSONAS.find(per => per.nombre.toLowerCase() == nombreBusqueda);
    (!estudianteEncontrado) ? res.status(400).json({ 'error': 'Error' }) : res.status(200).json(estudianteEncontrado);
});

server.listen(PORT, () => {
    console.log('El servidor a inicializado exitosamente');
});
