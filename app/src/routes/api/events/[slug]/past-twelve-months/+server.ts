import { eventTypes } from '$lib/utils/eventTypes';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStartEndPastXMonths, isDateValid } from '$lib/utils/dateUtils';
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

	const dates = getStartEndPastXMonths(date, 12);

	async function getEventsPastTwelveMonths(date: Date, eventType: String) {
		let events = [];

		await dbConnect();

		for (let i = 0; i < dates.length; i++) {
			if (eventType === 'all') {
				await events.push(
					await EventsModel.find({
						timestamp: {
							$gte: dates[i].startOfMonth,
							$lt: dates[i].endOfMonth
						}
					})
				);
			} else {
				await events.push(
					await EventsModel.find({
						timestamp: {
							$gte: dates[i].startOfMonth,
							$lt: dates[i].endOfMonth
						},
						event_type: eventType
					})
				);
			}
		}

		await dbDisconnect();

		const response = {
			dates: dates,
			events: events,
			eventCount: events.length,
			eventType: slug,
			providedDate: date
		};

		return await JSON.parse(await JSON.stringify(response));
	}

	return json(await getEventsPastTwelveMonths(date, slug));
};
