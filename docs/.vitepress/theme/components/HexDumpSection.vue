<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
	value: string;
	note?: string;
	color?: string;
}>();

const show = ref(false);
const isMobile = ref(false);

onMounted(() => {
	isMobile.value = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
});

const toggleTooltip = () => (show.value = !show.value);

const handleMouseEnter = () => {
	if (!isMobile.value) {
		show.value = true;
	}
};
</script>

<template>
	<span
		class="section"
		@mouseenter="handleMouseEnter"
		@mouseleave="show = false"
		@click="toggleTooltip"
		:style="{ color: color || '#4ade80', 'border-color': color || '#4ade80' }"
	>
		{{ value }}<span v-if="show && note" class="tooltip">{{ note }}</span>
	</span>
</template>

<style scoped>
.section {
	font-family: monospace;
	position: relative;
	cursor: help;
	transition: color 0.2s ease;
	border-bottom-style: dotted;
	border-bottom-width: 1px;
}

.section:hover {
	color: #f87171 !important;
}

.tooltip {
	background: #111;
	color: #eee;
	position: absolute;
	top: -1.5em;
	left: 0;
	white-space: nowrap;
	padding: 0.25em 0.5em;
	border-radius: 0.25em;
	font-size: 0.8em;
	pointer-events: none;
	opacity: 0.9;
}
</style>
