# SEO and indexing

`src/site.config.ts` is the source for `site.url`, `site.seo.index`, and the default `site.seo.socialImage`. Astro uses `SITE_URL` when set, otherwise `site.url`, as its canonical site origin. `SITE_BASE` configures the deployment path prefix.

## Indexing policy

Effective indexing is exactly:

```ts
site.seo.index && process.env.SITE_ENV === 'production'
```

When true, pages emit `index, follow` and `/robots.txt` allows crawling and points to `/sitemap-index.xml`. Otherwise, pages emit `noindex, nofollow` and `/robots.txt` disallows crawling. Set `SITE_ENV=production` only for the production build; setting `site.seo.index` to `false` always disables indexing.

## Page metadata

Each page's canonical URL is its pathname resolved against the configured build origin (`SITE_URL` or `site.url`). The page title and description feed standard description metadata, Open Graph, and Twitter metadata. Article pages also emit `article:published_time` from `pubDate` and, when present, `article:modified_time` from `updatedDate`.

Open Graph and Twitter images use this order for articles:

1. `assets/social.*`
2. `assets/hero.*`
3. `site.seo.socialImage`

Other images under an article's `assets/` directory are not selected automatically. The selected image URL is made absolute against the configured build origin and deployment base. The global fallback should be a root-relative public image path, such as `/social/default.png`.
