import { addCity, getAllUserCity, getCityById, removeUserCity, upsertCity } from '$db/City.db';
import type { TCity } from '$types/City.type';
import type { Actions } from './$types';

export const actions: Actions = {
	addCity: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('City')}`) as {
			userId: string;
			city: TCity;
		};
		return await addCity(formData.userId, formData.city);
	},
  getAllUserCity: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('City')}`) as {
			userId: string;
		};
		return await getAllUserCity(formData.userId);
	},
	removeUserCity: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('City')}`) as {
			userId: string;
			cityIds: number[];
		};
		return await removeUserCity(formData.userId, formData.cityIds);
	},
	getCityById: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('City')}`) as {
			cityId: number;
		};
		return await getCityById(formData.cityId);
	},
	upsertCity: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('City')}`) as {
			userId: string;
			city: TCity & { id?: number };
		};
		return await upsertCity(formData.userId, formData.city);
	}
};
