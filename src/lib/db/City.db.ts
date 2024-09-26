import db from '$db';
import type { TCity } from '$types/City.type';

export async function addUserCity(userId: string, city: TCity) {
	return await db.city.createMany({
		data: {
			userId,
			name: city.name,
			country: city.country,
			lat: city.lat,
			lon: city.lon
		}
	});
}
