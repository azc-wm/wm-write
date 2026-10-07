# Site configuration

`src/site.config.ts` is the public configuration entry point for site identity and behavior. Astro components consume these values directly, and `astro.config.mjs` derives its canonical `site` value from the same URL.

```ts
export const site = {
  title: 'Your Name',
  description: 'A personal technical publication',
  url: 'https://example.com',
  language: 'en',
  theme: { default: 'light' },

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

  seo: {
    index: true,
    socialImage: '/social/default.png',
  },
} as const;
```

## Fields

- `title` is the site name, base page title and RSS title.
- `description` is the default page and RSS description.
- `url` is the absolute canonical origin. Astro, canonical links, RSS, sitemap, robots and social metadata reuse it.
- `language` is the document and RSS language and controls displayed publication-date formatting. Use a BCP 47 tag such as `en`, `es` or `ca-ES`.
- `theme.default` accepts `light`, `dark` or `system`. It controls initial behavior, not palette values.
- `author.name` appears in the footer copyright.
- `author.email` is emitted as the author of RSS items.
- `navigation` renders the primary header links. An optional numeric `shortcut` activates the rendered link; configuring a link does not create its route.
- `links` renders provider-agnostic external links in the footer.
- `seo.index` allows production indexing. Preview safety still takes precedence.
- `seo.socialImage` is the root-relative fallback image used when an article bundle supplies no suitable image.

## Indexing by environment

Effective indexing is:

```ts
site.seo.index && process.env.SITE_ENV === 'production'
```

Development and preview builds emit `noindex, nofollow` and a blocking `robots.txt`. Set `SITE_ENV=production` only in the production deployment environment. If `seo.index` is false, production remains non-indexable.

## Configuration boundaries

The main configuration describes identity and behavior. Other public customization surfaces remain close to what they control:

- page copy lives in `src/content/welcome.mdx` and `src/content/about.mdx`;
- article metadata and content live in each article bundle;
- typography, spacing and layout scales live in `src/styles/tokens.css`;
- semantic palettes live in `src/styles/themes/`;
- the favicon and default social image use files under `public/`;
- `SITE_ENV` belongs to the build environment.

Routes, layouts, sidecars, RSS, sitemap, KaTeX, Mermaid and keyboard controllers are opinionated starter behavior rather than feature flags.
