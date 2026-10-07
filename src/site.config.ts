export const site = {
	title: 'Your Name',
	description: 'A personal technical publication',
	url: 'https://example.com',
	language: 'en',
	theme: {
		default: 'light' satisfies 'light' | 'dark' | 'system',
	},
	author: {
		name: 'Your Name',
		email: 'you@example.com',
	},
	navigation: [
		{ label: 'home', href: '/', shortcut: '1' },
		{ label: 'writing', href: '/blog', shortcut: '2' },
		{ label: 'about', href: '/about', shortcut: '0' },
	],
	links: [
		{ label: 'GitHub', href: 'https://github.com/example' },
	],
	seo: { index: true, socialImage: '/social/default.png' },
} as const;

export const canIndex = site.seo.index && process.env.SITE_ENV === 'production';
