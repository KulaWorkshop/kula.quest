import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Kula Quest',
    description:
        'An archival project dedicated to the preservation of Kula Quest knowledge and resources.',
    lastUpdated: true,
    cleanUrls: true,
    themeConfig: {
        outline: 'deep',
        search: {
            provider: 'local',
        },
        nav: [
            { text: 'Documentation', link: '/' },
            { text: 'Blog', link: '/blog' },
            { text: 'Home', link: 'https://kula.quest' },
        ],
        sidebar: [
            {
                text: 'About',
                items: [{ text: 'Introduction', link: '/' }],
            },
            {
                text: 'Formats',
                items: [
                    { text: 'Pak Format', link: '/formats/pak' },
                    { text: 'Kub Format', link: '/formats/kub' },
                    { text: 'TGI Format', link: '/formats/tgi' },
                    { text: 'GGI Format', link: '/formats/ggi' },
                    { text: 'SFX Format', link: '/formats/sfx' },
                    { text: 'Level Format', link: '/formats/level' },
                    {
                        text: 'Object Database',
                        link: '/formats/objects',
                    },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/KulaWorkshop' },
            { icon: 'discord', link: 'https://discord.com/invite/cQzGRCW' },
        ],

        logo: '/favicon.svg',
    },
    head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
});
