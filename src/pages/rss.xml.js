// @ts-check

import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { site } from '../site.config';

export async function GET() {
	const posts = (await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	return rss({
		title: site.title,
		description: site.description,
		site: site.url,
		customData: `<language>${site.language}</language>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			author: site.author.email,
			categories: post.data.tags,
		})),
	});
}
