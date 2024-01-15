import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { json } from '@sveltejs/kit';
import { ProducersModel } from '../../../schemas/Producers';
import { StockModel } from '../../../schemas/Stock';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	async function getLast24HrEventCount() {
		const res = await fetch('/api/events/all/last-24-hrs');
		const data = (await res.json()) as EventApiResponseObject;

		return data.eventCount;
	}

	async function getStats() {
		await dbConnect();
		const spoolCount = await StockModel.countDocuments();
		const producerCount = await ProducersModel.countDocuments();
		const eventCount = await getLast24HrEventCount();
		await dbDisconnect();

		await getLast24HrEventCount();

		const response = {
			spoolCount,
			producerCount,
			last24HrEventCount: eventCount
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getStats());
};
