import { HeadConfig, PageData, TransformPageContext } from 'vitepress';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants';

function normalize(path: string) {
	return path.replace(/(^|\/)index\.md$/, '').replace(/\.md$/, '');
}

function createTitle(siteTitle: string, pageTitle: string) {
	const title = pageTitle || siteTitle;
	return title ? `${title} | ${siteTitle}` : siteTitle;
}

const headConfig: HeadConfig[] = [
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
	['meta', { property: 'og:site_name', content: SITE_NAME }],
	['meta', { property: 'og:title', content: SITE_NAME }],
	['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
	['meta', { property: 'og:url', content: SITE_URL }],
	['meta', { property: 'og:image', content: `${SITE_URL}/favicon.png` }],
	['meta', { name: 'twitter:card', content: 'summary' }],
	['meta', { name: 'twitter:title', content: SITE_NAME }],
	['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
	['meta', { name: 'twitter:image', content: `${SITE_URL}/favicon.png` }]
];

function transformPageData(pageData: PageData, ctx: TransformPageContext) {
	const url = new URL(normalize(pageData.relativePath), SITE_URL).href;
	const title = createTitle(ctx.siteConfig.site.title, pageData.title);
	const description = pageData.frontmatter?.description ?? ctx.siteConfig.site?.description;

	pageData.frontmatter.head ??= [];
	pageData.frontmatter.head.push(
		['meta', { property: 'og:url', content: url }],
		['meta', { property: 'og:title', content: title }],
		['meta', { property: 'og:description', content: description }],
		['meta', { name: 'twitter:title', content: title }],
		['meta', { name: 'twitter:description', content: description }],
		['link', { rel: 'canonical', href: url }]
	);
}

export { headConfig, transformPageData };
