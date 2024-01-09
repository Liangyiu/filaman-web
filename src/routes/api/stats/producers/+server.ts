import type { RequestHandler } from './$types';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { error, json } from '@sveltejs/kit';
import { ProducersModel } from '../../../../schemas/Producers';

export const GET: RequestHandler = async () => {
	async function getTotalProducersCount() {
		await dbConnect();
		const count = await ProducersModel.countDocuments();
		await dbDisconnect();

		const response = {
			totalProducers: count
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getTotalProducersCount());
};
