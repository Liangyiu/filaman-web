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

	async function getFilamentUsageForToday() {
		const res = await fetch('/api/filament-used/last-x-days', {
			method: 'POST',
			body: JSON.stringify({
				days: 0
			})
		});
		const data = (await res.json()) as FilamentUsedApiResponseObject;

		return data.filamentUsed;
	}

	async function getStats() {
		await dbConnect();
		const spoolCount = await StockModel.countDocuments();
		const filamentUsageToday = await getFilamentUsageForToday();
		const last24HrEventCount = await getLast24HrEventCount();
		await dbDisconnect();

		const response = {
			spoolCount: spoolCount,
			filamentUsageToday: filamentUsageToday,
			last24HrEventCount: last24HrEventCount
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getStats());
};
