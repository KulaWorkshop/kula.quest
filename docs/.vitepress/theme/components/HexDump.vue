<script setup lang="ts">
import { computed } from 'vue';
import HexDumpSection from './HexDumpSection.vue';

const props = defineProps<{
	hexDump: string;
}>();

interface HexPart {
	type: 'byte' | 'section';
	value: string;
	note?: string;
	color?: string;
}

interface HexLine {
	address: string;
	parts: HexPart[];
}

function parseSection(content: string): { part?: HexPart; consumed: number } {
	const sectionMatch = content.match(/^\[SECTION:([^\]]+)\]/);
	if (!sectionMatch) return { consumed: 0 };

	const [fullMatch, paramsString] = sectionMatch;
	const params = paramsString.split(';').reduce<Record<string, string>>((acc, param) => {
		const [key, ...rest] = param.split('=');
		if (key) acc[key.trim()] = rest.join('=').trim();
		return acc;
	}, {});

	if (!params.value) return { consumed: fullMatch.length };

	return {
		part: {
			type: 'section',
			value: params.value,
			note: params.note,
			color: params.color
		},
		consumed: fullMatch.length
	};
}

function parseLine(line: string): HexLine {
	const addressMatch = line.match(/^([0-9A-Fa-fh]+)\s+/);
	if (!addressMatch) {
		return { address: '', parts: [{ type: 'byte', value: line }] };
	}

	const address = addressMatch[1];
	let content = line.slice(addressMatch[0].length).trim();

	const parts: HexPart[] = [];

	while (content.length > 0) {
		const { part, consumed } = parseSection(content);
		if (part) {
			parts.push(part);
			content = content.slice(consumed).trim();
			continue;
		}

		const nextSpace = content.indexOf(' ');
		const byte = nextSpace === -1 ? content : content.slice(0, nextSpace);
		parts.push({ type: 'byte', value: byte });

		content = nextSpace === -1 ? '' : content.slice(nextSpace).trim();
	}

	return { address, parts };
}

const parsedHexDump = computed(() =>
	props.hexDump
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map(parseLine)
);
</script>

<template>
	<pre
		class="hex-dump"
	><code><span v-for="(line, index) in parsedHexDump" :key="index"><span class="address">{{ line.address }} </span> <template v-for="(part, partIndex) in line.parts" :key="partIndex"><HexDumpSection v-if="part.type === 'section'" :value="part.value" :note="part.note" :color="part.color" /> <span v-else>{{ part.value }}</span> </template><br></span></code></pre>
</template>

<style>
.hex-dump {
	background: var(--vp-code-block-bg);
	color: var(--vp-c-text-1);
	padding: 1em 2em;
	border-radius: 0.5em;
	overflow-x: auto;
	font-family: monospace;
	line-height: 1.5;
	white-space: pre;
	position: relative;
}

.hex-dump code {
	color: inherit;
	display: block;
	white-space: pre;
}

.address {
	color: #60a5fa;
}
</style>
