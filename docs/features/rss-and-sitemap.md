# RSS and sitemap

## RSS feed

The feed is available at `/rss.xml`. It uses `site.title`, `site.description`, `site.url`, `site.language`, and `site.author.email` from `src/site.config.ts`. Feed items link to `/blog/{article-id}/`, include the article title, description, publication date, author email, and tags as RSS categories.

Items are ordered by publication date, newest first. Ordinary production builds exclude articles with `draft: true`; development and builds with `SITE_DEMO=true` include drafts. Demo builds also include drafts in RSS and the sitemap.

## Sitemap

Astro's sitemap integration uses `SITE_URL` when set, otherwise `site.url`, as the canonical origin. `SITE_BASE` controls the path prefix. Static output currently includes `sitemap-index.xml` and `sitemap-0.xml`; `/robots.txt` points crawlers to the sitemap index only when indexing is enabled. Draft article routes are omitted from ordinary production output and therefore from its sitemap; demo builds include them.
