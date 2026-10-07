# RSS and sitemap

## RSS feed

The feed is available at `/rss.xml`. It uses `site.title`, `site.description`, `site.url`, `site.language`, and `site.author.email` from `src/site.config.ts`. Feed items link to `/blog/{article-id}/`, include the article title, description, publication date, author email, and tags as RSS categories.

Items are ordered by publication date, newest first. Production builds exclude articles with `draft: true`; development includes drafts so they can be previewed.

## Sitemap

Astro's sitemap integration uses `site.url` as the canonical origin. Static output currently includes `sitemap-index.xml` and `sitemap-0.xml`; `/robots.txt` points crawlers to the sitemap index only when indexing is enabled. Draft article routes are omitted from production output and therefore from the production sitemap.
