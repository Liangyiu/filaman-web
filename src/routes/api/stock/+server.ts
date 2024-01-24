import type { RequestHandler } from './$types';
import { StockModel } from '../../../schemas/Stock';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	setHeaders({
		'cache-control': 'max-age=300'
	});

	async function getStockItems(limit: number = 10, skip: number = 0) {
		if (limit > 100) {
			return new Response(
				JSON.stringify({
					error: 'Bad Request'
				}),
				{ status: 400 }
			);
		}

		await dbConnect();
		const stockItems = await StockModel.find().limit(limit).skip(skip);
		const count = await StockModel.count();
		await dbDisconnect();

		const response = {
			stockItems,
			total: count,
			limit,
			skip
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getStockItems(limit, skip));
};
