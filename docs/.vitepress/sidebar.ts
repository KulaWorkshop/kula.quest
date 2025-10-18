import { DefaultTheme } from 'vitepress';

const sidebar: DefaultTheme.Sidebar = [
	{
		text: 'About',
		items: [{ text: 'Introduction', link: '/' }]
	},
	{
		text: 'Tools',
		items: [
			{
				text: 'Quilt',
				link: '/tools/quilt'
			},
			{
				text: 'MKSFX',
				link: '/tools/mksfx'
			}
		]
	},
	{
		text: 'Game Content',
		items: [
			{
				text: 'Releases',
				collapsed: false,
				link: '/content/releases',
				items: [
					{
						text: 'Main Releases',
						link: '/content/main-releases'
					}
				]
			},
			{
				text: 'Soundtracks',
				link: '/content/soundtracks'
			}
		]
	},
	{
		text: 'Formats',
		link: '/formats',
		items: [
			{
				text: 'Archives',
				collapsed: true,
				items: [
					{ text: 'Pak Format', link: '/formats/pak' },
					{ text: 'Kub Format', link: '/formats/kub' }
				]
			},
			{
				text: 'Levels',
				collapsed: true,
				items: [
					{ text: 'Level Format', link: '/formats/level' },
					{
						text: 'Object Table',
						link: '/formats/objects'
					}
				]
			},
			{
				text: 'Graphics',
				collapsed: true,
				items: [
					{ text: 'TGI Format', link: '/formats/tgi' },
					{ text: 'GGI Format', link: '/formats/ggi' }
				]
			},
			{
				text: 'Music',
				collapsed: true,
				items: [
					{
						text: 'XA Format',
						link: '/formats/xa'
					}
				]
			},
			{
				text: 'Sounds',
				collapsed: true,
				items: [
					{ text: 'SFX Format', link: '/formats/sfx' },
					{ text: 'Sound Table', link: '/formats/sounds' }
				]
			}
		]
	},
	{
		text: 'LLMs',
		collapsed: true,
		items: [
			{
				text: 'llms.txt',
				link: '/llms.txt'
			},
			{
				text: 'llms-full.txt',
				link: '/llms-full.txt'
			}
		]
	}
];

export default sidebar;
