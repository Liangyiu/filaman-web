import { eventTypes } from '$lib/utils/eventTypes';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDate24HoursBefore } from '$lib/utils/dateUtils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { EventsModel } from '../../../../../schemas/Events';

export const GET: RequestHandler = async ({ request, params }) => {
	const { slug } = params;

	if (!eventTypes.includes(slug)) {
		return new Response(
			JSON.stringify({
				error: 'Please provide a valid event type'
			}),
			{ status: 400 }
		);
	}

	const date = new Date();

	async function getEventsLast24Hours(date: Date, eventType: String) {
		const startTime = getDate24HoursBefore(date);

		let events;

		await dbConnect();

		if (eventType === 'all') {
			events = await EventsModel.find({
				timestamp: {
					$gte: startTime,
					$lt: date
				}
			});
		} else {
			events = await EventsModel.find({
				timestamp: {
					$gte: startTime,
					$lt: date
				},
				event_type: eventType
			});
		}

		await dbDisconnect();

		const response = {
			events: events,
			eventType: slug,
			eventCount: events.length,

			timestampStart: startTime,
			timestampEnd: date
		};

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getEventsLast24Hours(date, slug));
};
