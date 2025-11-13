import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const loginSchema = z.object({
  email: z.string().trim().email("A valid email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const pageSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugRegex, "Slug may include lowercase letters, numbers, and hyphens."),
  excerpt: z.string().trim().max(300).optional(),
  content: z.string().trim().min(1, "Content is required."),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const pageUpdateSchema = pageSchema.partial().extend({
  status: z.enum(["draft", "published"]).optional(),
});

export const navigationItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().trim().min(2).max(60),
  path: z.string().trim().min(1),
  order: z.number().int().min(0),
  isExternal: z.boolean().optional(),
});

export const navigationSchema = z
  .array(navigationItemSchema)
  .max(50, "Navigation cannot exceed 50 entries.");

export const siteSettingsSchema = z.object({
  siteTitle: z.string().trim().min(3).max(120),
  footerText: z.string().trim().min(3).max(240),
  contact: z.object({
    email: z.string().trim().email(),
    phone: z.string().trim().min(3).max(40),
    address: z.string().trim().min(3).max(240),
  }),
  socialLinks: z
    .record(z.string())
    .refine(
      (value) =>
        Object.values(value).every(
          (link) => !link || /^https?:\/\/[\w.-]+(?:\/[\w./-]*)?$/.test(link),
        ),
      { message: "Social links must be valid URLs starting with http or https." },
    ),
});

export const adminCreateSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().max(120).optional(),
  role: z.enum(["owner", "editor"]).default("editor"),
  password: z.string().min(8),
});

export const adminUpdateSchema = adminCreateSchema.partial().extend({
  password: z.string().min(8).optional(),
});

export const previewSchema = pageSchema.pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
});

const projectImageSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number().int().nonnegative(),
  url: z.string().url(),
  uploadedAt: z.string(),
  altText: z.string().trim().max(160).optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugRegex, "Slug may include lowercase letters, numbers, and hyphens."),
  summary: z.string().trim().max(300).optional(),
  description: z.string().trim().min(1, "Description is required."),
  status: z.enum(["draft", "published"]).default("draft"),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  featuredImageId: z.string().optional(),
  gallery: z.array(projectImageSchema).default([]),
});

export const projectUpdateSchema = projectSchema.partial().extend({
  status: z.enum(["draft", "published"]).optional(),
  tags: z.array(z.string().trim().min(1).max(40)).optional(),
  gallery: z.array(projectImageSchema).optional(),
});

export const projectImageUpdateSchema = z.object({
  altText: z.string().trim().max(160).optional(),
  featured: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type PageInput = z.infer<typeof pageSchema>;
export type PageUpdateInput = z.infer<typeof pageUpdateSchema>;
export type NavigationInput = z.infer<typeof navigationSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type AdminCreateInput = z.infer<typeof adminCreateSchema>;
export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ProjectImageUpdateInput = z.infer<typeof projectImageUpdateSchema>;

