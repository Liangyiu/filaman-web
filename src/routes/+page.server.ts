import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	async function getStats() {
		const res = await fetch(`/api/stats`);
		const data = await res.json();

		return data;
	}

	return {
		stats: (await getStats()) as StatsApiResponseObject
	};
}) satisfies PageServerLoad;
