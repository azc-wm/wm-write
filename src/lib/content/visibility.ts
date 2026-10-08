/** Demo builds publish sample drafts without changing their frontmatter. */
export const includeDrafts = import.meta.env.DEV || import.meta.env.SITE_DEMO === 'true';

export function isVisiblePost(data: { draft?: boolean }): boolean {
  return includeDrafts || !data.draft;
}
