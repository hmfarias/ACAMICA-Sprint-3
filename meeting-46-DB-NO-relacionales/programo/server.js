const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const app = express();
const { validarAdmin } = require("./middlewares/index.js");
const { User } = require("./models/Users");
app.use(helmet());
app.use(express.json());
app.use(compression());
const rateLimitPolicy = rateLimit({
	message: "intente de nuevo mas tarde",
	max: 10,
	windowMs: 60 * 1000,
});
const users = [
	{
		username: "fede2021",
		password: "pass123",
		rol: "admin",
		email: "fede@gmail.com",
		admin: true,
	},
	{
		username: "marcelo2021",
		password: "pass123",
		rol: "user",
		email: "marcelo@gmail.com",
		admin: false,
	},
];
//1. proteger todos los endpoints menos el de login usando express-jwt como middleware global
// por nada en la vida expongan esta cadena NADAAAAA!!!!
const secretJWT = "poneralgosupercompicadoconnumerosycaracteres123+5";
app.use(
	expressJwt({
		secret: secretJWT,
		algorithms: ["HS256"],
	}).unless({ path: ["/login"] })
);

// function validarAdmin(req, res, next) {
// 	console.log("req.user"); // en req.user viene todo lo firmado en el token hecho en login
// 	console.log(req.user);
// 	if (!req.user.admin) {
// 		res.status(401).json({
// 			error: "el usuario No es ADMINISTRADOR",
// 		});
// 	} else {
// 		next();
// 	}
// }

//2. escribir el endpoint de login
app.post("/login", async (req, res) => {
	const emailPost = req.body.email;
	const passwordPost = req.body.password;
	// const usuarioValidado = users.find(
	// 	(user) => user.username == usernamePost && user.password == passwordPost
	// );
	const usuarioValidado = await User.findOne({
		email: emailPost,
		password: passwordPost,
	});

	if (!usuarioValidado) {
		res.status(401).json({
			error: "usuario o contrasena invalida",
		});
	} else {
		//3. crear el token
		const token = jwt.sign(
			{
				// username: usuarioValidado.username,
				// rol: usuarioValidado.rol,
				// email: usuarioValidado.email,
				// algomas: "algomas",
				// admin: usuarioValidado.admin,
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
//4. escribir endpoints el resto
app.get("/seguro", validarAdmin, (req, res) => {
	res.json({
		data: "data muy segura a nombre de " + req.user.email,
	});
});
app.listen(3000, () => {
	console.log("servidor iniciado");
});
