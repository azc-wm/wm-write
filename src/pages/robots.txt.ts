import { canIndex, site } from '../site.config';

export function GET() {
	return new Response(
		canIndex
			? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site.url)}`
			: 'User-agent: *\nDisallow: /',
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
}
