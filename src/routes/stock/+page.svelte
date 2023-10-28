<script lang="ts">
	import {
		SlideToggle,
		type PaginationSettings,
		Paginator,
		AccordionItem,
		Accordion
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;

	$: stock = data.stockItems.stockItems.map((item: StockModelInterface) => {
		return {
			_id: item._id,
			color: item.color,
			diameter: item.diameter,
			material: item.material,
			weight: item.weight,
			location: item.location ? item.location : '',
			lastDried: new Date(item.lastDried).toLocaleDateString('en-gb', {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}),
			openingDate: new Date(item.openingDate).toLocaleDateString('en-gb', {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}),
			producer: item.producer.producerName,
			emptyWeight: item.producer.emptyWeight,
			spoolSize: item.producer.spoolSize
		};
	});

	let tableHead = [
		{
			label: 'ID',
			shown: true,
			inputName: 'slider-id',
			stockProperty: '_id'
		},
		{
			label: 'Color',
			shown: true,
			inputName: 'slider-color',
			stockProperty: 'color'
		},
		{
			label: 'Diameter',
			shown: true,
			inputName: 'slider-diameter',
			stockProperty: 'diameter'
		},
		{
			label: 'Material',
			shown: true,
			inputName: 'slider-material',
			stockProperty: 'material'
		},
		{
			label: 'Weight',
			shown: true,
			inputName: 'slider-weight',
			stockProperty: 'weight'
		},
		{
			label: 'Location',
			shown: true,
			inputName: 'slider-location',
			stockProperty: 'location'
		},
		{
			label: 'Last dried',
			shown: true,
			inputName: 'slider-last-dried',
			stockProperty: 'lastDried'
		},
		{
			label: 'Opening date',
			shown: true,
			inputName: 'slider-opening-date',
			stockProperty: 'openingDate'
		},
		{
			label: 'Producer',
			shown: true,
			inputName: 'slider-producer',
			stockProperty: 'producer'
		},
		{
			label: 'Empty weight',
			shown: true,
			inputName: 'slider-empty-weight',
			stockProperty: 'emptyWeight'
		},
		{
			label: 'Spool size',
			shown: true,
			inputName: 'slider-spool-size',
			stockProperty: 'spoolSize'
		}
	];

	let sortBy = {
		col: '_id',
		ascending: true
	};

	$: sort = (column: string) => {
		if (sortBy.col === column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		let sortModifier = sortBy.ascending ? 1 : -1;

		let sortFunc = (a: any, b: any) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		stock = stock.sort(sortFunc);
	};

	$: pageSize = data.stockItems.limit;
	$: totalItems = data.stockItems.total;
	$: totalPages = Math.ceil(totalItems / pageSize);

	$: paginationSettings = {
		page: 0,
		limit: pageSize,
		size: totalItems,
		amounts: [5, 10, 15, 20]
	} satisfies PaginationSettings;

	function handlePagination(e: CustomEvent) {
		goto(`/stock?limit=${pageSize}&skip=${pageSize * e.detail}`);
	}

	function handleAmountChange(e: CustomEvent) {
		goto(`/stock?limit=${e.detail}`);
	}
</script>

<Accordion class="text-token" rounded="">
	<AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">⚙️ Column Toggles</p></svelte:fragment>
		<svelte:fragment slot="content">
			<!-- prettier-ignore -->
			<div class="toggle-group py-2 space-x-2 text-center">
				{#each tableHead as item}
					<SlideToggle name={item.inputName} size="sm" bind:checked={item.shown}>{item.label}</SlideToggle
					>
				{/each}
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>

<div class="px-5 space-y-3 my-2">
	<div class="paginator">
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
			on:page={handlePagination}
			on:amount={handleAmountChange}
		/>
	</div>

	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					{#each tableHead as item}
						<th
							class:hidden={!item.shown}
							class:sort-by={sortBy.col === item.stockProperty}
							class:sort-asc={sortBy.ascending && sortBy.col === item.stockProperty}
							class:sort-desc={!sortBy.ascending && sortBy.col === item.stockProperty}
							on:click={() => sort(item.stockProperty)}
						>
							{item.label}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each stock as item, i}
					<tr>
						<td class:hidden={!tableHead[0].shown}>{item._id}</td>
						<td class:hidden={!tableHead[1].shown}>{item.color}</td>
						<td class:hidden={!tableHead[2].shown}>{item.diameter}</td>
						<td class:hidden={!tableHead[3].shown}>{item.material}</td>
						<td class:hidden={!tableHead[4].shown}>{item.weight}</td>
						<td class:hidden={!tableHead[5].shown}>{item.location}</td>
						<td class:hidden={!tableHead[6].shown}>{item.lastDried}</td>
						<td class:hidden={!tableHead[7].shown}>{item.openingDate}</td>
						<td class:hidden={!tableHead[8].shown}>{item.producer}</td>
						<td class:hidden={!tableHead[9].shown}>{item.emptyWeight}</td>
						<td class:hidden={!tableHead[10].shown}>{item.spoolSize}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	th {
		cursor: pointer;
	}

	th.sort-asc::after {
		display: inline;
	}

	th.sort-asc.sort-by::after {
		content: '⬆';
	}

	th.sort-desc.sort-by::after {
		content: '⬇';
	}
</style>
