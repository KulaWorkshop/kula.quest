import { defineConfig } from 'vitepress';
import footnote_plugin from 'markdown-it-footnote';
import sidebar from './sidebar';
import { head, description } from './head';
import tailwind from '@tailwindcss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	vite: {
		// @ts-expect-error https://github.com/tailwindlabs/tailwindcss/issues/18802
		plugins: [tailwind()]
	},
	markdown: {
		config: (md) => {
			md.use(footnote_plugin);
		}
	},
	lang: 'en-US',
	title: 'Kula Quest Wiki',
	description,
	lastUpdated: true,
	cleanUrls: true,
	themeConfig: {
		outline: 'deep',
		externalLinkIcon: true,
		editLink: {
			pattern: 'https://github.com/kulaworkshop/kula.quest/edit/main/docs/:path'
		},
		search: {
			provider: 'local'
		},
		nav: [
			{
				text: 'Resources',
				items: [
					{ text: 'Main Homepage', link: 'https://kula.quest' },
					{ text: 'Kula Workshop', link: 'https://kulaworkshop.net' }
				]
			}
		],
		sidebar,
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/KulaWorkshop' },
			{ icon: 'discord', link: 'https://discord.com/invite/cQzGRCW' }
		],

		logo: '/favicon.svg'
	},
	head
});
