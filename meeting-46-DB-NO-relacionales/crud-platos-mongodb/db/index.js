// aca va la conexion con mongo
const mongoose = require("mongoose");

const host = "localhost";
const port = "27017";
const dbName = "clasemongo";

const dbConnectionString = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(dbConnectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = { mongoose };
