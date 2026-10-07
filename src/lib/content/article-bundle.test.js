import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveArticleBundle, selectArticleEntrypoint } from './article-bundle.js';

const dir = 'src/content/blog/post';

test('accepts exactly one Markdown or MDX article entrypoint', () => {
	assert.equal(selectArticleEntrypoint([`${dir}/index.md`], dir), 'index.md');
	assert.equal(selectArticleEntrypoint([`${dir}/index.mdx`], dir), 'index.mdx');
	assert.throws(() => selectArticleEntrypoint([`${dir}/index.md`, `${dir}/index.mdx`], dir), /exactly one/);
	assert.throws(() => selectArticleEntrypoint([], dir), /exactly one/);
});

test('resolves optional sidecars and no hero or social image', () => {
	const base = [`${dir}/index.md`];
	assert.deepEqual(resolveArticleBundle({ id: 'post', files: base }), {
		index: 'index.md', leftAsidePath: undefined, rightAsidePath: undefined, hero: undefined, socialImage: undefined,
	});
	assert.equal(resolveArticleBundle({ id: 'post', files: [...base, `${dir}/left-aside.mdx`] }).leftAsidePath, `${dir}/left-aside.mdx`);
	assert.equal(resolveArticleBundle({ id: 'post', files: [...base, `${dir}/right-aside.mdx`] }).rightAsidePath, `${dir}/right-aside.mdx`);
	const both = resolveArticleBundle({ id: 'post', files: [...base, `${dir}/left-aside.mdx`, `${dir}/right-aside.mdx`] });
	assert.ok(both.leftAsidePath && both.rightAsidePath);
});

test('resolves one conventional hero and rejects ambiguous candidates', () => {
	const base = [`${dir}/index.mdx`, `${dir}/assets/hero.webp`];
	assert.equal(resolveArticleBundle({ id: 'post', files: base }).hero, `${dir}/assets/hero.webp`);
	assert.throws(() => resolveArticleBundle({ id: 'post', files: [...base, `${dir}/assets/hero.png`] }), /multiple hero images/);
});

test('uses social, hero, first remaining assets image in precedence order', () => {
	const index = `${dir}/index.md`;
	const first = `${dir}/assets/a-diagram.svg`;
	const second = `${dir}/assets/z-screenshot.png`;
	const hero = `${dir}/assets/hero.webp`;
	const social = `${dir}/assets/social.png`;
	const files = [index, second, first, hero, social];
	const resolve = (subset) => resolveArticleBundle({ id: 'post', files: subset });
	assert.equal(resolve(files).socialImage, social);
	assert.equal(resolve(files.filter((file) => file !== social)).socialImage, hero);
	assert.equal(resolve(files.filter((file) => file !== social && file !== hero)).socialImage, first);
	assert.equal(resolve([index]).socialImage, undefined);
	assert.throws(() => resolve([...files, `${dir}/assets/social.webp`]), /multiple social images/);
});
