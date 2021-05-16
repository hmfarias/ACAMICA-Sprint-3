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
const { Banda } = require("./models/Bandas");
const db = require("./db/index");

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
const { response } = require("express");

//==========================================================================
// usar las librerias
//==========================================================================
//mongo 1. proteger todos los endpoints menos el de login usando express-jwt como middleware global
// por nada en la vida expongan esta cadena NADAAAAA!!!!
const secretJWT = "poneralgosupercompicadoconnumerosycaracteres123+5";
// app.use(
// 	expressJwt({
// 		secret: secretJWT,
// 		algorithms: ["HS256"],
// 	}).unless({ path: ["/login"] })
// );
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

//GET - TRAER TODAS LAS BANDAS
//localhost:3000/bandas
app.get("/bandas", async (req, res) => {
	try {
		const bandas = await db.query("SELECT * FROM bandas", {
			type: db.QueryTypes.SELECT,
		});
		res.status(200).json(bandas);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//GET - TRAER BANDA/S POR PALABRA CLAVE
//localhost:3000/bandas/buscar/unaPalabra
app.get("/bandas/buscar/:palabra", async (req, res) => {
	const palabra = req.params.palabra;
	try {
		const bandas = await db.query(
			"SELECT * FROM bandas WHERE nombre LIKE :palabraQuery",
			{
				type: db.QueryTypes.SELECT,
				replacements: { palabraQuery: `%${palabra}%` },
			}
		);
		res.status(200).json(bandas);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//GET - TRAER UNA BANDA POR ID
//localhost:3000/bandas/idBanda
app.get("/bandas/:idBanda", async (req, res) => {
	const idBanda = req.params.idBanda;
	try {
		const bandas = await db.query("SELECT * FROM bandas WHERE id = :id", {
			type: db.QueryTypes.SELECT,
			replacements: { id: idBanda },
		});
		res.status(200).json(bandas);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//POST - AGREGAR UNA BANDA
//localhost:3000/bandas
app.post("/bandas", async (req, res) => {
	try {
		const banda = await db.query(
			"INSERT INTO bandas (nombre, integrantes, fecha_inicio, fecha_separacion, pais) values (?,?,?,?,?)",
			{
				type: db.QueryTypes.INSERT,
				replacements: [
					req.body.nombre,
					req.body.integrantes,
					req.body.fecha_inicio,
					req.body.fecha_separacion,
					req.body.pais,
				],
			}
		);
		res.status(200).json(banda);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//PUT - MODIFICAR UNA BANDA POR ID
//localhost:3000/bandas/idBanda
app.put("/bandas/:idBanda", async (req, res) => {
	const idBanda = req.params.idBanda;
	try {
		const banda = await db.query(
			"UPDATE bandas SET nombre = ?, integrantes= ?, fecha_inicio = ?, fecha_separacion = ?, pais = ? WHERE id = ?",
			{
				type: db.QueryTypes.UPDATE,
				replacements: [
					req.body.nombre,
					req.body.integrantes,
					req.body.fecha_inicio,
					req.body.fecha_separacion,
					req.body.pais,
					idBanda,
				],
			}
		);
		res.status(200).json(banda);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//DELETE - ELIMINAR UNA BANDA POR ID
//localhost:3000/bandas/idBanda
app.delete("/bandas/:idBanda", async (req, res) => {
	const idBanda = req.params.idBanda;
	try {
		const banda = await db.query("DELETE FROM bandas WHERE id = :id", {
			type: db.QueryTypes.DELETE,
			replacements: { id: idBanda },
		});
		res.status(200).json(banda);
	} catch (error) {
		res.status(500).json({ error: "Intente mas tarde..." });
	}
});

//==========================================================================
//5. levantar el servidor
//==========================================================================
app.listen(3000, () => {
	console.log("servidor iniciado");
});
