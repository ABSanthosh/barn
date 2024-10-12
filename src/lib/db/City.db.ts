import db from '$db';
import type { TCity } from '$types/City.type';

export async function addUserCity(userId: string, city: TCity[]) {
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

// useless

export async function addCity(userId: string, city: TCity) {
	return await db.city.create({
		data: {
			userId,
			name: city.name,
			country: city.country,
			lat: city.lat,
			lon: city.lon
		}
	});
}

export async function getAllUserCity(userId: string) {
	return await db.city.findMany({
		where: {
			userId
		}
	});
}

export async function removeUserCity(userId: string, cityIds: number[]) {
	return await db.city.deleteMany({
		where: {
			userId,
			id: {
				in: cityIds
			}
		}
	});
}

export async function getCityById(cityId: number) {
	return await db.city.findUnique({
		where: {
			id: cityId
		}
	});
}

export async function upsertCity(userId: string, city: TCity & { id?: number }) {
	return await db.city.upsert({
		where: {
			id: city.id,
			name: city.name,
			country: city.country
		},
		create: {
			userId,
			name: city.name,
			country: city.country,
			lat: city.lat,
			lon: city.lon
		},
		update: {
			lat: city.lat,
			lon: city.lon
		}
	});
}
