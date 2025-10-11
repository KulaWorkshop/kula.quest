import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import CardLink from './components/CardLink.vue';
import HexDump from './components/HexDump.vue';
import HexDumpSection from './components/HexDumpSection.vue';

const theme: Theme = {
	...DefaultTheme,
	enhanceApp({ app, router, siteData }) {
		DefaultTheme.enhanceApp({ app, router, siteData });
		app.component('CardLink', CardLink);
		app.component('HexDump', HexDump);
		app.component('HexDumpSection', HexDumpSection);
	}
};

export default theme;
