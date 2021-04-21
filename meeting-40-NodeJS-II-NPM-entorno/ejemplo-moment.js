const moment = require('moment'); 

const hoy = moment();

console.log(hoy.format('YYYY Do MM'));
console.log(hoy.format('YYYY-MM-DD HH:mm:ss'));

console.log(moment('1989-03-29').fromNow());

const manana = moment().add(1,'days');

console.log();