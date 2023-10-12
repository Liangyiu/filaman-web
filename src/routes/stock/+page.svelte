<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	let stock = data.stockItems.map((item: StockModelInterface) => {
		return {
			_id: item._id,
			color: item.color,
			diameter: item.diameter,
			material: item.material,
			weight: item.weight,
			lastDried: new Date(item.lastDried).toLocaleDateString('en-gb', {
				weekday: 'short',
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}),
			openingDate: new Date(item.openingDate).toLocaleDateString('en-gb', {
				weekday: 'short',
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
		'ID',
		'Color',
		'Diameter',
		'Material',
		'Weight',
		'Last dried',
		'Opening date',
		'Producer',
		'Empty weight',
		'Spool size'
	];

	function removeTableHeaderItem(item: string) {
		let index = tableHead.indexOf(item);

		if (index >= 0) {
			tableHead.splice(index, 1);
			tableHead = tableHead;
		}
	}

	function sortByColor() {}

	function sortByMaterial() {}

	function sortByLastDried() {}

	function sortByDiameter() {}

	function sortByWeight() {}
</script>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				{#each tableHead as headElement}
					<th>{headElement}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each stock as item, i}
				<tr>
					{#if tableHead.includes('ID')}
						<td>{item._id}</td>
					{/if}
					{#if tableHead.includes('Color')}
						<td>{item.color}</td>
					{/if}
					{#if tableHead.includes('Diameter')}
						<td>{item.diameter}</td>
					{/if}
					{#if tableHead.includes('Material')}
						<td>{item.material}</td>
					{/if}
					{#if tableHead.includes('Weight')}
						<td>{item.weight}</td>
					{/if}
					{#if tableHead.includes('Last dried')}
						<td>{item.lastDried}</td>
					{/if}
					{#if tableHead.includes('Opening date')}
						<td>{item.openingDate}</td>
					{/if}
					{#if tableHead.includes('Producer')}
						<td>{item.producer}</td>
					{/if}
					{#if tableHead.includes('Empty weight')}
						<td>{item.emptyWeight}</td>
					{/if}
					{#if tableHead.includes('Spool size')}
						<td>{item.spoolSize}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<button on:click={() => removeTableHeaderItem('Material')}>no material</button>
