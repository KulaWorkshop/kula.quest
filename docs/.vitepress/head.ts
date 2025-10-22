import { HeadConfig } from 'vitepress';

const description =
	'A comprehensive technical research and documentation wiki for the PlayStation 1 game Kula Quest.';

const head: HeadConfig[] = [
	['link', { rel: 'icon', href: '/favicon.svg' }],
	['meta', { name: 'author', content: 'Brandon Gardenhire' }],
	[
		'meta',
		{
			name: 'keywords',
			content:
				'Kula World, Roll Away, Kula Quest, PlayStation, PS1, Wiki, Modding, Reverse Engineering, Game Formats, Documentation'
		}
	],

	['meta', { property: 'og:type', content: 'website' }],
	['meta', { property: 'og:title', content: 'Kula Quest Wiki' }],
	['meta', { property: 'og:description', content: description }],
	['meta', { property: 'og:url', content: 'https://wiki.kula.quest' }],
	['meta', { property: 'og:image', content: 'https://wiki.kula.quest/favicon.png' }],

	['meta', { name: 'twitter:card', content: 'summary' }],
	['meta', { name: 'twitter:title', content: 'Kula Quest Wiki' }],
	['meta', { name: 'twitter:description', content: description }],
	['meta', { name: 'twitter:image', content: 'https://wiki.kula.quest/favicon.png' }]
];

export { head, description };
