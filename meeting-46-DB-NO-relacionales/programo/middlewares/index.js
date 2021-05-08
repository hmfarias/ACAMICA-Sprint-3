function validarAdmin(req, res, next) {
	console.log("req.user"); // en req.user viene todo lo firmado en el token hecho en login
	console.log(req.user);
	if (!req.user.admin) {
		res.status(401).json({
			error: "el usuario No es ADMINISTRADOR",
		});
	} else {
		next();
	}
}

module.exports = { validarAdmin };
