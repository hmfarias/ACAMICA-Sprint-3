const URL_BASE_BANDAS = `http://localhost:3000/bandasv2`;

// get all bands and return them
export async function getBandas() {
	try {
		const response = await fetch(URL_BASE_BANDAS);
		const bandas = await response.json();
		return bandas;
	} catch (error) {
		console.error(error.message);
	}
}
