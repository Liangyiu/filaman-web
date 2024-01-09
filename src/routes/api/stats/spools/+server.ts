import type { RequestHandler } from './$types';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { error, json } from '@sveltejs/kit';
import { StockModel } from '../../../../schemas/Stock';

export const GET: RequestHandler = async () => {
	async function getTotalSpoolCount() {
		await dbConnect();
		const count = await StockModel.countDocuments();
		await dbDisconnect();

		const response = {
			totalSpools: count
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getTotalSpoolCount());
};
