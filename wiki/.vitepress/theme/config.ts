import type { DefaultTheme } from 'vitepress';
import sidebar from './sidebar';

export const themeConfig: DefaultTheme.Config = {
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
				{
					text: 'Other Sites',
					items: [
						{ text: 'Main Homepage', link: 'https://kula.quest' },
						{ text: 'Kula Workshop', link: 'https://kulaworkshop.net' }
					]
				},
				{
					text: 'Socials',
					items: [
						{
							text: 'GitHub',
							link: 'https://github.com/KulaWorkshop/'
						},
						{
							text: 'Discord',
							link: 'https://discord.com/invite/cQzGRCW'
						}
					]
				}
			]
		}
	],
	sidebar,
	socialLinks: [
		{ icon: 'github', link: 'https://github.com/KulaWorkshop' },
		{ icon: 'discord', link: 'https://discord.com/invite/cQzGRCW' }
	],

	logo: '/favicon.svg'
};
