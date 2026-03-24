<script lang="ts">
	import DeprecatedProject from '$lib/components/deprecated-project.svelte';
	import Book from '@lucide/svelte/icons/book';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Package from '@lucide/svelte/icons/package';
</script>

<main>
	<div class="mx-auto mt-20 max-w-[1000px] px-4 sm:mt-32 sm:px-5 lg:mt-45">
		<div class="mx-auto max-w-screen-sm">
			<div class="flex items-center justify-center">
				<p
					class="rounded-xl bg-neutral-900 px-4 py-1 text-center text-sm font-bold text-neutral-500 sm:text-lg"
				>
					Coming Soon
				</p>
			</div>

			<h1 class="mt-6 text-center text-4xl leading-tight font-bold text-neutral-200 sm:text-5xl sm:leading-16">
				Preserving a Piece of <span class="text-red-400">PlayStation</span> History.
			</h1>
			<p class="mt-6 text-center text-base leading-relaxed font-medium text-neutral-400 sm:mt-8 sm:text-lg">
				A new archive project dedicated to the preservation of the PlayStation 1 game <span
					class="font-semibold text-neutral-200">Kula Quest</span
				>, brought to you by the original Kula Workshop team. Soon, this will be our new homepage,
				so stay tuned!
			</p>

			<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
				<a
					class="rainbow-border flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-medium text-neutral-950 sm:w-auto"
					href="https://wiki.kula.quest"
					target="_blank"
				>
					<Book strokeWidth={2.5} class="size-5" />Visit Wiki
				</a>

				<a
					class="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700/50 bg-neutral-900 px-5 py-2 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-800 sm:w-auto"
					href="https://github.com/KulaWorkshop/"
					target="_blank"
					><svg class="size-6 fill-neutral-100" viewBox="0 0 1024 1024" fill="none"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
							transform="scale(64)"
						/></svg
					>GitHub</a
				>
			</div>
		</div>

		<h2
			class="mt-24 border-t border-neutral-700/30 pt-12 text-2xl font-bold text-neutral-200 sm:mt-40 sm:pt-20 sm:text-3xl"
		>
			Legacy Tools
		</h2>
		<p class="mt-3 text-base leading-relaxed font-medium text-neutral-400 sm:text-lg">
			These tools are no longer maintained and are not recommended for use, but are still available.
		</p>
		<div class="mt-8 mb-50 grid gap-4 sm:grid-cols-2">
			<DeprecatedProject
				Icon={LayoutGrid}
				href="/tools/level-editor"
				title="Level Editor"
				description="A browser-based level editor for viewing and editing levels."
			/>
			<DeprecatedProject
				Icon={Package}
				href="/tools/pak-editor"
				title="Pak Editor"
				description="A browser-based editor for game archive PAK files."
			/>
		</div>
	</div>
</main>

<style>
	@property --wiki-rainbow-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	.rainbow-border {
		border: 2px solid transparent;
		background:
			linear-gradient(#eee, #eee) padding-box,
			conic-gradient(
					from var(--wiki-rainbow-angle),
					#ff006e,
					#ffbe0b,
					#06ffa5,
					#3a86ff,
					#8338ec,
					#ff006e
				)
				border-box;
		background-origin: padding-box, border-box;
		background-clip: padding-box, border-box;
		animation: wiki-rainbow-angle 3.5s linear infinite;
	}

	@keyframes wiki-rainbow-angle {
		to {
			--wiki-rainbow-angle: 360deg;
		}
	}
</style>
