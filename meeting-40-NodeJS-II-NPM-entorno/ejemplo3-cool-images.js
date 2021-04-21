const coolImages = require("cool-images");
const guardarDatoArchivo = require("./guardarArchivo");
const moment = require('moment'); 

const hoy = moment();

const arrayImages=coolImages.many(600, 800, 3); // array of 3 image random images with 600x800!
console.log(arrayImages);

guardarDatoArchivo('log.txt', hoy.format('YYYY-MM-DD HH:mm:ss'));
arrayImages.forEach(imageUrl => {
    guardarDatoArchivo('log.txt', imageUrl);
});




//version del profe
// const coolImages = require('cool-images');
// const guardarDatoArchivo = require("./guardarArchivo");
// const moment = require ('moment');
// setInterval(()=> {
// // generar numero aleatorio entre 1 y 10
// const randomNumber = Math.floor(Math.random()*10) + 1;
// const imagenes = coolImages.many(200,200,randomNumber);
// guardarDatoArchivo('log.txt',moment().format('YYYY-MM-DD HH:mm:ss'));
// guardarDatoArchivo('log.txt',`guardando ${imagenes.length} urls`);
// imagenes.forEach(img => {
//     guardarDatoArchivo('log.txt',img);
// });
// },5000)








//DOCUMENTATION COOL IMAGES
// coolImages.one(); // 'https://unsplash.it/300/500?image=125'
// console.log(coolImages.one());


// coolImages.one(600, 800); // 'https://unsplash.it/600/800?image=425'
 
// // generate a random black & white image
// coolImages.one(600, 800, true); // 'https://unsplash.it/g/600/800?image=300'
 
// // generate a random blured image
// coolImages.one(600, 800, false, true); // 'https://unsplash.it/600/800?image=300&blur'
 
// coolImages.many(); // array of 6 cool random images with 300x500!
 
// coolImages.many(600, 800, 25); // array of 25 image random images with 600x800!
 
// coolImages.many(600, 800, 10, true, false); // array of 10 black and white images!
 
// coolImages.many(600, 800, 10, false, true); // array of 10 blured images!
 
// coolImages.many(600, 800, 10, true, true); // array of 10 black and white blured images! go crazy.