# Astro Editorial Blog Starter

A static, keyboard-friendly technical blog built with Astro. The layout is intentionally editorial: a centered article, optional side rails, a table of contents, and a small set of adjustable theme tokens.

## Features

- Astro static output with Markdown and MDX posts
- Folder-per-post content with optional left and right sidecars
- Table of contents, tags, publication and update dates
- Shiki syntax highlighting, Mermaid diagrams, and KaTeX math
- Light and dark themes, responsive three-column article layout, and adjustable reading width
- Keyboard navigation, RSS, sitemap, canonical URLs, Open Graph, and Twitter metadata
- Cloudflare Workers static asset deployment, with Vercel and Netlify guidance

## Quick start

Requirements: Node.js 22.12 or later and pnpm.

```sh
pnpm install
pnpm dev
pnpm run doctor
pnpm check
pnpm test
pnpm build
```

Astro starts in the background and serves the local site at `http://localhost:4321`. Manage it with `pnpm exec astro dev status`, `pnpm exec astro dev logs`, and `pnpm exec astro dev stop`. Local and preview builds are non-indexable by default. Set `SITE_ENV=production` only in the production build environment.

## Site configuration

Edit [`src/site.config.ts`](src/site.config.ts) for the site title, description, canonical URL, language, author, navigation, numeric navigation shortcuts, external links shown in the footer, initial theme behavior, indexing policy, and default social image. Components read identity from this file.

See the [site configuration contract](docs/features/site-configuration.md) for how each field is consumed and which settings intentionally live elsewhere.

Set `seo.index` to `false` to keep a production site out of search indexes. A site is indexable only when that setting is true and the build has `SITE_ENV=production`; every other build emits `noindex` metadata and a blocking `robots.txt`.

## Writing posts

Each post has its own folder and must contain exactly one entrypoint: `index.md` or `index.mdx`. Having both or neither is an error. Sidecars and assets stay alongside the article:

```text
src/content/blog/my-post/
├── index.md
├── left-aside.mdx    # optional
├── right-aside.mdx   # optional
└── assets/
    ├── hero.webp      # optional, at most one
    ├── social.png     # optional, at most one
    └── image.png
```

Use frontmatter fields `title`, `description`, `pubDate`, `updatedDate`, `draft`, and `tags`. Drafts appear during development and are excluded from production pages, RSS, and sitemap. The included demo articles are drafts, so they remain available while developing and do not ship in production unless you remove `draft: true`. `customizing-the-starter` provides a short setup walkthrough, while `kitchen-sink` demonstrates the article features and explains when to use Markdown or MDX.

Both sidecars are optional. Name them exactly `left-aside.mdx` and `right-aside.mdx`; no frontmatter or registry is needed. Reference colocated images with paths such as `./assets/image.png`. Supported image formats are AVIF, GIF, JPEG, JPG, PNG, SVG, and WebP.

`assets/hero.*` supplies the visible article hero. `assets/social.*` supplies the article's social preview. Each may have at most one supported file. Open Graph and Twitter image fallback is `social.*`, then `hero.*`, then the first remaining supported image in `assets/` sorted by path/name, then `site.seo.socialImage`. The fallback image does not need to appear in the article body.

For artwork that needs separate light and dark variants, see the paired `image-light` / `image-dark` example in [`kitchen-sink`](src/content/blog/kitchen-sink/index.mdx). It crossfades with the site's current theme using CSS. The image and theme-color transitions share `--duration-normal` (300 ms), and reduced-motion preferences shorten both.

Run `pnpm run doctor` to validate article bundles directly. The same validation runs before `pnpm dev`, `pnpm check`, and `pnpm build`.

For the exact filesystem and reserved-route contracts, see [article bundles](docs/features/article-bundles.md) and [the route contract](docs/features/route-contract.md).

## Theme customization

Edit [`src/styles/tokens.css`](src/styles/tokens.css) for shared typography, spacing, reading width, radii, and motion duration. Edit [`src/styles/themes/light.css`](src/styles/themes/light.css) and [`src/styles/themes/dark.css`](src/styles/themes/dark.css) for the semantic color palettes. `src/styles/theme.css` composes these files. Set `theme.default` in `src/site.config.ts` to `light`, `dark`, or `system`; the starter default is `light`. See the [theme contract](docs/features/themes.md) for token details and preference behavior.

## Keyboard shortcuts

- Configured number keys follow the matching navigation link in `site.config.ts`.
- `m` toggles the theme; `+` and `-` change reading width; `Escape` clears focus; `Backspace` goes back.
- In articles, hold `j` or `k` to scroll down or up.
- In archives and static pages, `j`/`k` or arrow keys move focus. In the archive, `h`/`l` collapse or expand and `Enter` toggles a section.

Every action also has an ordinary link, button, or native HTML interaction.

## SEO, RSS, and sitemap

Canonical URLs and the Astro sitemap use `site.url`. The sitemap and `/rss.xml` are built in. RSS uses the configured title, description, URL, language, and author email, includes non-draft posts newest first, and provides post summaries and tags.

For non-production builds, `/robots.txt` disallows crawling and every page emits `noindex, nofollow`. Production indexability also requires `site.seo.index: true`. When enabled, robots allows crawling and points to the configured sitemap.

Page descriptions and social metadata come from page and post content. Article Open Graph and Twitter images follow this order: `assets/social.*`, `assets/hero.*`, first remaining supported image in the article's `assets/` folder sorted by path/name, then `site.seo.socialImage`. Image URLs are absolute. Use a 1200 × 630 image for social previews. Replace `public/social/default.png` with your own fallback.

## Deployment

All deployment targets use Astro's static output in `dist/`. Build with `SITE_ENV=production` only for the production deployment; preview builds should leave it unset.

### Cloudflare Workers

The included `wrangler.jsonc` publishes `dist/` as static assets. Connect the repository to a Cloudflare Worker or deploy with Wrangler:

```sh
SITE_ENV=production pnpm build
pnpm exec wrangler deploy
```

Add a custom domain through Cloudflare after deployment; no personal domain or route is configured here.

### Vercel

Import the repository and use `pnpm install`, `pnpm build`, and `dist` as the output directory. Set `SITE_ENV=production` for the production environment only.

### Netlify

Build with `pnpm build` and publish `dist`. Set `SITE_ENV=production` for the production deploy context only.

## Project structure

```text
src/
├── components/        # header, footer, metadata, article UI
├── content/
│   ├── blog/          # folder-per-post collection
│   ├── about.mdx      # editable About page
│   └── welcome.mdx    # editable home introduction
├── layouts/
├── lib/input/         # keyboard and page interaction controllers
├── pages/             # home, archive, posts, RSS, robots, 404
├── site.config.ts     # identity and navigation
└── styles/            # shared tokens, theme palettes, and global styles
```

This is an opinionated starter, not a theme framework. Edit content and configuration for a normal site; change components only when you want to change how the design works.

## License

MIT. See [LICENSE](LICENSE).
