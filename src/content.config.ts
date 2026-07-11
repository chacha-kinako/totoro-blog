import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			cardImage: z.string().optional(),
			cardText: z.string().optional(),
			featured: z.boolean().optional(),
			category: z.string().optional(),
			room: z.string().optional(),
			articleType: z.string().optional(),
			showInLatest: z.boolean().optional(),
			showInPopular: z.boolean().optional(),
			showInCategories: z.array(z.string()).optional(),
			showInWorks: z.array(z.string()).optional(),
		}),
});

export const collections = { blog };
