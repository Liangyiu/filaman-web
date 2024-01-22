<script lang="ts">
	import ApexChart, { ApexCharts } from '$lib/ApexChart/ApexChart.svelte';
	import type { SvelteApexOptions, SvelteApexSeries } from '$lib/ApexChart/types.js';

	export let data;

	let options = [
		{
			description: 'in the last 7 days',
			dropdownDescription: 'Last 7 days',
			axisDescriptions: data.dropdownData[0].map((day) => {
				return day.dateString;
			}),
			dataPoints: data.dropdownData[0].map((data) => {
				return data.filamentUsed;
			}),
			totalFilamentUsed: data.dropdownData[0].reduce((prev, curr) => {
				return prev + curr.filamentUsed;
			}, 0)
		},
		{
			description: 'last month',
			dropdownDescription: 'Last 30 days',
			axisDescriptions: data.dropdownData[1].map((day) => {
				return day.dateString;
			}),
			dataPoints: data.dropdownData[1].map((data) => {
				return data.filamentUsed;
			}),
			totalFilamentUsed: data.dropdownData[1].reduce((prev, curr) => {
				return prev + curr.filamentUsed;
			}, 0)
		},
		{
			description: 'in the last 3 months',
			dropdownDescription: 'Last 90 days',
			axisDescriptions: data.dropdownData[2].map((day) => {
				return day.dateString;
			}),
			dataPoints: data.dropdownData[2].map((data) => {
				return data.filamentUsed;
			}),
			totalFilamentUsed: data.dropdownData[2].reduce((prev, curr) => {
				return prev + curr.filamentUsed;
			}, 0)
		}
	];
	let selectedOption = options[0];

	$: chartOptions = {
		chart: {
			height: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: true,
				tools: {
					download: false
				}
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		xaxis: {
			categories: selectedOption.axisDescriptions,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: false
		}
	} as SvelteApexOptions;

	$: chartSeries = [
		{
			name: 'Filament used (in g)',
			data: selectedOption.dataPoints,
			color: '#1A56DB'
		}
	] as SvelteApexSeries;

	let showDropdown = false;
</script>

<div class="container h-full mx-auto justify-center items-center py-4 px-15">
	<div class="mb-4 w-full text-token grid grid-cols-1 md:grid-cols-3 gap-4">
		<!-- / -->
		<div class="card">
			<div class="p-4 space-y-4">
				{#if data.stats.filamentUsageToday > 999}
					<h3 class="h3 text-center" data-toc-ignore>
						{parseFloat((data.stats.filamentUsageToday / 1000).toFixed(2))}kg
					</h3>
				{:else}
					<h3 class="h3 text-center" data-toc-ignore>{data.stats.filamentUsageToday}g</h3>
				{/if}
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<h6 class="font-bold" data-toc-ignore>Filament used today</h6>
					</div>
				</footer>
			</div>
		</div>
		<div class="card">
			<div class="p-4 space-y-4">
				<h3 class="h3 text-center" data-toc-ignore>{data.stats.spoolCount}</h3>
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<h6 class="font-bold" data-toc-ignore>Spools in stock</h6>
					</div>
				</footer>
			</div>
		</div>
		<div class="card max-w-10">
			<div class="p-4 space-y-4">
				<h3 class="h3 text-center" data-toc-ignore>{data.stats.last24HrEventCount}</h3>
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<h6 class="font-bold" data-toc-ignore>Events in the last 24 hours</h6>
					</div>
				</footer>
			</div>
		</div>
	</div>
	<div class="mb-4 w-full rounded-lg shadow bg-surface-800 p-4 md:p-6">
		<div class="flex justify-between">
			<div>
				{#if selectedOption.totalFilamentUsed > 999}
					<h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
						{parseFloat((selectedOption.totalFilamentUsed / 1000).toFixed(2))}kg
					</h5>
				{:else}
					<h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
						{selectedOption.totalFilamentUsed}g
					</h5>
				{/if}

				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					Filament used {selectedOption.description}
				</p>
			</div>
		</div>
		<ApexChart options={chartOptions} series={chartSeries} animate />
		<div
			class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
		>
			<div class="flex justify-between items-center pt-5 relative">
				<!-- Button -->
				<button
					id="dropdownDefaultButton"
					class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
					type="button"
					on:click={() => {
						showDropdown = !showDropdown;
					}}
				>
					{selectedOption.dropdownDescription}
					<svg
						class="w-2.5 m-2.5 ms-1.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</button>
				<!-- Dropdown menu -->
				<div
					id="lastDaysdropdown"
					class:hidden={showDropdown === false}
					class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow max-w-32 dark:bg-gray-700"
				>
					<ul
						class="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDefaultButton"
					>
						<li>
							<button
								class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								on:click={() => {
									selectedOption = options[0];
									showDropdown = false;
								}}>Last 7 days</button
							>
						</li>
						<li>
							<button
								class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								on:click={() => {
									selectedOption = options[1];
									showDropdown = false;
								}}>Last 30 days</button
							>
						</li>
						<li>
							<button
								class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								on:click={() => {
									selectedOption = options[2];
									showDropdown = false;
								}}>Last 90 days</button
							>
						</li>
					</ul>
				</div>
				<a
					href="/stock"
					class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
				>
					Stock
					<svg
						class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 9 4-4-4-4"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	#lastDaysdropdown {
		position: absolute;
		left: -15px;
		bottom: 40px;
	}
	@media only screen and (max-width: 767px) {
		#lastDaysdropdown {
			position: absolute;
			left: -5px;
			bottom: 40px;
		}
	}
</style>
