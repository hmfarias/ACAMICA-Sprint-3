const URL_BASE_BANDAS = `http://localhost:3000/bandasv2`;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// get all bands and return them
export async function getBands() {
	try {
		const response = await fetch(URL_BASE_BANDAS);
		const bandas = await response.json();
		return bandas;
	} catch (error) {
		console.error(error.message);
	}
}

export async function getBandId(idBanda) {
	const URL_BASE_BANDA_ID = `${URL_BASE_BANDAS}/${idBanda}`;
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	try {
		const response = await fetch(URL_BASE_BANDA_ID, requestOptions);
		const banda = await response.json();
		return banda;
	} catch (error) {
		console.error(error.message);
	}
}

export async function postBand(jsonBandas) {
	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: jsonBandas,
		redirect: "follow",
	};
	try {
		const response = await fetch(URL_BASE_BANDAS, requestOptions);
		return response;
	} catch (error) {
		console.error(error.message);
	}
}

export async function putBand(jsonBandas, idBanda) {
	const URL_BASE_PUT = `${URL_BASE_BANDAS}/${idBanda}`;
	const requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: jsonBandas,
		redirect: "follow",
	};
	try {
		const response = await fetch(URL_BASE_PUT, requestOptions);
		return response;
	} catch (error) {
		console.log("error en putband");
		console.log(error);
		console.error(error.message);
	}
}

export async function deleteBand(idBanda) {
	const URL_BASE_DELETE = `${URL_BASE_BANDAS}/${idBanda}`;
	console.log(URL_BASE_DELETE);
	const requestOptions = {
		method: "DELETE",
		redirect: "follow",
	};
	try {
		const response = await fetch(URL_BASE_DELETE, requestOptions);
		const info = await response.json();
		console.log("info");
		console.log(info);
		if (response.ok) {
			alert(`Se eliminó la banda "${idBanda}" exitosamente`);
		} else {
			alert(info.error);
		}
	} catch (error) {
		console.error(error.message);
	}
}
