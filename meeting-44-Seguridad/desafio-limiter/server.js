//==========================================================================
//1. importar express y demas librerias
//==========================================================================
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
// const {logger, validarArray, validarBodyAutor, validarBodyLibro, existeAutor, existeLibro} = require("./middlewares");
//cosnt otralibreria = require('otralibreria');

const limiter = limiterCustom();

//==========================================================================
//2. crear la instacia de express
//==========================================================================
const server = express();

//==========================================================================
//3. agregar middlewares globales
//==========================================================================
server.use(express.json()); // este middleware nos convierte el json del body en objeto de js

//==========================================================================
// 3.1 crear middlewares propios de nuestra API
//==========================================================================

//GLOBALES-----------------------------------------------------------------
// middleware global para loggear toda peticion
function logger(req, res, next) {
	// const method = req.method;
	// const path = req.path;
	// const query = req.query;
	// const params = req.params;
	// const body = req.body;
	// destructuring
	const { body, method, path, query, params } = req;
	console.log(` 
    ${method} - 
    ${path} - 
    ${JSON.stringify(body)} - 
    ${JSON.stringify(query)} - 
    ${JSON.stringify(params)}
    `);
	next();
}

// VERIFICAR SI HAY DATOS EN EL ARRAY
function validarArray(req, res, next) {
	!AUTORES || AUTORES.length === 0
		? res.status(400).json({ error: `no existen autores para mostrar` })
		: next();
}

function limiterCustom() {
	options = {
		timeLimit: 0.25 * 60 * 1000, // tiempo en milisegundos durante el cual guardo las req
		// minutos * 60 * 1000 - esta puesto en 15 segundos para probar
		maxRequest: 3, // numero de requests antes de mandar Status 429 - esta puesto en 3
		message: "Demasiadas peticiones. Intente de nuevo mas tarde",
		statusCode: 429, // 429 status = Too Many Requests
	};

	// para guardar los datos de límite de velocidad y manejar los contadores
	options.timeCountersManage = new timeCountersManage(options.timeLimit);

	function rateLimit(req, res, next) {
		const key = req.ip;
		options.timeCountersManage.increment(key, function (counterReqIP) {
			console.log(counterReqIP);
			counterReqIP > options.maxRequest
				? res.status(options.statusCode).json({ error: options.message })
				: next();
		});
	}

	return rateLimit;
}
//--------------------------
//calcula el siguiente momento de reset en base al timeLimit asignado
function nextReset(timeLimit) {
	const now = new Date(); //genera algo como: 2021-05-02T21:14:28.432Z
	console.log("Now time  : " + now);
	let nextResetTime = now.setMilliseconds(now.getMilliseconds() + timeLimit); //transforma todo a milisegundos despues de sumar el timeLimit.
	console.log("Next reset: " + now + timeLimit);
	return nextResetTime;
}

function timeCountersManage(timeLimit) {
	let countReqIP = {};
	let resetTime = nextReset(timeLimit);

	this.increment = function (key, callBack) {
		countReqIP[key] ? countReqIP[key]++ : (countReqIP[key] = 1);
		callBack(countReqIP[key]);
	};

	// reseteo el contador de request y asigno un nuevo timeLimit
	this.reset = function () {
		countReqIP = {};
		resetTime = nextReset(timeLimit);
	};

	//reset del contador de request cuando se llega al timeLimit
	const interval = setInterval(this.reset, timeLimit);
}

//MIDDLEWARES PARTICULARES-------------------------------------------------

//VALIDAR BODY PARA AUTOR al hacer un POST
function validarBodyAutor(req, res, next) {
	const msgError = [];
	!req.body.nombre && msgError.push("El nombre del autor es obligatorio");
	!req.body.apellido && msgError.push("El apellido del autor es obligatorio");
	!req.body.fechaDeNacimiento &&
		msgError.push("La fecha de nacimiento del autor es obligatoria");

	msgError.length > 0
		? res.status(400).json({ error: msgError.join(",") })
		: next();
}

//VALIDAR BODY PARA LIBRO al hacer un POST
function validarBodyLibro(req, res, next) {
	const msgError = [];
	!req.body.titulo && msgError.push("El titulo del libro es obligatorio");
	!req.body.descripcion &&
		msgError.push("La descripcion del libro es obligatoria");
	!req.body.anioPublicacion &&
		msgError.push("El año de publicación del libro es obligatorio");

	msgError.length > 0
		? res.status(400).json({ error: msgError.join(",") })
		: next();
}

//VALIDAR EXISTENCIA DEL AUTOR (GET POR ID / PUT / DELETE)
function existeAutor(req, res, next) {
	const autorId = req.params.id;
	const autorRespuesta = AUTORES.find((aut) => aut.id == autorId);
	!autorRespuesta
		? res.status(400).json({ error: `AUTOR con id ${autorId} no existe` })
		: next();
}

//VALIDAR EXISTENCIA DE UN LIBRO
function existeLibro(req, res, next) {
	const autorId = req.params.id;
	const libroID = req.params.idLibro;
	const libroRespuesta = AUTORES.find((aut) => aut.id == autorId).libros.find(
		(lib) => lib.id == libroID
	);
	!libroRespuesta
		? res.status(400).json({
				error: `El Autor con id ${autorId}, NO registra un libro con id ${libroID}`,
		  })
		: next();
}

//==========================================================================
// usar las librerias
//==========================================================================
server.use(compression());
// server.use(logger);
server.use(helmet());
server.use(validarArray);
server.use(limiter);

//==========================================================================
//3.2 definir constantes
//==========================================================================

const PORT = 3000;
//localhost -> 127.0.0.1:3000

const AUTORES = [
	{
		id: 1,
		nombre: "Jorge Luis",
		apellido: "Borges",
		fechaDeNacimiento: "24/08/1899",
		libros: [
			{
				id: 1,
				titulo: "Ficciones",
				descripcion: "Se trata de un de sus mas ...",
				anioPublicacion: 1944,
			},
			{
				id: 2,
				titulo: "El Aleph",
				descripcion: "Otra recopilacion de cuentos ...",
				anioPublicacion: 1949,
			},
		],
	},
	{
		id: 2,
		nombre: "Gabriel",
		apellido: "García Márquez",
		fechaDeNacimiento: "06/03/1927",
		libros: [
			{
				id: 1,
				titulo: "La Hojarasca",
				descripcion: "Se trata de un de sus mas ...",
				anioPublicacion: 1955,
			},
			{
				id: 2,
				titulo: "El amor en los tiempos de cólera",
				descripcion: "Otra recopilacion de cuentos ...",
				anioPublicacion: 1985,
			},
		],
	},
];

//4. escribir rutas o endpoints

//==========================================================================
//RUTAS AUTORES
//==========================================================================
//GET TODOS LOS AUTORES
//localhost:3000/autores
server.get("/autores", (req, res) => {
	res.status(200).json(AUTORES);
});

// GET AUTOR POR ID
// localhost:3000/autores/:algunID
server.get("/autores/:id", existeAutor, (req, res) => {
	const autorId = req.params.id;
	const autorRespuesta = AUTORES.find((aut) => aut.id == autorId);
	res.status(200).json(autorRespuesta);
});

//POST NUEVO AUTOR
//localhost:3000/autores
server.post("/autores", validarBodyAutor, (req, res) => {
	const nuevoAutor = {
		id: AUTORES.length + 1,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		fechaDeNacimiento: req.body.fechaDeNacimiento,
		libros: [],
	};

	AUTORES.push(nuevoAutor);
	res.status(200).json(nuevoAutor);
});

//PUT
//localhost:3000/autores/:algunId
server.put("/autores/:id", existeAutor, (req, res) => {
	AUTORES.forEach((aut) => {
		if (aut.id == req.params.id) {
			aut.nombre = !req.body.nombre ? aut.nombre : req.body.nombre;
			aut.apellido = !req.body.apellido ? aut.apellido : req.body.apellido;
			aut.fechaDeNacimiento = !req.body.pais
				? aut.pais
				: req.body.fechaDeNacimiento;
		}
	});
	res.status(200);
	res.json({});
});

//DELETE AUTOR PPOR ID
//localhost:3000/autores/:algunID
server.delete("/autores/:id", existeAutor, (req, res) => {
	const idBorrar = req.params.id;
	const idxEliminar = AUTORES.findIndex((aut) => aut.id == idBorrar);
	const eliminado = AUTORES.splice(idxEliminar, 1);
	res.status(200).json(eliminado);
});

//==========================================================================
//RUTAS LIBROS
//==========================================================================
//GET TODOS LOS LIBROS DE UN AUTOR
//localhost:3000/autores/:algunId/libros
server.get("/autores/:id/libros", existeAutor, (req, res) => {
	const autorId = req.params.id;
	const librosRespuesta = AUTORES.find((aut) => aut.id == autorId).libros;
	res.status(200).json(librosRespuesta);
});

//POST NUEVO LIBRO PARA UN AUTOR
//localhost:3000/autores/:algunId/libros
server.post(
	"/autores/:id/libros",
	existeAutor,
	validarBodyLibro,
	(req, res) => {
		const autorId = req.params.id;
		const librosRespuesta = AUTORES.find((aut) => aut.id == autorId).libros;
		const nuevoLibro = {
			id: librosRespuesta.length + 1,
			titulo: req.body.titulo,
			descripcion: req.body.descripcion,

			anioPublicacion: req.body.anioPublicacion,
		};

		librosRespuesta.push(nuevoLibro);
		//PREGUNTA PARA DANY: POR QUÉ FUNCIONA SIN LA SIGUIENTE LINEA?
		// AUTORES.find(aut => aut.id == autorId).libros = librosRespuesta;
		res.status(200).json(nuevoLibro);
	}
);

//GET ID DE LIBRO PARA UN ID DE AUTOR
//localhost:3000/autores/:algunId/libros/:algunIdLibro
server.get(
	"/autores/:id/libros/:idLibro",
	existeAutor,
	existeLibro,
	(req, res) => {
		const autorId = req.params.id;
		const libroID = req.params.idLibro;
		const libroRespuesta = AUTORES.find((aut) => aut.id == autorId).libros.find(
			(lib) => lib.id == libroID
		);
		res.status(200).json(libroRespuesta);
	}
);

//PUT EN UN ID DE LIBRO PARA UN ID DE AUTOR
//localhost:3000/autores/:algunId/libros/:algunIdLibro
server.put(
	"/autores/:id/libros/:idLibro",
	existeAutor,
	existeLibro,
	(req, res) => {
		const autorId = req.params.id;
		const libroId = req.params.idLibro;
		const libroResp = AUTORES.find((aut) => aut.id == autorId).libros.find(
			(lib) => lib.id == libroId
		);

		libroResp.titulo = !req.body.titulo ? libroResp.titulo : req.body.titulo;
		libroResp.descripcion = !req.body.descripcion
			? libroResp.descripcion
			: req.body.descripcion;
		libroResp.anioPublicacion = !req.body.anioPublicacion
			? libroResp.anioPublicacion
			: req.body.anioPublicacion;
		//PREGUNTA PARA DANY: POR QUÉ FUNCIONA SI ESTOY TRABAJANDO SOBRE libroResp y no sobre el objeto en si mismo?

		res.status(200).json({});
	}
);

//DELETE UN ID DE LIBRO PARA UN ID DE AUTOR
//localhost:3000/autores/:algunId/libros/:algunIdLibro
server.delete(
	"/autores/:id/libros/:idLibro",
	existeAutor,
	existeLibro,
	(req, res) => {
		const autorId = req.params.id;
		const libroIdBorrar = req.params.idLibro;
		const idxAutor = AUTORES.findIndex((aut) => aut.id == autorId);
		const idxLibroEliminar = AUTORES[idxAutor].libros.findIndex(
			(lib) => lib.id == libroIdBorrar
		);
		const eliminado = AUTORES[idxAutor].libros.splice(idxLibroEliminar, 1);
		res.status(200).json(eliminado);
	}
);

//==========================================================================
//5. levantar el servidor
//==========================================================================
server.listen(PORT, () => {
	console.log(`se ha iniciado el servidor en el puerto ${PORT}`);
});

// //put
