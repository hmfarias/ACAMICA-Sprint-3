// import async functions to comunicate with the API
import { getBandas } from "./services.js";

const desktopDisplay = window.matchMedia("(min-width: 1440px)");

const tbodyBandas = document.getElementById("tbodyBandas");
//function that shows bands
async function showBandas() {
	try {
		let info = await getBandas();
		console.log(info);
		tbodyBandas.innerHTML = "";
		info.forEach((element) => {
			//prepare the dates
			let fechaInicio = `${element.fecha_inicio.substr(8, 2)} / 
            ${element.fecha_inicio.substr(5, 2)} / 
            ${element.fecha_inicio.substr(0, 4)}`;

			let fechaSeparacion = !element.fecha_separacion
				? "Banda activa"
				: `${element.fecha_separacion.substr(8, 2)} / 
            ${element.fecha_separacion.substr(5, 2)} / 
            ${element.fecha_separacion.substr(0, 4)}`;

			// construct the inerHTML for tbodyBandas
			tbodyBandas.innerHTML += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.nombre}</td>
                    <td>${element.integrantes}</td>
                    <td>${fechaInicio}</td>
                    <td>${fechaSeparacion}</td>
                    <td>${element.pais}</td>
                    <td><img src="./images/edit.png" alt="editar"><img src="./images/delete.png"
                    alt="borrar"></td>
                    </tr>
                    `;
		});
	} catch (error) {
		console.error(error);
	}
}
showBandas();
