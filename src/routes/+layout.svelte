<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Kula Quest</title>
</svelte:head>

{@render children()}
