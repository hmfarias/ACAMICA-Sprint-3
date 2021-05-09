const { User } = require("./models/Users");

const users = [
	{
		name: "Santiago",
		lastname: "Circo",
		age: "19",
		email: "santi@gmail.com",
		password: "1234",
		hobbies: ["bici", "baile"],
		admin: true,
	},

	{
		name: "Andre",
		lastname: "Umbert",
		age: "25",
		email: "andre@gmail.com",
		password: "1234",
		hobbies: ["lol", "asado"],
		admin: true,
	},
];

//1. Como insertar datos a una coleccion de mongo:
// users.forEach((user) => {
// 	const newUser = new User(user);
// 	newUser.save();
// 	console.log("newUser");
// 	console.log(newUser);
// });
//609486b51cb2ea22dcdc40ed, id de andre

//2. Cómo obtener datos
//usando async una forma
// async function buscarAAndre(){
//     const andre = await (await User.findById("609486b51cb2ea22dcdc40ed")).execPopulate();
//     console.log(andre);
// }

//usando async otra forma
const buscarASanti = async () => {
	const santi = await await User.findById("609486b51cb2ea22dcdc40ed").exec();
	console.log("santi encontrado");
	console.log(santi);
};
buscarASanti();

//forma sincrona
// User.findById("609486b51cb2ea22dcdc40ed")
// 	.exec()
// 	.then((santi) => {
// 		console.log(santi);
// 	});

const listarUsuarios = async () => {
	const users = await User.find(); //busca todos los usuarios
	console.log(users);
};
listarUsuarios();

const comprobarEmailPassword = async () => {
	const usuarioEncontrado = await User.findOne({
		email: "santi@gmail.com",
		password: "1234",
	});
	usuarioEncontrado.age = 29;
	usuarioEncontrado.save();
};
comprobarEmailPassword();

//para borrar
// User.deleteOne({
//     _id: "609486b51cb2ea22dcdc40ed"
// })

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
