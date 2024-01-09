import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { error } from '@sveltejs/kit';
import { StockModel } from '../../schemas/Stock';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	async function getStockItems(limit: number, skip: number) {
		if (limit > 100) {
			throw error(400, 'Bad Request');
		}

		const res = await fetch(`/api/stock?limit=${limit}&skip=${skip}`);
		const data = (await res.json()) as StockApiResponseObject;

		return data;
	}

	return {
		stockItems: getStockItems(limit, skip)
	};
}) satisfies PageServerLoad;
