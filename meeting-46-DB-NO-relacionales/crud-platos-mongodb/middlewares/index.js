const { Plato } = require("../models/Platos");

function validateAdmin(req, res, next) {
	if (!req.user.admin) {
		res.status(401).json({
			error: "el usuario No es ADMINISTRADOR",
		});
	} else {
		next();
	}
}

//VALIDAR EXISTENCIA DEL PLATO
async function validatePlateExists(req, res, next) {
	const platePost = req.body.plato;
	try {
		const plateExists = await Plato.findOne({
			plato: platePost,
		});

		if (!plateExists) {
			next();
		} else {
			res.status(409).json({ error: `Plate ${platePost} already exists` });
		}
	} catch (error) {
		console.log("Error " + error);
	}
}

//VALIDAR EXISTENCIA DEL PLATO por ID
async function validatePlateExistsId(req, res, next) {
	const platePost = req.body.plato;
	try {
		const plateExists = await Plato.findOne({
			plato: platePost,
		});

		if (!plateExists) {
			next();
		} else {
			res.status(409).json({ error: `Plate ${platePost} already exists` });
		}
	} catch (error) {
		console.log("Error " + error);
	}
}

//VALIDAR EXISTENCIA DEL PLATO
async function validatePlateNotExists(req, res, next) {
	const platePutId = req.params.id;
	try {
		const plateExists = await Plato.findOne({
			_id: platePutId,
		});

		if (!plateExists) {
			res.status(400).json({ error: "Plate NOT exists" });
		} else {
			next();
		}
	} catch (error) {
		console.log("Error " + error);
	}
}

//VALIDAR BODY PARA PLATO al hacer un POST
function validatePlateBody(req, res, next) {
	const msgError = [];
	!req.body.plato && msgError.push("El nombre del plato es obligatorio");
	!req.body.precio && msgError.push("El precio del plato es obligatorio");
	!req.body.tipoPlato && msgError.push("El tipo de plato es obligatorio");

	msgError.length > 0
		? res.status(400).json({ error: msgError.join(",") })
		: next();
}

module.exports = {
	validateAdmin,
	validatePlateExists,
	validatePlateBody,
	validatePlateNotExists,
};
