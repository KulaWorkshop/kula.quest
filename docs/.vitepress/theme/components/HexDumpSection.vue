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
		class="relative cursor-help border-b-1 border-dotted font-mono transition-colors duration-200 hover:!text-red-400"
		@mouseenter="handleMouseEnter"
		@mouseleave="show = false"
		@click="toggleTooltip"
		:style="{ color: color || '#4ade80', 'border-color': color || '#4ade80' }"
	>
		{{ value
		}}<span
			v-if="show && note"
			class="pointer-events-none absolute -top-6 left-0 rounded-sm bg-neutral-950 px-2 py-1 text-sm whitespace-nowrap text-neutral-50 opacity-90"
			>{{ note }}</span
		>
	</span>
</template>
