# Cloudflare Workers deployment

The supported Cloudflare deployment is static. Astro builds the site into `dist/`, and `wrangler.jsonc` publishes that directory as Worker static assets. This configuration does not enable SSR.

Build and deploy the production site with:

```sh
SITE_ENV=production pnpm build
pnpm exec wrangler deploy
```

Set `SITE_ENV=production` only for the production build so the generated robots policy and page metadata allow indexing when `site.seo.index` is true. Configure a custom domain separately in Cloudflare after the Worker is deployed; no domain or route is configured in this repository.
