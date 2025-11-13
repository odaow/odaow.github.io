import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";

loadEnv({
  path: resolve(process.cwd(), ".env"),
});

const env = process.env;

export const APP_PORT = Number(env.PORT ?? 4000);
export const NODE_ENV = env.NODE_ENV ?? "development";
export const JWT_SECRET = env.JWT_SECRET ?? "unsafe-default-secret-change-me";
export const COOKIE_NAME = env.AUTH_COOKIE_NAME ?? "neb_admin_token";
export const COOKIE_DOMAIN = env.AUTH_COOKIE_DOMAIN ?? undefined;
export const COOKIE_SECURE = NODE_ENV === "production";
export const DATA_DIR = resolve(process.cwd(), "server", "data");
export const UPLOADS_DIR = resolve(process.cwd(), "server", "uploads");
export const BASE_URL = env.BASE_URL ?? `http://localhost:${APP_PORT}`;
export const CORS_ORIGIN = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://127.0.0.1:5173"];
export const DEFAULT_ADMIN_EMAIL = env.DEFAULT_ADMIN_EMAIL ?? "admin@example.com";
export const DEFAULT_ADMIN_PASSWORD = env.DEFAULT_ADMIN_PASSWORD ?? "ChangeMe123!";
export const DEFAULT_ADMIN_NAME = env.DEFAULT_ADMIN_NAME ?? "Site Owner";
const defaultAddPaths = ["server/data", "server/uploads"];
export const PUBLISH_GIT_ADD_PATHS = env.PUBLISH_GIT_ADD_PATHS
  ? env.PUBLISH_GIT_ADD_PATHS.split(",").map((item) => item.trim()).filter(Boolean)
  : defaultAddPaths;
export const PUBLISH_REMOTE = env.PUBLISH_GIT_REMOTE ?? "origin";
export const PUBLISH_BRANCH = env.PUBLISH_GIT_BRANCH ?? "main";
export const PUBLISH_COMMIT_MESSAGE =
  env.PUBLISH_COMMIT_MESSAGE ?? "chore: publish site content";
export const PUBLISH_DEPLOY_SCRIPT =
  env.PUBLISH_DEPLOY_SCRIPT === ""
    ? undefined
    : env.PUBLISH_DEPLOY_SCRIPT ?? "npm run deploy";

export const DEFAULT_SITE_SETTINGS = {
  siteTitle: "Nebras Office",
  footerText: "© Nebras Office. All rights reserved.",
  contact: {
    email: "info@example.com",
    phone: "+966 555 123 456",
    address: "Riyadh, Saudi Arabia",
  },
  socialLinks: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://x.com/",
  },
};

export const DEFAULT_NAVIGATION = [
  { id: "nav-home", label: "Home", path: "/", order: 0 },
  { id: "nav-about", label: "About", path: "/about", order: 1 },
  { id: "nav-services", label: "Services", path: "/services", order: 2 },
  { id: "nav-projects", label: "Projects", path: "/projects", order: 3 },
  { id: "nav-contact", label: "Contact", path: "/contact", order: 4 },
];

export const DEFAULT_PAGES = [
  {
    id: "page-home",
    slug: "home",
    title: "Home",
    content: "<h1>Welcome to Nebras Office</h1><p>Update this content from the admin dashboard.</p>",
    status: "published" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
];

export const DEFAULT_PROJECTS = [];

