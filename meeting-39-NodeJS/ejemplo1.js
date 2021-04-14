console.log('hola desde Node JS');

let variable = 10;
console.log('variable= '+ variable);

variable += 5;
console.log('variable= '+ variable);

const estudiantes = [
    { id: 1, nombre: 'Marcelo', hobbies: ['futbol','golf']},
    { id: 2, nombre: 'Andre', hobbies: ['leer','gamer']},
    { id: 3, nombre: 'Andres', hobbies: ['ciclismo','ver series']},
    { id: 4, nombre: 'Santiago', hobbies: ['escuchar música','ver series']}
];

estudiantes.forEach(est => {
    console.log(est.nombre);
    
});

const estudianteNombreA = estudiantes.filter(est => est.nombre[0].toLowerCase() === 'a'); //todos los que encuentre
const estudianteNombreA2 = estudiantes.find(est => est.nombre[0].toLowerCase() === 'a'); //el primero que encuentra
const estudianteNombreA3 = estudiantes.find(est => est.nombre[0].toLowerCase() === 'g'); //undefined

console.log(estudianteNombreA);
console.log(estudianteNombreA2);
console.log(estudianteNombreA3);


const nombres = estudiantes.map(est => {
    return est.nombre.toUpperCase();
})

console.log(nombres);

