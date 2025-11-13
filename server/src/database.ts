import { resolve } from "node:path";

import {
  DEFAULT_NAVIGATION,
  DEFAULT_PAGES,
  DEFAULT_PROJECTS,
  DEFAULT_SITE_SETTINGS,
  DATA_DIR,
} from "./config.js";
import type {
  AdminUser,
  MediaItem,
  NavigationItem,
  Page,
  Project,
  SiteSettings,
} from "./types.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "./utils/fileStorage.js";

const pagesPath = resolve(DATA_DIR, "pages.json");
const settingsPath = resolve(DATA_DIR, "settings.json");
const navigationPath = resolve(DATA_DIR, "navigation.json");
const mediaPath = resolve(DATA_DIR, "media.json");
const adminsPath = resolve(DATA_DIR, "admins.json");
const projectsPath = resolve(DATA_DIR, "projects.json");

export const initDatabase = async () => {
  await ensureDirectory(DATA_DIR);
  await Promise.all([
    readJsonFile<Page[]>(pagesPath, DEFAULT_PAGES),
    readJsonFile<SiteSettings>(settingsPath, DEFAULT_SITE_SETTINGS),
    readJsonFile<NavigationItem[]>(navigationPath, DEFAULT_NAVIGATION),
    readJsonFile<MediaItem[]>(mediaPath, []),
    readJsonFile<Project[]>(projectsPath, DEFAULT_PROJECTS),
    readJsonFile<AdminUser[]>(adminsPath, []),
  ]);
};

export const getPages = async () => readJsonFile<Page[]>(pagesPath, DEFAULT_PAGES);
export const savePages = async (pages: Page[]) => writeJsonFile(pagesPath, pages);

export const getSettings = async () =>
  readJsonFile<SiteSettings>(settingsPath, DEFAULT_SITE_SETTINGS);
export const saveSettings = async (settings: SiteSettings) => writeJsonFile(settingsPath, settings);

export const getNavigation = async () =>
  readJsonFile<NavigationItem[]>(navigationPath, DEFAULT_NAVIGATION);
export const saveNavigation = async (items: NavigationItem[]) =>
  writeJsonFile(navigationPath, items);

export const getMedia = async () => readJsonFile<MediaItem[]>(mediaPath, []);
export const saveMedia = async (items: MediaItem[]) => writeJsonFile(mediaPath, items);

export const getProjects = async () => readJsonFile<Project[]>(projectsPath, DEFAULT_PROJECTS);
export const saveProjects = async (items: Project[]) => writeJsonFile(projectsPath, items);

export const getAdmins = async () => readJsonFile<AdminUser[]>(adminsPath, []);
export const saveAdmins = async (items: AdminUser[]) => writeJsonFile(adminsPath, items);

