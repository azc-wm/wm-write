# Article bundles

An article is a directory directly under `src/content/blog/`. Its files, sidecars and article-specific media stay together:

```text
src/content/blog/my-article/
├── index.md                 # or index.mdx; exactly one
├── left-aside.mdx           # optional
├── right-aside.mdx          # optional
└── assets/
    ├── hero.webp            # optional; at most one hero.*
    ├── social.png           # optional; at most one social.*
    └── diagram.svg
```

## Entrypoint and sidecars

Each directory must contain exactly one `index.md` or `index.mdx`. Having neither or both is invalid. The build/check validation reports the article directory and does not choose one by precedence.

`left-aside.mdx` and `right-aside.mdx` are discovered by those exact names. Either or both may be absent; missing files render no corresponding aside. They are not entries in the blog collection and need no frontmatter pointers. Other names do not act as sidecars.

## Local assets, hero and social preview

Put article-specific images in `assets/`. The currently supported extensions are `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg` and `webp`, matching the formats already discovered by the site. A `hero.*` file renders in the article header; no hero means no hero image or placeholder. A `social.*` file explicitly supplies the article's social preview. Each convention accepts at most one supported file. Duplicate candidates fail validation with their names; extension order never decides the winner.

Open Graph and Twitter use this deterministic fallback:

1. `assets/social.*`
2. `assets/hero.*`
3. the first remaining supported image in `assets/`, sorted by path/name in ascending order
4. `site.seo.socialImage`

The metadata layer makes the selected URL absolute using `site.url`. The fallback asset does not need to be referenced by the article body. Hero and social relationships are filesystem conventions, so article frontmatter does not include `heroImage` or `socialImage`.

## Light and dark image variants

For an image that needs separate artwork per theme, use two local assets in MDX and pair them with `image-light` and `image-dark` classes inside a `theme-image-pair` wrapper. The site crossfades between them when `data-theme="dark"` changes, including when the reader toggles themes. Its opacity transition and the theme color transitions share `--duration-normal`. Reduced-motion preferences shorten both. This uses CSS and does not add JavaScript. Ordinary Markdown images are unaffected. `kitchen-sink` contains a working example.

The collection frontmatter describes article meaning: `title`, `description`, `pubDate`, optional `updatedDate`, optional `draft`, and optional `tags`. `draft: true` articles remain available in development and are omitted from production pages, RSS and sitemap generation.

## Why the filesystem is the API

The folder is a self-contained bundle. Conventional names make optional resources discoverable without registries, relationship fields or a content-management layer. The Astro article route delegates discovery to the bundle resolver; `pnpm run doctor`, `pnpm dev`, `pnpm check` and `pnpm build` validate entrypoint and duplicate-image rules. Resolver behavior is covered by focused unit tests.
