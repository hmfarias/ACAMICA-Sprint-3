//==========================================================================
//1. importar express y demas librerias
//==========================================================================
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { User } = require("./models/Users");
const { Plato } = require("./models/Platos");

//==========================================================================
//2. crear la instacia de express
//==========================================================================
const app = express();

//==========================================================================
//3. agregar middlewares globales
//==========================================================================

const rateLimitPolicy = rateLimit({
	message: "intente de nuevo mas tarde",
	max: 10,
	windowMs: 120 * 60 * 1000,
});

//==========================================================================
// 3.1 crear middlewares propios de nuestra API
//==========================================================================
const {
	validateAdmin,
	validatePlateExists,
	validatePlateBody,
	validatePlateNotExists,
} = require("./middlewares/index.js");

//==========================================================================
// usar las librerias
//==========================================================================
//mongo 1. proteger todos los endpoints menos el de login usando express-jwt como middleware global
// por nada en la vida expongan esta cadena NADAAAAA!!!!
const secretJWT = "poneralgosupercompicadoconnumerosycaracteres123+5";
app.use(
	expressJwt({
		secret: secretJWT,
		algorithms: ["HS256"],
	}).unless({ path: ["/login"] })
);
app.use(express.json()); // este middleware nos convierte el json del body en objeto de js
app.use(helmet());
app.use(compression());

//==========================================================================
//ENDPOINTS
//==========================================================================
//mongo 2. escribir el endpoint de login
app.post("/login", async (req, res) => {
	const emailPost = req.body.email;
	const passwordPost = req.body.password;
	const usuarioValidado = await User.findOne({
		email: emailPost,
		password: passwordPost,
	});

	if (!usuarioValidado) {
		res.status(401).json({
			error: "usuario o contrasena invalida",
		});
	} else {
		//mongo 3. crear el token
		const token = jwt.sign(
			{
				name: usuarioValidado.name,
				lastname: usuarioValidado.lastname,
				email: usuarioValidado.email,
				hobbies: usuarioValidado.hobbies,
				admin: usuarioValidado.admin,
			},
			secretJWT,
			{ expiresIn: "60m" }
		);
		res.status(200).json({ token });
	}
});

//mongo 4. escribir endpoints el resto
//PRUEBA INFO SEGURA
app.get("/seguro", validateAdmin, (req, res) => {
	res.json({
		data: `data muy segura a nombre de ${req.user.name} ${req.user.lastname} - email: ${req.user.email}`,
	});
});

app.get("/platos", (req, res) => {
	(async function listarPlatos() {
		const platos = await Plato.find();
		res.status(200).json(platos);
	})();
});

//POST NUEVO PLATO
//localhost:3000/platos
app.post("/platos", validatePlateBody, validatePlateExists, (req, res) => {
	const plato = {
		plato: req.body.plato,
		precio: req.body.precio,
		tipoPlato: req.body.tipoPlato,
	};
	const newPlato = new Plato(plato);
	newPlato.save();
	res.status(200).json(newPlato);
});

//PUT
//localhost:3000/platos
app.put("/platos/:id", validatePlateNotExists, async (req, res) => {
	const platePutId = req.params.id;
	try {
		const plateExists = await Plato.findOne({
			_id: platePutId,
		});
		plateExists.plato = !req.body.plato ? plateExists.plato : req.body.plato;
		plateExists.precio = !req.body.precio
			? plateExists.precio
			: req.body.precio;
		plateExists.tipoPlato = !req.body.tipoPlato
			? plateExists.tipoPlato
			: req.body.tipoPlato;
		plateExists.save();
		res.status(200).json(plateExists);
	} catch (error) {
		console.log(error);
	}
});

//DELETE
//localhost:3000/platos
app.delete("/platos/:id", validatePlateNotExists, async (req, res) => {
	const idPlateDelete = req.params.id;
	try {
		await Plato.deleteOne({
			_id: idPlateDelete,
		});
		res.status(200).json(idPlateDelete);
	} catch (error) {
		console.log(error);
	}
});

//==========================================================================
//5. levantar el servidor
//==========================================================================
app.listen(3000, () => {
	console.log("servidor iniciado");
});
