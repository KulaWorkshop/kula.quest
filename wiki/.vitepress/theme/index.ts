import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import { themeConfig } from './config';
import CardLink from './components/CardLink.vue';
import HexDump from './components/HexDump.vue';
import HexDumpSection from './components/HexDumpSection.vue';
import ParamField from './components/ParamField.vue';
import './style.css';

const theme: Theme = {
	...DefaultTheme,
	enhanceApp({ app, router, siteData }) {
		DefaultTheme.enhanceApp({ app, router, siteData });
		app.component('CardLink', CardLink);
		app.component('HexDump', HexDump);
		app.component('HexDumpSection', HexDumpSection);
		app.component('ParamField', ParamField);
	}
};

export { themeConfig };

export default theme;
