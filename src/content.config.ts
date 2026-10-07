import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load only canonical article entries; sidecars stay out of the collection.
	loader: glob({
		base: './src/content/blog',
		pattern: '**/index.{md,mdx}',
		generateId: ({ entry }) => entry.replace(/\/index\.(?:md|mdx)$/, ''),
	}),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			draft: z.boolean().default(false),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z
				.union([z.string(), z.array(z.string())])
				.optional()
				.transform((tags) =>
					[...(Array.isArray(tags) ? tags : tags ? [tags] : [])]
						.map((tag) => tag.replace(/^#/, '').trim())
						.filter(Boolean),
				),
		}),
});

export const collections = { blog };
