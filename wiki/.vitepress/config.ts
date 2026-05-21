import { defineConfig } from 'vitepress';
import tailwind from '@tailwindcss/vite';
import footnotePlugin from 'markdown-it-footnote';
import { SITE_CONFIG, headConfig, transformPageData } from './head';
import { themeConfig } from './theme/config';

import { readFileSync } from 'fs';
import { resolve } from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	vite: {
		plugins: [tailwind()]
	},
	markdown: {
		config: (md) => {
			md.use(footnotePlugin);
		},
		languages: [
			{
				name: 'bstruct',
				aliases: ['bstruct'],
				...JSON.parse(readFileSync(resolve(__dirname, './binary-struct.tmLanguage.json'), 'utf-8'))
			}
		]
	},
	head: headConfig,
	transformPageData,
	lang: 'en-US',
	title: SITE_CONFIG.title,
	description: SITE_CONFIG.description,
	lastUpdated: true,
	cleanUrls: true,
	themeConfig
});
