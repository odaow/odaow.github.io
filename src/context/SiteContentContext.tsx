import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  defaultContent,
  type Project,
  type SiteContent,
  type TeamMember,
} from "../data/defaultContent";

const STORAGE_KEY = "nebras-office-content";

type SiteContentContextValue = {
  projects: Project[];
  team: TeamMember[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Omit<Project, "id">) => void;
  removeProject: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, member: Omit<TeamMember, "id">) => void;
  removeTeamMember: (id: string) => void;
};

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

const withId = <T extends object>(entry: Omit<T, "id">): T & { id: string } => {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id, ...entry } as T & { id: string };
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => defaultContent);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SiteContent;
      if (parsed.projects && parsed.team) {
        setContent(parsed);
      }
    } catch (error) {
      console.error("Failed to restore site content from storage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const contextValue = useMemo<SiteContentContextValue>(
    () => ({
      projects: content.projects,
      team: content.team,
      addProject: (project) =>
        setContent((prev) => ({
          ...prev,
          projects: [...prev.projects, withId<Project>(project)],
        })),
      updateProject: (id, project) =>
        setContent((prev) => ({
          ...prev,
          projects: prev.projects.map((item) => (item.id === id ? { id, ...project } : item)),
        })),
      removeProject: (id) =>
        setContent((prev) => ({
          ...prev,
          projects: prev.projects.filter((item) => item.id !== id),
        })),
      addTeamMember: (member) =>
        setContent((prev) => ({
          ...prev,
          team: [...prev.team, withId<TeamMember>(member)],
        })),
      updateTeamMember: (id, member) =>
        setContent((prev) => ({
          ...prev,
          team: prev.team.map((item) => (item.id === id ? { id, ...member } : item)),
        })),
      removeTeamMember: (id) =>
        setContent((prev) => ({
          ...prev,
          team: prev.team.filter((item) => item.id !== id),
        })),
    }),
    [content],
  );

  return <SiteContentContext.Provider value={contextValue}>{children}</SiteContentContext.Provider>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
};

