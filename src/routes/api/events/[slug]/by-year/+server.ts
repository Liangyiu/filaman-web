import { eventTypes } from '$lib/utils/eventTypes';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStartEndOfYear, isDateValid } from '$lib/utils/dateUtils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { EventsModel } from '../../../../../schemas/Events';

export const POST: RequestHandler = async ({ request, params, setHeaders }) => {
	setHeaders({
		'cache-control': 'max-age=300'
	});

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

	async function getEventsForYear(date: Date, eventType: String) {
		const { startOfYear, endOfYear } = getStartEndOfYear(date);

		let events;

		await dbConnect();

		if (eventType === 'all') {
			events = await EventsModel.find({
				timestamp: {
					$gte: startOfYear,
					$lt: endOfYear
				}
			});
		} else {
			events = await EventsModel.find({
				timestamp: {
					$gte: startOfYear,
					$lt: endOfYear
				},
				event_type: eventType
			});
		}

		await dbDisconnect();

		const response = {
			events: events,
			eventType: slug,
			eventCount: events.length,

			timestampStart: startOfYear,
			timestampEnd: endOfYear
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getEventsForYear(date, slug));
};
