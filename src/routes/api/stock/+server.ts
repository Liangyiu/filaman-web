import type { RequestHandler } from '../$types';
import { StockModel } from '../../../schemas/Stock';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	await dbConnect();
	let stock = (await StockModel.find()) as StockModelInterface[];
	await dbDisconnect();

	stock = JSON.parse(JSON.stringify(stock));
	return json(stock);
};
