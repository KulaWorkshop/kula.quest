import { defineConfig } from 'vitepress';
import tailwind from '@tailwindcss/vite';
import footnotePlugin from 'markdown-it-footnote';
import { SITE_CONFIG, headConfig, transformPageData } from './head';
import { themeConfig } from './theme/config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	vite: {
		plugins: [tailwind()]
	},
	markdown: {
		config: (md) => {
			md.use(footnotePlugin);
		}
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
