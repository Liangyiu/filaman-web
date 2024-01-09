import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStartEndOfDay, isDateValid } from '$lib/utils/dateUtils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { EventsModel } from '../../../../schemas/Events';

export const POST: RequestHandler = async ({ request }) => {
	let { date } = await request.json();

	if (!isDateValid(date)) {
		throw error(400, 'Please provide a valid UTC date');
	}

	date = new Date(date);

	async function getEventsForDay(date: Date) {
		const { startOfDay, endOfDay } = getStartEndOfDay(date);

		await dbConnect();
		const events = await EventsModel.find({
			timestamp: {
				$gte: startOfDay,
				$lt: endOfDay
			}
		});
		await dbDisconnect();

		const response = {
			events: events,
			timestampStart: startOfDay,
			timestampEnd: endOfDay
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getEventsForDay(date));
};
