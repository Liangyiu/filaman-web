import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redis } from '$lib/server/redis';
import { env } from '$env/dynamic/private';

export const load = (async ({ url, fetch, setHeaders }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	async function getStockItems(limit: number, skip: number) {
		if (limit > 100) {
			throw error(400, 'Bad Request');
		}

		const key = `cached-filaman:stock:limit=${limit}+skip=${skip}`;
		const cached = await redis.get(key);

		if (cached) {
			const ttl = await redis.ttl(key);
			setHeaders({
				'cache-control': `max-age=${ttl}`
			});

			return JSON.parse(cached);
		}

		const res = await fetch(`/api/stock?limit=${limit}&skip=${skip}`);

		if (!res.ok) {
			throw error(res.status, 'Could not fetch stock items');
		}

		setHeaders({
			'cache-control': `max-age=${env.CACHE_MAX_AGE}`
		});

		const data = (await res.json()) as StockApiResponseObject;

		redis.set(key, JSON.stringify(data), 'EX', env.CACHE_MAX_AGE);

		return data;
	}

	return {
		stockItems: await getStockItems(limit, skip)
	};
}) satisfies PageServerLoad;
