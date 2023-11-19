<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={closeDrawer}>Home</a></li>
		<li class="active"><a href="/stock" on:click={closeDrawer}>Stock</a></li>
	</ul>
</nav>
