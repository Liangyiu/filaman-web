import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStartEndOfMonth, isDateValid } from '$lib/utils/dateUtils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { EventsModel } from '../../../../../schemas/Events';
import { eventTypes } from '$lib/utils/eventTypes';

export const POST: RequestHandler = async ({ request, params }) => {
	let { date } = await request.json();
	const { slug } = params;

	if (!eventTypes.includes(slug)) {
		return new Response(
			JSON.stringify({
				error: 'Please provide a valid event type'
			}),
			{ status: 400 }
		);
	}

	if (!isDateValid(date)) {
		return new Response(
			JSON.stringify({
				error: 'Please provide a valid UTC date'
			}),
			{ status: 400 }
		);
	}

	date = new Date(date);

	async function getEventsForMonth(date: Date, eventType: String) {
		const { startOfMonth, endOfMonth } = getStartEndOfMonth(date);

		let events;

		await dbConnect();

		if (eventType === 'all') {
			events = await EventsModel.find({
				timestamp: {
					$gte: startOfMonth,
					$lt: endOfMonth
				}
			});
		} else {
			events = await EventsModel.find({
				timestamp: {
					$gte: startOfMonth,
					$lt: endOfMonth
				},
				event_type: eventType
			});
		}

		await dbDisconnect();

		const response = {
			events: events,
			eventType: slug,
			eventCount: events.length,

			timestampStart: startOfMonth,
			timestampEnd: endOfMonth
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getEventsForMonth(date, slug));
};
