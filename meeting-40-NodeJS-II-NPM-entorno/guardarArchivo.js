const fs = require('fs');


const guardarDatoArchivo = (nombreArchivo,texto) => {
    try {
        fs.appendFileSync(nombreArchivo,`${texto}\n`)
        console.log(`se ha guardado el texto ${texto} exitosamente `)
    } catch (error) {
        console.log("ocurrio un error"+ err);
    }
};

module.exports = guardarDatoArchivo;
