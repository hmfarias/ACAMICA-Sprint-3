    const suma = (a, b) => `suma ${a}+${b} = ${a + b}`;

const resta = (a, b) => `resta ${a}-${b} = ${a - b}`;

const multiplicacion = (a, b) =>`multiplicación ${a}*${b} = ${a * b}`;

const division = (a, b) => `división ${a}/${b} = ${a / b}`;

const operaciones = { suma, resta, multiplicacion, division };

//es la clase de hoy
module.exports = operaciones;