const { mongoose } = require("../db/index");
// Users(name,lastName,age,email,password,hobbies:[strings])
const Plato = mongoose.model("platos", {
	plato: String,
	precio: Number,
	tipoPlato: String,
});
module.exports = { Plato };
