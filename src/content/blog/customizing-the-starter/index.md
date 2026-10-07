---
title: Customizing the starter
description: The small set of files to edit before publishing your own site.
pubDate: '2026-09-15'
draft: true
tags: [example, configuration, theme]
---

Most sites built from this starter only need changes in three places: site configuration, content, and visual tokens. The components and layouts can stay as they are.

## Configure the publication

Edit `src/site.config.ts` to set the site's identity and behavior:

```ts
export const site = {
  title: 'Your Name',
  description: 'A personal technical publication',
  url: 'https://example.com',
  language: 'en',
  theme: { default: 'system' },
  author: {
    name: 'Your Name',
    email: 'you@example.com',
  },
  navigation: [
    { label: 'home', href: '/', shortcut: '1' },
    { label: 'writing', href: '/blog', shortcut: '2' },
    { label: 'about', href: '/about', shortcut: '0' },
  ],
  links: [{ label: 'GitHub', href: 'https://github.com/example' }],
  seo: {
    index: true,
    socialImage: '/social/default.png',
  },
} as const;
```

Navigation entries become header links. Their optional numeric shortcuts activate those same rendered links. External links appear in the footer.

## Replace the starter content

The home introduction lives in `src/content/welcome.mdx` and the About copy in `src/content/about.mdx`. Articles are self-contained directories under `src/content/blog/`:

```text
src/content/blog/my-article/
├── index.md              # or index.mdx; exactly one
├── left-aside.mdx        # optional
├── right-aside.mdx       # optional
└── assets/               # optional article-local media
```

Delete the demo article directories when they are no longer useful. Set `draft: false`, or remove the field, to publish an article in production.

## Adjust the visual system

Shared typography, spacing, reading width, radius, and motion values live in `src/styles/tokens.css`. Light and dark semantic colors live in `src/styles/themes/light.css` and `src/styles/themes/dark.css`.

Change those public tokens for normal visual customization. Component CSS remains the implementation of the existing editorial design.

## Replace public assets

Replace `public/favicon.svg` and `public/social/default.png` with your own files. A 1200 × 630 image is a practical default for social previews. Individual articles can override it through their conventional `assets/social.*` or `assets/hero.*` files.

## Check and publish

Run the local checks before deployment:

```sh
pnpm run doctor
pnpm check
pnpm test
pnpm build
```

Preview builds stay non-indexable. Set `SITE_ENV=production` only in the production deployment environment; `site.seo.index` still decides whether that production build may be indexed.
