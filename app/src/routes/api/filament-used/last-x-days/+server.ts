import { eventTypes } from '$lib/utils/eventTypes';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDate24HoursBefore, getLastXDaysDates, getStartEndOfDay } from '$lib/utils/dateUtils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';
import { EventsModel } from '../../../../schemas/Events';

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	setHeaders({
		'cache-control': 'max-age=300'
	});

	let { days } = await request.json();

	async function getFilamentUsedLastXDays(days: number) {
		if (days < 0) {
			return new Response(
				JSON.stringify({
					error: 'No negative numbers allowed'
				}),
				{ status: 400 }
			);
		}

		if (days > 365) {
			return new Response(
				JSON.stringify({
					error: 'Max 365 days'
				}),
				{ status: 400 }
			);
		}

		if (days === 0) {
			const now = new Date();
			const { endOfDay, startOfDay } = getStartEndOfDay(now);

			await dbConnect();

			const events = (await EventsModel.find({
				timestamp: {
					$gte: startOfDay,
					$lt: endOfDay
				},
				$or: [
					{
						event_type: 'updated-filament'
					},
					{
						event_type: 'deleted-filament'
					}
				]
			})) as EventsModelInterface[];

			const filamentUsage = events.map((event) => {
				return event.filamentUsed;
			});

			const filamentUsed = filamentUsage.reduce((acc, cur) => (acc || 0) + (cur || 0), 0);

			await dbDisconnect();

			return {
				date: startOfDay,
				dateString: now.toLocaleString('en-us', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				}),
				filamentUsed: filamentUsed
			};
		}

		const dates = getLastXDaysDates(new Date(), days);

		await dbConnect();

		const response = await Promise.all(
			dates.map(async (date) => {
				const events = (await EventsModel.find({
					timestamp: {
						$gte: date.startOfDay,
						$lt: date.endOfDay
					},
					$or: [
						{
							event_type: 'updated-filament'
						},
						{
							event_type: 'deleted-filament'
						}
					]
				})) as EventsModelInterface[];

				const filamentUsage = events.map((event) => {
					return event.filamentUsed;
				});

				const filamentUsed = filamentUsage.reduce((acc, cur) => (acc || 0) + (cur || 0), 0);

				return {
					date: date.startOfDay,
					dateString: date.dateString,
					filamentUsed: filamentUsed
				};
			})
		);

		await dbDisconnect();

		return JSON.parse(JSON.stringify(response));
	}

	return json(await getFilamentUsedLastXDays(days));
};
