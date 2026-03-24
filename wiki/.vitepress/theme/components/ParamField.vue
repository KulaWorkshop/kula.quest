<script setup lang="ts">
defineProps<{
	path: string;
	type?: string;
}>();
</script>

<template>
	<div class="param">
		<div class="param-header">
			<!-- <code class="param-name">{{ path }}</code> -->
			<span class="param-name">{{ path }}</span>
			<span v-if="type" class="param-type">{{ type }}</span>
		</div>

		<div class="param-body">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.param {
	border-bottom: 1px solid var(--vp-c-divider);
	padding: 14px 0;
}

.param-header {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 15px;
	margin-bottom: 15px;
}

/* .param-name {
	font-weight: 600;
	color: var(--vp-c-text-1);
} */

.param-name {
	font-family: var(--default-mono-font-family);
	font-weight: 600;
	color: var(--vp-code-color);
}

.param-type {
	font-weight: 500;
	font-size: 12px;
	padding: 1px 10px;
	border-radius: 6px;
	background: var(--vp-c-bg-soft);
	color: var(--vp-c-text-1);
	/* border: 1px solid var(--vp-c-divider); */
}

.param-body {
	color: var(--vp-c-text-2);
	font-size: 14px;
}
</style>
