// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { site } from './src/site.config.ts';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
	site: site.url,
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [[rehypeKatex, { output: 'html' }]],
		}),
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
		shikiConfig: {
			themes: { light: 'github-light', dark: 'catppuccin-mocha' },
		},
	},
	integrations: [mdx(), sitemap()],
});
