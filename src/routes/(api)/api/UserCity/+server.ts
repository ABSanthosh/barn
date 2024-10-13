import { addUserCities, removeUserCity } from '$db/City.db';

export const DELETE = async ({ request }) => {
	const { userId, cityIds } = await request.json();
	try {
		const result = await removeUserCity(userId, cityIds);

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

export const POST = async ({ request }) => {
	const { userId, cities } = await request.json();
	try {
		const result = await addUserCities(userId, cities);

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
