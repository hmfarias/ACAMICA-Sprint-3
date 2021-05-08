const { Plato } = require("./models/Platos");
const platos = [
	{
		plato: "Hamburguesa",
		precio: 5,
		tipoPlato: "Comida Rápida",
	},
	{
		plato: "HotDog",
		precio: 10,
		tipoPlato: "Comida Rápida",
	},
];
// platos.forEach((plato) => {
// 	const nuevoPlato = new Plato(plato);
// 	nuevoPlato.save();
// 	console.log(nuevoPlato);
// });
async function listarPlatos() {
	const platos = await Plato.find();
	console.log(platos);
}

listarPlatos();
