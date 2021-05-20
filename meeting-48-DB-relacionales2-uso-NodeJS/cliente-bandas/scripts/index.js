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
                    <td><img class = "edit" key = "${element.id}" src="./images/edit.png" title = "Editar" alt="editar"><img class = "delete" key = "${element.id}" src="./images/delete.png" title = "Borrar"
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
const modalWindowClose = document.getElementById("modalWindowClose");

addBand.addEventListener("click", () => {
	modalWindow.style.display = "flex";
	saveBand.setAttribute("key", "post");
});

saveBand.addEventListener("click", async (event) => {
	const nameBand = document.getElementById("nameBand").value;
	const membersBand = parseInt(document.getElementById("membersBand").value);
	const startDateBand = document.getElementById("startDateBand").value;
	const endDate = document.getElementById("endDateBand").value;
	const endDateBand = !endDate ? null : endDate;
	const countryBand = document.getElementById("countryBand").value;
	const bodyBandas = {
		nombre: nameBand,
		integrantes: membersBand,
		fecha_inicio: startDateBand,
		fecha_separacion: endDateBand,
		pais: countryBand,
	};
	const jsonBody = JSON.stringify(bodyBandas);

	const action =
		event.target.getAttribute("key") === "post" ? "agregó" : "modificó";

	//if we are adding data call the postBand function, otherwise call the putBand function
	const response =
		event.target.getAttribute("key") === "post"
			? await postBand(jsonBody)
			: await putBand(jsonBody, event.target.getAttribute("idBand"));
	const info = await response.json();
	if (response.ok) {
		showBandas();
		alert(`Se ${action} la banda "${nameBand}" exitosamente`);
	} else {
		alert(info.error);
	}

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
		showBandas();
	}
});

async function editBandFunction(button) {
	const idBand = button.target.getAttribute("key");
	const nameBand = document.getElementById("nameBand");
	const membersBand = document.getElementById("membersBand");
	const startDateBand = document.getElementById("startDateBand");
	const endDateBand = document.getElementById("endDateBand");
	const countryBand = document.getElementById("countryBand");

	saveBand.setAttribute("key", "put");
	saveBand.setAttribute("idBand", idBand);
	try {
		const info = await getBandId(idBand);
		nameBand.value = info.nombre;
		membersBand.value = info.integrantes;
		const yearStart = info.fecha_inicio.substr(0, 4);
		const monthStart = info.fecha_inicio.substr(5, 2);
		const dayStart = info.fecha_inicio.substr(8, 2);
		const dateStart = `${yearStart}-${monthStart}-${dayStart}`;
		startDateBand.value = dateStart;
		const dateFinish = !info.fecha_separacion
			? ""
			: info.fecha_separacion.substr(0, 4) +
			  "-" +
			  info.fecha_separacion.substr(5, 2) +
			  "-" +
			  info.fecha_separacion.substr(8, 2);

		endDateBand.value = dateFinish;
		countryBand.value = info.pais;
	} catch (error) {
		console.log(error.message);
	}

	modalWindow.style.display = "block";
}
async function deleteBandFunction(button) {
	const idBanda = button.target.getAttribute("key");
	const response = await deleteBand(idBanda);
	const info = await response.json();
	if (response.ok) {
		alert(`Se eliminó la banda "${idBanda}" exitosamente`);
	} else {
		alert(info.error);
	}
	showBandas();
}
