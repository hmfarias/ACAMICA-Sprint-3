const { mongoose } = require("./../db/index.js");

//Users (name , lastname, age, email, password, hobbies: [strings])
//creo el MODELO USER
const User = mongoose.model("users", {
	name: String,
	lastname: String,
	age: Number,
	email: String,
	password: String,
	hobbies: [String],
	admin: Boolean,
});

module.exports = { User };
