import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveArticleBundle, selectArticleEntrypoint, selectArticleSocialImage } from './article-bundle.js';

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

test('arbitrary assets never become an implicit social image', () => {
	const index = `${dir}/index.md`;
	const first = `${dir}/assets/a-debug-diagram.svg`;
	const second = `${dir}/assets/z-image.png`;
	const files = [index, second, first];
	assert.equal(resolveArticleBundle({ id: 'post', files }).socialImage, undefined);
});

test('selects social, then hero, then the global fallback', () => {
	const social = `${dir}/assets/social.png`;
	const hero = `${dir}/assets/hero.webp`;
	const fallback = '/social/default.png';
	assert.equal(selectArticleSocialImage({ socialImage: social, hero, fallback }), social);
	assert.equal(selectArticleSocialImage({ hero, fallback }), hero);
	assert.equal(selectArticleSocialImage({ fallback }), fallback);
	assert.throws(() => resolveArticleBundle({ id: 'post', files: [`${dir}/index.md`, social, `${dir}/assets/social.webp`] }), /multiple social images/);
	assert.throws(() => resolveArticleBundle({ id: 'post', files: [`${dir}/index.md`, hero, `${dir}/assets/hero.png`] }), /multiple hero images/);
});
