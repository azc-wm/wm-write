/** Demo builds publish sample drafts without changing their frontmatter. */
export const includeDrafts = import.meta.env.DEV || process.env.SITE_DEMO === 'true';

export function isVisiblePost(data: { draft?: boolean }): boolean {
  return includeDrafts || !data.draft;
}
