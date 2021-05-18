// import async functions to comunicate with the API
import {
	getBands,
	getBandId,
	postBand,
	deleteBand,
	putBand,
} from "./services.js";

const desktopDisplay = window.matchMedia("(min-width: 1440px)");

const tbodyBandas = document.getElementById("tbodyBandas");
//function that shows bands
async function showBandas() {
	try {
		const info = await getBands();
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
                    <td><img class = "edit" key = "${element.id}" src="./images/edit.png" alt="editar"><img class = "delete" key = "${element.id}" src="./images/delete.png"
                    alt="borrar"></td>
                    </tr>
                    `;
		});
		//add listener for edit and delete img's -----------------------
		tbodyBandas.querySelectorAll(".edit").forEach((button) => {
			button.addEventListener("click", editBandFunction);
		});
		tbodyBandas.querySelectorAll(".delete").forEach((button) => {
			button.addEventListener("click", deleteBandFunction);
		});
		//--------------------------------------------------------------
	} catch (error) {
		console.error(error);
	}
}
showBandas();

const addBand = document.getElementById("addBand");
const modalWindow = document.getElementById("modalWindow");
const saveBand = document.getElementById("saveBand");
const formBands = document.getElementById("formBands");
let modalWindowClose = document.getElementById("modalWindowClose");

addBand.addEventListener("click", () => {
	modalWindow.style.display = "flex";
	saveBand.setAttribute("key", "post");
});

saveBand.addEventListener("click", (event) => {
	console.log(event.target.getAttribute("key"));
	const nameBand = document.getElementById("nameBand").value;
	const membersBand = parseInt(document.getElementById("membersBand").value);
	const startDateBand = document.getElementById("startDateBand").value;
	const endDate = document.getElementById("endDateBand").value;
	const endDateBand = !endDate ? null : endDateBand;
	const countryBand = document.getElementById("countryBand").value;
	const bodyBandas = {
		nombre: nameBand,
		integrantes: membersBand,
		fecha_inicio: startDateBand,
		fecha_separacion: endDateBand,
		pais: countryBand,
	};
	const jsonBody = JSON.stringify(bodyBandas);
	console.log(jsonBody);

	//if we are adding data call the postBand function, otherwise call the putBand function
	console.log(jsonBody);
	console.log(event.target.getAttribute("idBand"));
	event.target.getAttribute("key") === "post"
		? postBand(jsonBody)
		: putBand(jsonBody, event.target.getAttribute("idBand"));

	modalWindow.style.display = "none";
	formBands.reset();
	showBandas();
});

// if usr click over the X icon or in a blank part of the window then close
modalWindow.addEventListener("click", (event) => {
	if (
		event.target.id === "modalWindow" ||
		event.target.id === "modalWindowClose"
	) {
		formBands.reset();
		modalWindow.style.display = "none";
	}
});

async function editBandFunction(button) {
	const idBand = button.target.getAttribute("key");
	saveBand.setAttribute("key", "put");
	saveBand.setAttribute("idBand", idBand);
	console.log("entra edit");
	try {
		const info = await getBandId(idBand);
		console.log(info);
		document.getElementById("nameBand").value = info.nombre;
		document.getElementById("membersBand").value = info.integrantes;
		let fechaIni =
			info.fecha_inicio.substr(0, 4) +
			"-" +
			info.fecha_inicio.substr(5, 2) +
			"-" +
			info.fecha_inicio.substr(8, 2);
		document.getElementById("startDateBand").value = fechaIni;
		let fechaSep =
			info.fecha_separacion.substr(0, 4) +
			"-" +
			info.fecha_separacion.substr(5, 2) +
			"-" +
			info.fecha_separacion.substr(8, 2);
		document.getElementById("endDateBand").value = fechaSep;
		document.getElementById("countryBand").value = info.pais;

		// var d = Date.parseDate("2005-10-05 12:13 am", "Y-m-d g:i a");
		// document.write(d + "\n");
		// var d = Date.parseDate("9/5/05", "n/j/y");
		// document.write(d + "\n");
	} catch (error) {}

	modalWindow.style.display = "flex";
}
function deleteBandFunction(button) {
	deleteBand(button.target.getAttribute("key"));
	showBandas();
}
