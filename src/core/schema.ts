import { z } from 'zod';

export const TemplateSchema = z.object({
  meta: z.object({
    name: z.string(),
    version: z.string(),
    author: z.string(),
    description: z.string().optional(),
    license: z.string().optional(),
  }),
  style: z.object({
    page: z.object({
      size: z.enum(['A4', 'A3', 'Letter', 'Legal']).default('A4'),
      orientation: z.enum(['portrait', 'landscape']).default('portrait'),
      margin: z.object({
        top: z.string(), // CSS units: mm, cm, px
        bottom: z.string(),
        left: z.string().or(z.string().array()), // Support symmetric or specific margins
        right: z.string().or(z.string().array()),
      }),
    }),
    fonts: z.record(z.string(), z.string()).optional(), // Map font alias to font-family
    typography: z.object({
      fontSize: z.string().default('16px'),
      lineHeight: z.string().default('1.5'),
    }).optional(),
  }),
  // Defines how Markdown front-matter maps to the template
  slots: z.record(z.string(), z.object({
    type: z.enum(['text', 'date', 'list', 'boolean']),
    path: z.string().optional(), // JSON path or Front-matter key
    default: z.any().optional(),
  })).optional(),
});

export type TemplateConfig = z.infer<typeof TemplateSchema>;

export const validateTemplate = (data: unknown) => {
  return TemplateSchema.safeParse(data);
};
