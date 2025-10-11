<script setup lang="ts">
defineProps({
	title: String,
	category: String,
	description: String,
	link: String
});
</script>

<template>
	<a class="card" :href="link">
		<div class="title-row">
			<h3 class="title">{{ title }}</h3>
			<Badge v-if="category" type="warning" :text="category" />
		</div>
		<p class="description">{{ description }}</p>
	</a>
</template>

<style scoped>
.card {
	border: 1px solid var(--vp-c-divider);
	border-radius: 1em;
	padding: 0.2em 1.5em;
	max-width: 400px;
	text-decoration: none;
	display: block;
	background: var(--vp-c-bg-soft);
	transition: border 100ms ease;
}

.card:hover {
	border: 1px solid var(--vp-c-brand);
}

.title-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 1em;
}

.title {
	color: var(--vp-c-text-1);
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0;
}

.description {
	font-size: 0.9rem;
	color: var(--vp-c-text-2);
	margin-top: 0.5rem;
}
</style>
