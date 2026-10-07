export const articleImageExtensions = ['avif', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'];

export function selectArticleEntrypoint(files, directory) {
	const entries = ['index.md', 'index.mdx'].filter((name) => files.includes(`${directory}/${name}`));
	if (entries.length !== 1) {
		throw new Error(
			`Article "${directory}" must contain exactly one of index.md or index.mdx; found ${entries.length}.`,
		);
	}
	return entries[0];
}

function selectUnique(files, pattern, label, directory) {
	const candidates = files.filter((file) => pattern.test(file));
	if (candidates.length > 1) {
		throw new Error(`Article "${directory}" has multiple ${label} images: ${candidates.join(', ')}.`);
	}
	return candidates[0];
}

export function resolveArticleBundle({ id, files }) {
	const directory = `src/content/blog/${id}`;
	const index = selectArticleEntrypoint(files, directory);
	const imageExtensions = articleImageExtensions.join('|');
	const hero = selectUnique(files, new RegExp(`^${directory}/assets/hero\\.(?:${imageExtensions})$`, 'i'), 'hero', id);
	const socialImage = selectUnique(files, new RegExp(`^${directory}/assets/social\\.(?:${imageExtensions})$`, 'i'), 'social', id);
	const firstAssetImage = files
		.filter((file) => file.startsWith(`${directory}/assets/`) && new RegExp(`\\.(?:${imageExtensions})$`, 'i').test(file))
		.filter((file) => file !== hero && file !== socialImage)
		.sort()[0];

	return {
		index,
		leftAsidePath: files.includes(`${directory}/left-aside.mdx`) ? `${directory}/left-aside.mdx` : undefined,
		rightAsidePath: files.includes(`${directory}/right-aside.mdx`) ? `${directory}/right-aside.mdx` : undefined,
		hero,
		socialImage: socialImage ?? hero ?? firstAssetImage,
	};
}
