export type AdminRole = "owner" | "editor";

export type AdminUser = {
  id: string;
  email: string;
  name?: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
};

export type AuthUser = {
  id: string;
  email: string;
  role: AdminRole;
  name?: string;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type SiteSettings = {
  siteTitle: string;
  footerText: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: Record<string, string | undefined>;
};

export type NavigationItem = {
  id: string;
  label: string;
  path: string;
  order: number;
  isExternal?: boolean;
};

export type MediaItem = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export type ProjectImage = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
  altText?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description: string;
  status: "draft" | "published";
  tags: string[];
  featuredImageId?: string;
  gallery: ProjectImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

