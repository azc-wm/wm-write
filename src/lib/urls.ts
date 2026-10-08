/** Resolve site-local paths under Astro's configured deployment base. */
export function localUrl(path: string): string {
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith('#')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.replace(/^\/+/, '');
  if (base && (normalized === base.slice(1) || normalized.startsWith(base.slice(1) + '/'))) {
    return '/' + normalized;
  }
  return `${base}/${normalized}`;
}
