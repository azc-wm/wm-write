/** Resolve a root-relative site path under Astro's configured base. */
export function localUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.replace(/^\/+/, '');
  return `${base}/${normalized}`;
}
