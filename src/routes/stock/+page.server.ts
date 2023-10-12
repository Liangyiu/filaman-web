import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { StockModel } from '../../schemas/Stock';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	await dbConnect();
	let stockItems = (await StockModel.find()) as StockModelInterface[];
	await dbDisconnect();

	stockItems = JSON.parse(JSON.stringify(stockItems));

	return { stockItems };
}) satisfies PageServerLoad;
