import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redis } from '$lib/server/redis';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch, setHeaders }) => {
	async function getStats() {
		const key = 'cached-filaman:stats';
		const cached = await redis.get(key);

		if (cached) {
			return JSON.parse(cached);
		}

		const res = await fetch(`/api/stats`);

		if (!res.ok) {
			throw error(res.status, 'Could not fetch stats');
		}

		const data = await res.json();

		redis.set(key, JSON.stringify(data), 'EX', env.CACHE_MAX_AGE);

		return data as StatsApiResponseObject;
	}

	async function getFilamentUsageEventsLastXDays(days: number) {
		const key = `cached-filaman:filament-used:last-${days}-days`;
		const cached = await redis.get(key);

		if (cached) {
			return JSON.parse(cached);
		}

		const res = await fetch('/api/filament-used/last-x-days', {
			method: 'POST',
			body: JSON.stringify({
				days: days
			})
		});

		if (!res.ok) {
			throw error(res.status, 'Could not fetch filament usage');
		}

		const data = await res.json();

		redis.set(key, JSON.stringify(data), 'EX', env.CACHE_MAX_AGE);

		return data as FilamentUsedApiResponseObject[];
	}

	setHeaders({
		'cache-control': `max-age=${env.CACHE_MAX_AGE}`
	});

	return {
		stats: await getStats(),
		dropdownData: [
			await getFilamentUsageEventsLastXDays(7),
			await getFilamentUsageEventsLastXDays(30),
			await getFilamentUsageEventsLastXDays(90)
		]
	};
}) satisfies PageServerLoad;
