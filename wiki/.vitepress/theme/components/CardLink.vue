<script setup lang="ts">
defineProps({
	name: String,
	category: String,
	description: String,
	link: String
});
</script>

<template>
	<a
		class="rounded-2xl bg-[var(--card-link-bg)] px-6 py-1 !no-underline hover:bg-[var(--card-link-bg-hover)]"
		:href="link"
	>
		<div class="mt-4 flex items-center justify-between">
			<h3 class="!m-0 !text-lg text-[var(--vp-c-text-1)]">{{ name }}</h3>
			<Badge v-if="category" type="warning" :text="category" />
		</div>
		<p class="!mt-2 text-sm text-[var(--vp-c-text-2)]">{{ description }}</p>
	</a>
</template>
