import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { articleImageExtensions, selectArticleEntrypoint } from '../src/lib/content/article-bundle.js';

const root = resolve('src/content/blog');
const supported = new Set(articleImageExtensions);

for (const entry of await readdir(root, { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const directory = `${root}/${entry.name}`;
	const files = await readdir(directory, { withFileTypes: true });
	const names = files.map(({ name }) => `src/content/blog/${entry.name}/${name}`);
	selectArticleEntrypoint(names, `src/content/blog/${entry.name}`);
	const assets = files.find((file) => file.isDirectory() && file.name === 'assets');
	if (!assets) continue;
	const assetNames = (await readdir(`${directory}/assets`)).filter((name) => {
		const extension = name.split('.').at(-1)?.toLowerCase();
		return supported.has(extension);
	});
	for (const convention of ['hero', 'social']) {
		const matches = assetNames.filter((name) => name.match(/^([^.]+)\./)?.[1] === convention);
		if (matches.length > 1) {
			throw new Error(`Article "${entry.name}" has multiple ${convention} images: ${matches.join(', ')}.`);
		}
	}
}

console.log('Article bundle contract is valid.');
