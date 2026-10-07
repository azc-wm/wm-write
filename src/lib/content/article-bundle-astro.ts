import type { ImageMetadata } from 'astro';
import { resolveArticleBundle } from './article-bundle.js';

const images = import.meta.glob<ImageMetadata>('../../content/blog/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', { eager: true, import: 'default' });
const entries = import.meta.glob('../../content/blog/**/index.{md,mdx}');
const sidecars = import.meta.glob<any>('../../content/blog/**/{left-aside,right-aside}.mdx', { eager: true, import: 'default' });

export function getArticleBundle(post: { id: string }) {
	const toContractPath = (path: string) => path.replace('../../', 'src/');
	const files = [
		...Object.keys(entries).map(toContractPath),
		...Object.keys(images).map(toContractPath),
		...Object.keys(sidecars).map(toContractPath),
	];
	const bundle = resolveArticleBundle({ id: post.id, files });
	const imageFor = (path?: string) => path ? images[`../../${path.replace(/^src\//, '')}`] : undefined;
	return {
		heroImage: imageFor(bundle.hero),
		socialImage: imageFor(bundle.socialImage),
		LeftAside: bundle.leftAsidePath ? sidecars[`../../${bundle.leftAsidePath.replace(/^src\//, '')}`] : undefined,
		RightAside: bundle.rightAsidePath ? sidecars[`../../${bundle.rightAsidePath.replace(/^src\//, '')}`] : undefined,
	};
}
