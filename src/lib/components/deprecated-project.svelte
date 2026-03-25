<script lang="ts">
	import ExternalLink from '@lucide/svelte/icons/external-link';

	let { Icon, href, title, description } = $props();
</script>

<a
	class="group relative flex flex-col rounded-xl border border-neutral-700/50 bg-neutral-900/40 p-6 shadow-sm hover:border-neutral-600 hover:bg-neutral-800/50 hover:shadow-md"
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<div class="flex items-start justify-between gap-3">
		<div
			class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 text-neutral-400 transition-colors"
		>
			<Icon class="size-5" strokeWidth={2} />
		</div>
		<ExternalLink
			class="size-4 shrink-0 text-neutral-600 transition-colors group-hover:text-neutral-400"
			strokeWidth={2}
		/>
	</div>
	<h3 class="mt-4 font-semibold text-neutral-200">{title}</h3>
	<p class="mt-1 text-sm leading-relaxed text-neutral-500">
		{description}
	</p>
	<span
		class="mt-4 inline-flex w-fit rounded-md bg-amber-800/30 px-2 py-0.5 text-xs font-medium text-amber-200/90"
	>
		Deprecated
	</span>
</a>
