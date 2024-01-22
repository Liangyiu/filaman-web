import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	async function getStats() {
		const res = await fetch(`/api/stats`);
		const data = await res.json();

		return data as StatsApiResponseObject;
	}

	async function getFilamentUsageEventsLastXDays(days: number) {
		const res = await fetch('/api/filament-used/last-x-days', {
			method: 'POST',
			body: JSON.stringify({
				days: days
			})
		});
		const data = await res.json();

		return data as FilamentUsedApiResponseObject[];
	}

	return {
		stats: await getStats(),
		dropdownData: [
			await getFilamentUsageEventsLastXDays(7),
			await getFilamentUsageEventsLastXDays(9),
			await getFilamentUsageEventsLastXDays(14)
		]
	};
}) satisfies PageServerLoad;
