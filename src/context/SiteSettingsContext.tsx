import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import apiClient from "../lib/apiClient";
import type { NavigationItem, Page, Project, SiteSettings } from "../types/api";

type SiteSettingsContextValue = {
  settings: SiteSettings | null;
  navigation: NavigationItem[];
  pages: Page[];
  projects: Project[];
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [settingsResponse, navigationResponse, pagesResponse, projectsResponse] =
        await Promise.all([
        apiClient.get<{ settings: SiteSettings }>("/api/settings"),
        apiClient.get<{ navigation: NavigationItem[] }>("/api/navigation"),
        apiClient.get<{ pages: Page[] }>("/api/pages/published"),
          apiClient.get<{ projects: Project[] }>("/api/projects/published"),
      ]);
      setSettings(settingsResponse.settings);
      setNavigation(
        [...navigationResponse.navigation].sort((a, b) => a.order - b.order),
      );
      setPages(pagesResponse.pages);
      setProjects(projectsResponse.projects);
    } catch (error) {
      console.error("Failed to load site settings", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const value = useMemo<SiteSettingsContextValue>(
    () => ({
      settings,
      navigation,
      pages,
      projects,
      isLoading,
      refresh: fetchAll,
    }),
    [settings, navigation, pages, projects, isLoading, fetchAll],
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return context;
};

