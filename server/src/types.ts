export type PageStatus = "draft" | "published";

export type Page = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  status: PageStatus;
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
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
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

export type AdminRole = "owner" | "editor";

export type AdminUser = {
  id: string;
  email: string;
  name?: string;
  role: AdminRole;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
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

export type ProjectStatus = "draft" | "published";

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  featuredImageId?: string;
  gallery: ProjectImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type DatabaseShape = {
  pages: Page[];
  settings: SiteSettings;
  navigation: NavigationItem[];
  media: MediaItem[];
  projects: Project[];
  admins: AdminUser[];
};

