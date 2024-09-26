import db from '$db';
import type { TCity } from '$types/City.type';

export async function addUserCity(userId: string, city: TCity[]) {
	console.log('userId', city);
	return await db.city.createMany({
		data: city.map((c) => ({
			userId,
			name: c.name,
			country: c.country,
			lat: c.lat,
			lon: c.lon
		}))
	});
}
