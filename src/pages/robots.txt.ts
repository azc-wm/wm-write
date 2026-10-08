import { canIndex } from '../site.config';
import { localUrl } from '../lib/urls';

export function GET({ site }: { site: URL | undefined }) {
	return new Response(
		canIndex
			? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(localUrl('/sitemap-index.xml'), site)}`
			: 'User-agent: *\nDisallow: /',
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
}
