const opers = require("./calculadora");
const fs = require('fs');

// console.log(`suma 1+1 = ${opers.suma(1, 1)}`);


const guardarDatoArchivo = (nombreArchivo,texto) => {
    try {
        fs.appendFileSync(nombreArchivo,`${texto}\n`)
         console.log(`se ha guardado el texto ${texto} exitosamente `)
    } catch (error) {
        console.log("ocurrio un error"+ err);
    }
}

//UNA FORMA
// guardarDatoArchivo("calculos.txt",opers.suma(1, 1));
// guardarDatoArchivo("calculos.txt",opers.resta(109, 48));
// guardarDatoArchivo("calculos.txt",opers.multiplicacion(2, 2));
// guardarDatoArchivo("calculos.txt",opers.division(20, 5));




// OTRA MANERA de hacerlo
function calcular(func, num1, num2) {return func(num1, num2);}

guardarDatoArchivo('calculos.txt', calcular(opers.suma, 7, 7));
guardarDatoArchivo('calculos.txt', calcular(opers.resta, 7, 7));
guardarDatoArchivo('calculos.txt', calcular(opers.multiplicacion, 7, 7));
guardarDatoArchivo('calculos.txt', calcular(opers.division, 7, 7));