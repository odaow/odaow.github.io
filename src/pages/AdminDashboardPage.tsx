import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCloud,
  FiEdit2,
  FiEye,
  FiGitBranch,
  FiImage,
  FiLogOut,
  FiPlus,
  FiRefreshCw,
  FiStar,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

import SeoHead from "../components/SeoHead";
import { useAuth } from "../context/AuthContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import apiClient, { type ApiError } from "../lib/apiClient";
import type {
  AdminRole,
  AdminUser,
  MediaItem,
  NavigationItem,
  Page,
  Project,
  ProjectImage,
  SiteSettings,
} from "../types/api";

type TabId = "projects" | "pages" | "settings" | "media" | "navigation" | "admins";

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "projects", label: "المشاريع" },
  { id: "pages", label: "إدارة الصفحات" },
  { id: "settings", label: "إعدادات الموقع" },
  { id: "media", label: "مكتبة الوسائط" },
  { id: "navigation", label: "قائمة التصفح" },
  { id: "admins", label: "المسؤولون" },
];

const EMPTY_PAGE_FORM: Omit<Page, "id" | "createdAt" | "updatedAt"> & { id?: string } = {
  id: undefined,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
  publishedAt: undefined,
};

const DEFAULT_SOCIAL_KEYS = ["facebook", "instagram", "linkedin", "twitter"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const EMPTY_PROJECT_FORM: {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  status: Page["status"];
  tagsText: string;
  featuredImageId?: string;
  gallery: ProjectImage[];
} = {
  id: undefined,
  title: "",
  slug: "",
  summary: "",
  description: "",
  status: "draft",
  tagsText: "",
  featuredImageId: undefined,
  gallery: [],
};

const AdminDashboardPage = () => {
  const { logout, user } = useAuth();
  const { refresh: refreshSiteSettings } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<TabId>("pages");
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [alert, setAlert] = useState<AlertState>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  const [projectForm, setProjectForm] = useState<typeof EMPTY_PROJECT_FORM>(EMPTY_PROJECT_FORM);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [projectPreviewData, setProjectPreviewData] = useState<{
    title: string;
    summary?: string;
    description: string;
    tags: string[];
  } | null>(null);
  const [projectImageAltDrafts, setProjectImageAltDrafts] = useState<Record<string, string>>({});
  const [uploadingProjectId, setUploadingProjectId] = useState<string | null>(null);
  const [projectDragTarget, setProjectDragTarget] = useState<string | null>(null);

  const [pageForm, setPageForm] = useState<typeof EMPTY_PAGE_FORM>(EMPTY_PAGE_FORM);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [previewData, setPreviewData] = useState<{ title: string; excerpt?: string; content: string } | null>(null);

  const [settingsForm, setSettingsForm] = useState<SiteSettings | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const [navigationForm, setNavigationForm] = useState<Array<NavigationItem & { _localId: string }>>([]);
  const [isSavingNavigation, setIsSavingNavigation] = useState(false);

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaDragActive, setMediaDragActive] = useState(false);

  const [adminForm, setAdminForm] = useState<{
    id?: string;
    email: string;
    name?: string;
    role: AdminRole;
    password?: string;
  }>({
    email: "",
    name: "",
    role: "editor",
    password: "",
  });
  const [isSavingAdmin, setIsSavingAdmin] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    message: string;
    committed: boolean;
    pushed: boolean;
    deployed: boolean;
    logs?: Array<{ command: string; stdout: string; stderr: string }>;
    type: "success" | "error";
  } | null>(null);

  const canManageAdmins = user?.role === "owner";

  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setAlert({ message, type });
    window.setTimeout(() => setAlert(null), 4000);
  };

  const handleApiError = (error: unknown, fallbackMessage: string) => {
    const apiError = error as ApiError;
    const message = apiError?.message ?? fallbackMessage;
    showAlert(message, "error");
  };

  const fetchProjects = async () => {
    const response = await apiClient.get<{ projects: Project[] }>("/api/projects");
    setProjects(response.projects);
    setProjectForm((prev) => {
      if (!prev.id) return prev;
      const matching = response.projects.find((project) => project.id === prev.id);
      if (!matching) {
        return prev;
      }
      return {
        id: matching.id,
        title: matching.title,
        slug: matching.slug,
        summary: matching.summary ?? "",
        description: matching.description,
        status: matching.status,
        tagsText: matching.tags.join(", "),
        featuredImageId: matching.featuredImageId,
        gallery: matching.gallery,
      };
    });
    setProjectImageAltDrafts((prev) => {
      const next: Record<string, string> = {};
      response.projects.forEach((project) => {
        project.gallery.forEach((image) => {
          next[image.id] = prev[image.id] ?? image.altText ?? "";
        });
      });
      return next;
    });
    return response.projects;
  };

  const fetchPages = async () => {
    const response = await apiClient.get<{ pages: Page[] }>("/api/pages");
    setPages(response.pages);
  };

  const fetchSettings = async () => {
    const response = await apiClient.get<{ settings: SiteSettings }>("/api/settings");
    setSettingsForm(response.settings);
  };

  const fetchNavigation = async () => {
    const response = await apiClient.get<{ navigation: NavigationItem[] }>("/api/navigation");
    setNavigationForm(
      response.navigation.map((item) => ({
        ...item,
        _localId: item.id,
      })),
    );
  };

  const fetchMedia = async () => {
    const response = await apiClient.get<{ media: MediaItem[] }>("/api/media");
    setMediaItems(response.media);
  };

  const fetchAdmins = async () => {
    if (!canManageAdmins) {
      setAdmins([]);
      return;
    }
    try {
      const response = await apiClient.get<{ admins: AdminUser[] }>("/api/admins");
      setAdmins(response.admins);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 403) {
        setAdmins([]);
      } else {
        throw error;
      }
    }
  };

  const bootstrap = async () => {
    setIsBootstrapping(true);
    try {
      await Promise.all([
        fetchProjects(),
        fetchPages(),
        fetchSettings(),
        fetchNavigation(),
        fetchMedia(),
        fetchAdmins(),
      ]);
    } catch (error) {
      handleApiError(error, "تعذر تحميل بيانات لوحة التحكم.");
    } finally {
      setIsBootstrapping(false);
    }
  };

  useEffect(() => {
    void bootstrap();
  }, []);

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.status === "published" && b.status !== "published") return -1;
        if (a.status !== "published" && b.status === "published") return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }),
    [projects],
  );

  const sortedPages = useMemo(
    () =>
      [...pages].sort((a, b) => {
        if (a.status === "published" && b.status !== "published") return -1;
        if (a.status !== "published" && b.status === "published") return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }),
    [pages],
  );

  const sortedNavigation = useMemo(
    () => [...navigationForm].sort((a, b) => a.order - b.order),
    [navigationForm],
  );

  const sortedMedia = useMemo(
    () =>
      [...mediaItems].sort(
        (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      ),
    [mediaItems],
  );

  const sortedAdmins = useMemo(
    () =>
      [...admins].sort((a, b) => {
        if (a.role === "owner" && b.role !== "owner") return -1;
        if (a.role !== "owner" && b.role === "owner") return 1;
        return a.email.localeCompare(b.email);
      }),
    [admins],
  );

  const resetProjectForm = () => {
    setProjectForm(EMPTY_PROJECT_FORM);
    setProjectImageAltDrafts({});
    setProjectDragTarget(null);
  };

  const upsertProject = async (payload: {
    title: string;
    slug: string;
    summary?: string;
    description: string;
    status: Page["status"];
    tags: string[];
    featuredImageId?: string;
  }) => {
    if (projectForm.id) {
      await apiClient.put<{ project: Project }>(`/api/projects/${projectForm.id}`, payload);
    } else {
      await apiClient.post<{ project: Project }>("/api/projects", payload);
    }
  };

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProject(true);
    try {
      const tags = projectForm.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      await upsertProject({
        title: projectForm.title,
        slug: projectForm.slug,
        summary: projectForm.summary,
        description: projectForm.description,
        status: projectForm.status,
        tags,
        featuredImageId: projectForm.featuredImageId,
      });
      showAlert(projectForm.id ? "تم تحديث المشروع." : "تم إنشاء المشروع بنجاح.");
      await fetchProjects();
      resetProjectForm();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر حفظ بيانات المشروع.");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setActiveTab("projects");
    setProjectForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      summary: project.summary ?? "",
      description: project.description,
      status: project.status,
      tagsText: project.tags.join(", "),
      featuredImageId: project.featuredImageId,
      gallery: project.gallery,
    });
    setProjectImageAltDrafts(() => {
      const next: Record<string, string> = {};
      project.gallery.forEach((image) => {
        next[image.id] = image.altText ?? "";
      });
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("سيتم حذف المشروع وكل وسائطه. هل ترغب بالمتابعة؟")) return;
    try {
      await apiClient.delete(`/api/projects/${id}`);
      showAlert("تم حذف المشروع.");
      await fetchProjects();
      if (projectForm.id === id) {
        resetProjectForm();
      }
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر حذف المشروع.");
    }
  };

  const handlePublishProject = async (id: string) => {
    try {
      await apiClient.post(`/api/projects/${id}/publish`, {});
      showAlert("تم نشر المشروع.");
      await fetchProjects();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر نشر المشروع.");
    }
  };

  const handleUnpublishProject = async (id: string) => {
    try {
      await apiClient.post(`/api/projects/${id}/unpublish`, {});
      showAlert("تم إلغاء نشر المشروع.");
      await fetchProjects();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر إلغاء نشر المشروع.");
    }
  };

  const handleProjectPreview = async () => {
    try {
      const tags = projectForm.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const response = await apiClient.post<{
        preview: { title: string; summary?: string; description: string; tags: string[] };
      }>("/api/projects/preview", {
        title: projectForm.title,
        summary: projectForm.summary,
        description: projectForm.description,
        tags,
      });
      setProjectPreviewData(response.preview);
    } catch (error) {
      handleApiError(error, "تعذر إنشاء معاينة المشروع.");
    }
  };

  const handleProjectImageUpdate = async (
    projectId: string,
    imageId: string,
    options: { altText?: string; featured?: boolean; file?: File },
  ) => {
    const formData = new FormData();
    if (options.altText !== undefined) {
      formData.append("altText", options.altText);
    }
    if (options.featured !== undefined) {
      formData.append("featured", options.featured ? "true" : "false");
    }
    if (options.file) {
      formData.append("file", options.file);
    }
    try {
      await apiClient.putForm(`/api/projects/${projectId}/images/${imageId}`, formData);
      await fetchProjects();
      showAlert("تم تحديث بيانات الصورة.");
    } catch (error) {
      handleApiError(error, "تعذر تحديث بيانات الصورة.");
    }
  };

  const handleProjectImageUpload = async (
    projectId: string,
    file: File,
    options?: { altText?: string; featured?: boolean },
  ) => {
    setUploadingProjectId(projectId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (options?.altText) {
        formData.append("altText", options.altText);
      }
      if (options?.featured) {
        formData.append("featured", "true");
      }
      await apiClient.upload(`/api/projects/${projectId}/images`, formData);
      await fetchProjects();
      showAlert("تم رفع الصورة للمشروع.");
    } catch (error) {
      handleApiError(error, "تعذر رفع الصورة للمشروع.");
    } finally {
      setUploadingProjectId((value) => (value === projectId ? null : value));
    }
  };

  const handleDeleteProjectImage = async (projectId: string, imageId: string) => {
    if (!window.confirm("سيتم حذف الصورة من المشروع. هل ترغب بالاستمرار؟")) return;
    try {
      await apiClient.delete(`/api/projects/${projectId}/images/${imageId}`);
      await fetchProjects();
      showAlert("تم حذف الصورة.");
    } catch (error) {
      handleApiError(error, "تعذر حذف الصورة.");
    }
  };

  const handleSetFeaturedImage = async (projectId: string, imageId: string) => {
    await handleProjectImageUpdate(projectId, imageId, { featured: true });
  };

  const handleClearFeaturedImage = async (projectId: string, imageId: string) => {
    await handleProjectImageUpdate(projectId, imageId, { featured: false });
  };

  const handleProjectImageAltSave = async (projectId: string, image: ProjectImage) => {
    const draft = projectImageAltDrafts[image.id] ?? image.altText ?? "";
    await handleProjectImageUpdate(projectId, image.id, { altText: draft });
  };

  const handleProjectDrop = async (event: React.DragEvent<HTMLDivElement>, projectId: string) => {
    event.preventDefault();
    setProjectDragTarget(null);
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length === 0) return;
    await Promise.all(files.map((file) => handleProjectImageUpload(projectId, file)));
  };

  const handleProjectDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    projectId: string,
  ) => {
    event.preventDefault();
    setProjectDragTarget(projectId);
  };

  const handleProjectDragLeave = () => {
    setProjectDragTarget(null);
  };

  const handleProjectImageInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
    projectId: string,
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;
    await Promise.all(files.map((file) => handleProjectImageUpload(projectId, file)));
    event.target.value = "";
  };

  const handlePublishSite = async () => {
    if (!canManageAdmins) {
      showAlert("فقط المالك يمكنه إطلاق عملية النشر.", "error");
      return;
    }
    setIsPublishing(true);
    try {
      const response = await apiClient.post<{
        committed: boolean;
        pushed: boolean;
        deployed: boolean;
        message: string;
        logs?: Array<{ command: string; stdout: string; stderr: string }>;
      }>("/api/publish", {});
      setPublishResult({
        message: response.message,
        committed: response.committed,
        pushed: response.pushed,
        deployed: response.deployed,
        logs: response.logs,
        type: "success",
      });
      showAlert("تم إرسال التغييرات إلى GitHub Pages.");
    } catch (error) {
      const apiError = error as ApiError;
      setPublishResult({
        message: apiError?.message ?? "فشلت عملية النشر.",
        committed: false,
        pushed: false,
        deployed: false,
        logs: (apiError.logs as Array<{ command: string; stdout: string; stderr: string }>) ?? [],
        type: "error",
      });
      handleApiError(error, "فشلت عملية النشر.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleMediaDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMediaDragActive(false);
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length === 0) return;
    setIsUploadingMedia(true);
    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          await apiClient.upload("/api/media", formData);
        }),
      );
      await fetchMedia();
      showAlert("تم رفع الملفات إلى مكتبة الوسائط.");
    } catch (error) {
      handleApiError(error, "تعذر رفع بعض الملفات.");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const resetPageForm = () => {
    setPageForm(EMPTY_PAGE_FORM);
  };

  const handlePageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingPage(true);
    try {
      if (pageForm.id) {
        await apiClient.put<{ page: Page }>(`/api/pages/${pageForm.id}`, {
          title: pageForm.title,
          slug: pageForm.slug,
          excerpt: pageForm.excerpt,
          content: pageForm.content,
          status: pageForm.status,
        });
        showAlert("تم تحديث الصفحة بنجاح.");
      } else {
        await apiClient.post<{ page: Page }>("/api/pages", {
          title: pageForm.title,
          slug: pageForm.slug,
          excerpt: pageForm.excerpt,
          content: pageForm.content,
          status: pageForm.status,
        });
        showAlert("تم إنشاء الصفحة بنجاح.");
      }
      await fetchPages();
      resetPageForm();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر حفظ الصفحة.");
    } finally {
      setIsSavingPage(false);
    }
  };

  const handleEditPage = (page: Page) => {
    setActiveTab("pages");
    setPageForm({
      id: page.id,
      title: page.title,
      slug: page.slug,
      excerpt: page.excerpt ?? "",
      content: page.content,
      status: page.status,
      publishedAt: page.publishedAt,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePage = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصفحة؟")) return;
    try {
      await apiClient.delete(`/api/pages/${id}`);
      showAlert("تم حذف الصفحة بنجاح.");
      await fetchPages();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر حذف الصفحة.");
    }
  };

  const handlePublishPage = async (id: string) => {
    try {
      await apiClient.post(`/api/pages/${id}/publish`, {});
      showAlert("تم نشر الصفحة.");
      await fetchPages();
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر نشر الصفحة.");
    }
  };

  const handlePreviewPage = async () => {
    try {
      const response = await apiClient.post<{ preview: { title: string; slug: string; excerpt?: string; content: string } }>(
        "/api/pages/preview",
        {
          title: pageForm.title,
          slug: pageForm.slug,
          excerpt: pageForm.excerpt,
          content: pageForm.content,
        },
      );
      setPreviewData({
        title: response.preview.title,
        excerpt: response.preview.excerpt,
        content: response.preview.content,
      });
    } catch (error) {
      handleApiError(error, "تعذر إنشاء المعاينة.");
    }
  };

  const handleSettingsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!settingsForm) return;
    setIsSavingSettings(true);
    try {
      const response = await apiClient.put<{ settings: SiteSettings }>("/api/settings", settingsForm);
      setSettingsForm(response.settings);
      showAlert("تم تحديث إعدادات الموقع.");
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر تحديث إعدادات الموقع.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const addNavigationItem = () => {
    setNavigationForm((prev) => [
      ...prev,
      {
        id: "",
        _localId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        label: "رابط جديد",
        path: "/",
        order: prev.length,
        isExternal: false,
      },
    ]);
  };

  const handleNavigationChange = (localId: string, updates: Partial<NavigationItem>) => {
    setNavigationForm((prev) =>
      prev.map((item) => (item._localId === localId ? { ...item, ...updates } : item)),
    );
  };

  const handleRemoveNavigation = (localId: string) => {
    setNavigationForm((prev) => prev.filter((item) => item._localId !== localId));
  };

  const handleNavigationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingNavigation(true);
    try {
      const payload = navigationForm.map(({ _localId, ...item }) => ({
        ...item,
        order: Number(item.order),
      }));
      const response = await apiClient.put<{ navigation: NavigationItem[] }>("/api/navigation", payload);
      setNavigation(response.navigation);
      setNavigationForm(
        response.navigation.map((item) => ({
          ...item,
          _localId: item.id,
        })),
      );
      showAlert("تم تحديث قائمة التنقل.");
      await refreshSiteSettings();
    } catch (error) {
      handleApiError(error, "تعذر تحديث قائمة التنقل.");
    } finally {
      setIsSavingNavigation(false);
    }
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;
    setIsUploadingMedia(true);
    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          await apiClient.upload("/api/media", formData);
        }),
      );
      showAlert("تم رفع الصور بنجاح.");
      await fetchMedia();
    } catch (error) {
      handleApiError(error, "تعذر رفع الملف.");
    } finally {
      setIsUploadingMedia(false);
      event.target.value = "";
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!window.confirm("حذف الصورة سيؤدي إلى إزالة الرابط منها أيضاً. هل ترغب بالمتابعة؟")) return;
    try {
      await apiClient.delete(`/api/media/${id}`);
      showAlert("تم حذف الملف.");
      await fetchMedia();
    } catch (error) {
      handleApiError(error, "تعذر حذف الملف.");
    }
  };

  const resetAdminForm = () => {
    setAdminForm({
      email: "",
      name: "",
      role: "editor",
      password: "",
    });
  };

  const handleAdminSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canManageAdmins) {
      return showAlert("يجب أن تكون مالكاً لإدارة حسابات المسؤولين.", "error");
    }
    setIsSavingAdmin(true);
    try {
      if (adminForm.id) {
        const payload: Record<string, unknown> = {
          email: adminForm.email,
          name: adminForm.name,
          role: adminForm.role,
        };
        if (adminForm.password) {
          payload.password = adminForm.password;
        }
        await apiClient.put(`/api/admins/${adminForm.id}`, payload);
        showAlert("تم تحديث حساب المسؤول.");
      } else {
        await apiClient.post("/api/admins", {
          email: adminForm.email,
          name: adminForm.name,
          role: adminForm.role,
          password: adminForm.password,
        });
        showAlert("تم إنشاء حساب مسؤول جديد.");
      }
      await fetchAdmins();
      resetAdminForm();
    } catch (error) {
      handleApiError(error, "تعذر حفظ حساب المسؤول.");
    } finally {
      setIsSavingAdmin(false);
    }
  };

  const handleEditAdmin = (admin: AdminUser) => {
    setAdminForm({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      password: "",
    });
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!canManageAdmins) {
      return showAlert("يجب أن تكون مالكاً لإدارة حسابات المسؤولين.", "error");
    }
    if (!window.confirm("سيتم حذف حساب المسؤول بشكل نهائي. هل ترغب بالمتابعة؟")) return;
    try {
      await apiClient.delete(`/api/admins/${id}`);
      showAlert("تم حذف حساب المسؤول.");
      await fetchAdmins();
    } catch (error) {
      handleApiError(error, "تعذر حذف حساب المسؤول.");
    }
  };

  useEffect(() => {
    if (!pageForm.id && pageForm.title && !pageForm.slug) {
      setPageForm((prev) => ({ ...prev, slug: slugify(pageForm.title) }));
    }
  }, [pageForm.id, pageForm.title, pageForm.slug]);

  useEffect(() => {
    if (!projectForm.id && projectForm.title && !projectForm.slug) {
      setProjectForm((prev) => ({ ...prev, slug: slugify(projectForm.title) }));
    }
  }, [projectForm.id, projectForm.title, projectForm.slug]);

  const sanitizedPreview = useMemo(
    () =>
      previewData
        ? DOMPurify.sanitize(previewData.content, { USE_PROFILES: { html: true } })
        : "",
    [previewData],
  );

  const sanitizedProjectPreview = useMemo(
    () =>
      projectPreviewData
        ? DOMPurify.sanitize(projectPreviewData.description, { USE_PROFILES: { html: true } })
        : "",
    [projectPreviewData],
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SeoHead title="لوحة التحكم | إدارة المحتوى" description="إدارة محتوى الموقع من لوحة تحكم واحدة" />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">لوحة التحكم</p>
            <h1 className="mt-1 font-title text-3xl text-slate-900 md:text-4xl">إدارة محتوى الموقع</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              تحكم بجميع صفحات الموقع وإعداداته وروابطه من مكان واحد. يتم تأمين جميع العمليات عبر جلسة مصادقة تعتمد على ملفات تعريف الارتباط الآمنة.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={async () => {
                setIsBootstrapping(true);
                await bootstrap();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
            >
              <FiRefreshCw className="h-4 w-4" />
              تحديث البيانات
            </button>
            {canManageAdmins && (
              <button
                type="button"
                onClick={handlePublishSite}
                disabled={isPublishing}
                className="inline-flex items-center gap-2 rounded-full border border-brand bg-brand/10 px-4 py-2 text-sm font-semibold text-brand shadow-sm transition hover:bg-brand/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiCloud className="h-4 w-4" />
                {isPublishing ? "جاري النشر..." : "نشر إلى GitHub Pages"}
              </button>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <FiLogOut className="h-4 w-4" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm shadow-sm ${
              alert.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {alert.message}
          </motion.div>
        )}
        {publishResult && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 rounded-2xl border px-4 py-4 text-sm shadow-sm ${
              publishResult.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-800">{publishResult.message}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${
                      publishResult.committed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <FiGitBranch className="h-3 w-3" />
                    التزام: {publishResult.committed ? "تم" : "لم يتم"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${
                      publishResult.pushed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    دفع: {publishResult.pushed ? "تم" : "لم يتم"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${
                      publishResult.deployed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    نشر: {publishResult.deployed ? "تم" : "لم يتم"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPublishResult(null)}
                className="text-xs font-semibold text-slate-500 hover:text-brand"
              >
                إغلاق
              </button>
            </div>
            {publishResult.logs && publishResult.logs.length > 0 && (
              <details className="mt-3 rounded-xl border border-slate-200 bg-white/60 p-3 text-[12px] text-slate-600">
                <summary className="cursor-pointer font-semibold text-slate-700">
                  عرض تفاصيل الأوامر
                </summary>
                <div className="mt-2 space-y-2">
                  {publishResult.logs.map((log, index) => (
                    <div key={`${log.command}-${index}`} className="rounded-lg bg-slate-900/80 p-3 font-mono text-xs text-slate-100">
                      <p className="text-emerald-300">$ {log.command}</p>
                      {log.stdout && (
                        <pre className="mt-2 whitespace-pre-wrap text-slate-200">{log.stdout.trim()}</pre>
                      )}
                      {log.stderr && (
                        <pre className="mt-2 whitespace-pre-wrap text-red-200">{log.stderr.trim()}</pre>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </motion.div>
        )}

        <div className="overflow-x-auto">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            {TABS.filter((tab) => (tab.id === "admins" ? canManageAdmins : true)).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-brand text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {isBootstrapping ? (
          <div className="mt-10 flex min-h-[40vh] items-center justify-center">
            <p className="text-sm font-medium text-slate-500">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {activeTab === "projects" && (
              <section className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-title text-2xl text-slate-900">
                        {projectForm.id ? "تعديل مشروع" : "إنشاء مشروع جديد"}
                      </h2>
                      <p className="text-sm text-slate-500">
                        أضف المشاريع مع وصف كامل ومعرض صور قابل لإعادة الترتيب والنشر على الموقع فوراً.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
                        {sortedProjects.filter((project) => project.status === "published").length} منشور
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
                        {sortedProjects.filter((project) => project.status !== "published").length} مسودة
                      </span>
                    </div>
                  </div>

                  <form className="mt-6 space-y-5" onSubmit={handleProjectSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          عنوان المشروع
                        </label>
                        <input
                          required
                          value={projectForm.title}
                          onChange={(event) =>
                            setProjectForm((prev) => ({ ...prev, title: event.target.value }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الرابط المختصر (slug)
                        </label>
                        <input
                          required
                          value={projectForm.slug}
                          onChange={(event) =>
                            setProjectForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                        <p className="mt-1 text-xs text-slate-400">
                          سيعرض المشروع على الرابط /projects/{projectForm.slug || "your-slug"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        ملخص قصير
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.summary}
                        onChange={(event) =>
                          setProjectForm((prev) => ({ ...prev, summary: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        وصف تفصيلي
                      </label>
                      <textarea
                        required
                        rows={10}
                        value={projectForm.description}
                        onChange={(event) =>
                          setProjectForm((prev) => ({ ...prev, description: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        الوسوم (مفصولة بفاصلة)
                      </label>
                      <input
                        value={projectForm.tagsText}
                        onChange={(event) =>
                          setProjectForm((prev) => ({ ...prev, tagsText: event.target.value }))
                        }
                        placeholder="تصميم داخلي, مشاريع حكومية, واجهات"
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        id="project-status"
                        type="checkbox"
                        checked={projectForm.status === "published"}
                        onChange={(event) =>
                          setProjectForm((prev) => ({
                            ...prev,
                            status: event.target.checked ? "published" : "draft",
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                      />
                      <label htmlFor="project-status">نشر المشروع فوراً بعد الحفظ</label>
                    </div>

                    {projectForm.id && (
                      <div
                        onDragOver={(event) => handleProjectDragOver(event, projectForm.id!)}
                        onDragLeave={handleProjectDragLeave}
                        onDrop={(event) => handleProjectDrop(event, projectForm.id!)}
                        className={`rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${
                          projectDragTarget === projectForm.id
                            ? "border-brand bg-brand/10"
                            : "border-slate-300 bg-slate-50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <FiImage className="h-10 w-10 text-brand" />
                          <p className="text-sm font-semibold text-slate-700">
                            اسحب وأفلت الصور هنا أو قم بالاختيار من جهازك
                          </p>
                          <p className="text-xs text-slate-500">
                            يتم حفظ الملفات في التخزين المحلي ثم تضمينها تلقائياً في هذا المشروع.
                          </p>
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand px-4 py-2 text-xs font-semibold text-brand transition hover:bg-brand/10">
                            اختيار ملفات
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(event) => handleProjectImageInput(event, projectForm.id!)}
                            />
                          </label>
                          {uploadingProjectId === projectForm.id && (
                            <p className="text-xs font-semibold text-brand">جاري رفع الصور...</p>
                          )}
                        </div>
                      </div>
                    )}

                    {projectForm.id && projectForm.gallery.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-700">معرض المشروع</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {projectForm.gallery.map((image) => {
                            const altDraft = projectImageAltDrafts[image.id] ?? image.altText ?? "";
                            const isFeatured = projectForm.featuredImageId === image.id;
                            return (
                              <div
                                key={image.id}
                                className={`flex h-full flex-col overflow-hidden rounded-2xl border ${
                                  isFeatured ? "border-brand" : "border-slate-200"
                                } bg-white shadow-sm`}
                              >
                                <img
                                  src={apiClient.baseUrl + image.url}
                                  alt={image.originalName}
                                  className="h-48 w-full object-cover"
                                />
                                <div className="flex flex-1 flex-col gap-3 p-4 text-sm">
                                  <div className="flex items-center justify-between">
                                    <p className="font-semibold text-slate-800">
                                      {image.originalName}
                                    </p>
                                    {isFeatured && (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                                        <FiStar className="h-3 w-3" />
                                        صورة مميزة
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    {(image.size / (1024 * 1024)).toFixed(2)} MB • {image.mimeType}
                                  </p>
                                  <input
                                    value={altDraft}
                                    onChange={(event) =>
                                      setProjectImageAltDrafts((prev) => ({
                                        ...prev,
                                        [image.id]: event.target.value,
                                      }))
                                    }
                                    placeholder="نص بديل للصورة"
                                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                                  />
                                  <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <button
                                      type="button"
                                      onClick={() => void handleProjectImageAltSave(projectForm.id!, image)}
                                      className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1 font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
                                    >
                                      <FiEdit2 className="h-3 w-3" />
                                      حفظ الوصف
                                    </button>
                                    <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-slate-300 px-3 py-1 font-semibold text-slate-600 transition hover:border-brand hover:text-brand">
                                      استبدال
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(event) => {
                                          const file = event.target.files?.[0];
                                          if (file) {
                                            void handleProjectImageUpdate(projectForm.id!, image.id, {
                                              file,
                                              altText: altDraft,
                                            });
                                          }
                                          event.target.value = "";
                                        }}
                                      />
                                    </label>
                                    {!isFeatured ? (
                                      <button
                                        type="button"
                                        onClick={() => void handleSetFeaturedImage(projectForm.id!, image.id)}
                                        className="inline-flex items-center gap-1 rounded-md border border-brand px-3 py-1 font-semibold text-brand transition hover:bg-brand/10"
                                      >
                                        <FiStar className="h-3 w-3" />
                                        تعيين كمميز
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => void handleClearFeaturedImage(projectForm.id!, image.id)}
                                        className="inline-flex items-center gap-1 rounded-md border border-amber-300 px-3 py-1 font-semibold text-amber-600 transition hover:bg-amber-100"
                                      >
                                        إزالة التمييز
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => void handleDeleteProjectImage(projectForm.id!, image.id)}
                                      className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-1 font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                      <FiTrash2 className="h-3 w-3" />
                                      حذف
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                      <button
                        type="button"
                        onClick={handleProjectPreview}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
                      >
                        <FiEye className="h-4 w-4" />
                        معاينة
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingProject}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSavingProject ? "جارٍ الحفظ..." : projectForm.id ? "حفظ التعديلات" : "إنشاء المشروع"}
                      </button>
                    </div>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-title text-xl text-slate-900">قائمة المشاريع</h3>
                      <p className="text-sm text-slate-500">
                        قم بإدارة المشاريع المنشورة والمسودات، وتحرير محتواها أو حذفها عند الحاجة.
                      </p>
                    </div>
                    <p className="text-xs text-slate-400">
                      إجمالي المشاريع: <span className="font-semibold text-slate-600">{sortedProjects.length}</span>
                    </p>
                  </div>

                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-3 py-2">العنوان</th>
                          <th className="px-3 py-2">الرابط</th>
                          <th className="px-3 py-2">الحالة</th>
                          <th className="px-3 py-2">الوسوم</th>
                          <th className="px-3 py-2">آخر تحديث</th>
                          <th className="px-3 py-2 text-right">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sortedProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-slate-50">
                            <td className="px-3 py-3 font-semibold text-slate-700">{project.title}</td>
                            <td className="px-3 py-3 text-slate-500">/projects/{project.slug}</td>
                            <td className="px-3 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  project.status === "published"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {project.status === "published" ? "منشور" : "مسودة"}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-slate-500">
                              {project.tags.length > 0 ? project.tags.join(", ") : "—"}
                            </td>
                            <td className="px-3 py-3 text-slate-500">
                              {new Date(project.updatedAt).toLocaleString()}
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-brand"
                                  onClick={() => handleEditProject(project)}
                                >
                                  تعديل
                                </button>
                                {project.status === "published" ? (
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-amber-600"
                                    onClick={() => handleUnpublishProject(project.id)}
                                  >
                                    إلغاء النشر
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-emerald-600"
                                    onClick={() => handlePublishProject(project.id)}
                                  >
                                    نشر
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-red-500"
                                  onClick={() => handleDeleteProject(project.id)}
                                >
                                  حذف
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {sortedProjects.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-400">
                              لم يتم إنشاء أي مشاريع حتى الآن.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </section>
            )}
            {activeTab === "pages" && (
              <section className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-title text-2xl text-slate-900">
                        {pageForm.id ? "تعديل الصفحة" : "إنشاء صفحة جديدة"}
                      </h2>
                      <p className="text-sm text-slate-500">
                        قم بإنشاء صفحات للموقع ثم انشرها لتظهر لزوارك. يمكنك معاينة المحتوى قبل النشر.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
                        {sortedPages.filter((page) => page.status === "published").length} منشورة
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
                        {sortedPages.filter((page) => page.status !== "published").length} مسودة
                      </span>
                    </div>
                  </div>

                  <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handlePageSubmit}>
                    <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          عنوان الصفحة
                        </label>
                        <input
                          required
                          value={pageForm.title}
                          onChange={(event) =>
                            setPageForm((prev) => ({ ...prev, title: event.target.value }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الرابط المختصر (slug)
                        </label>
                        <input
                          required
                          value={pageForm.slug}
                          onChange={(event) =>
                            setPageForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                        <p className="mt-1 text-xs text-slate-400">
                          سيتم نشر الصفحة على الرابط /pages/{pageForm.slug || "your-slug"}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        ملخص قصير
                      </label>
                      <textarea
                        rows={3}
                        value={pageForm.excerpt}
                        onChange={(event) =>
                          setPageForm((prev) => ({ ...prev, excerpt: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        محتوى الصفحة (يدعم HTML)
                      </label>
                      <textarea
                        required
                        rows={10}
                        value={pageForm.content}
                        onChange={(event) =>
                          setPageForm((prev) => ({ ...prev, content: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        id="status"
                        type="checkbox"
                        checked={pageForm.status === "published"}
                        onChange={(event) =>
                          setPageForm((prev) => ({
                            ...prev,
                            status: event.target.checked ? "published" : "draft",
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                      />
                      <label htmlFor="status">نشر الصفحة فوراً بعد الحفظ</label>
                    </div>
                    <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end">
                      <button
                        type="button"
                        onClick={handlePreviewPage}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
                      >
                        <FiEye className="h-4 w-4" />
                        معاينة
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingPage}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSavingPage ? "جارٍ الحفظ..." : pageForm.id ? "حفظ التعديلات" : "إنشاء الصفحة"}
                      </button>
                    </div>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-title text-xl text-slate-900">قائمة الصفحات</h3>
                      <p className="text-sm text-slate-500">
                        الصفحات المنشورة متاحة للعامة. الصفحات المسودة لا تظهر إلا للمسؤولين.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-3 py-2">العنوان</th>
                          <th className="px-3 py-2">الرابط</th>
                          <th className="px-3 py-2">الحالة</th>
                          <th className="px-3 py-2">آخر تحديث</th>
                          <th className="px-3 py-2 text-right">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sortedPages.map((page) => (
                          <tr key={page.id} className="hover:bg-slate-50">
                            <td className="px-3 py-3 font-semibold text-slate-700">{page.title}</td>
                            <td className="px-3 py-3 text-slate-500">/pages/{page.slug}</td>
                            <td className="px-3 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  page.status === "published"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {page.status === "published" ? "منشورة" : "مسودة"}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-slate-500">
                              {new Date(page.updatedAt).toLocaleString()}
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-brand"
                                  onClick={() => handleEditPage(page)}
                                >
                                  تعديل
                                </button>
                                {page.status !== "published" && (
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-emerald-600"
                                    onClick={() => handlePublishPage(page.id)}
                                  >
                                    نشر
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-red-500"
                                  onClick={() => handleDeletePage(page.id)}
                                >
                                  حذف
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {sortedPages.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-400">
                              لم يتم إنشاء أي صفحات بعد.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </section>
            )}

            {activeTab === "settings" && settingsForm && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="font-title text-2xl text-slate-900">إعدادات الموقع</h2>
                <p className="mt-2 text-sm text-slate-500">
                  حدّث بيانات العلامة التجارية ومعلومات التواصل وروابط التواصل الاجتماعي المعروضة في الموقع.
                </p>
                <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSettingsSubmit}>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      اسم الموقع
                    </label>
                    <input
                      required
                      value={settingsForm.siteTitle}
                      onChange={(event) =>
                        setSettingsForm((prev) =>
                          prev ? { ...prev, siteTitle: event.target.value } : prev,
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      نص حقوق النشر
                    </label>
                    <input
                      required
                      value={settingsForm.footerText}
                      onChange={(event) =>
                        setSettingsForm((prev) =>
                          prev ? { ...prev, footerText: event.target.value } : prev,
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      البريد الإلكتروني
                    </label>
                    <input
                      required
                      value={settingsForm.contact.email}
                      onChange={(event) =>
                        setSettingsForm((prev) =>
                          prev
                            ? { ...prev, contact: { ...prev.contact, email: event.target.value } }
                            : prev,
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      رقم الهاتف
                    </label>
                    <input
                      required
                      value={settingsForm.contact.phone}
                      onChange={(event) =>
                        setSettingsForm((prev) =>
                          prev
                            ? { ...prev, contact: { ...prev.contact, phone: event.target.value } }
                            : prev,
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      العنوان التفصيلي
                    </label>
                    <input
                      required
                      value={settingsForm.contact.address}
                      onChange={(event) =>
                        setSettingsForm((prev) =>
                          prev
                            ? { ...prev, contact: { ...prev.contact, address: event.target.value } }
                            : prev,
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-slate-600">روابط التواصل الاجتماعي</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {DEFAULT_SOCIAL_KEYS.map((key) => (
                        <div key={key}>
                          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {key}
                          </label>
                          <input
                            value={settingsForm.socialLinks[key] ?? ""}
                            onChange={(event) =>
                              setSettingsForm((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      socialLinks: {
                                        ...prev.socialLinks,
                                        [key]: event.target.value,
                                      },
                                    }
                                  : prev,
                              )
                            }
                            placeholder="https://"
                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSavingSettings ? "جارٍ التحديث..." : "حفظ الإعدادات"}
                    </button>
                  </div>
                </form>
              </motion.section>
            )}

            {activeTab === "media" && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-title text-2xl text-slate-900">مكتبة الوسائط</h2>
                    <p className="text-sm text-slate-500">
                      اسحب الصور إلى المنطقة التالية أو اخترها يدوياً ليتم حفظها فوراً في التخزين المحلي.
                    </p>
                  </div>
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setMediaDragActive(true);
                    }}
                    onDragLeave={() => setMediaDragActive(false)}
                    onDrop={handleMediaDrop}
                    className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-5 py-4 text-center transition ${
                      mediaDragActive ? "border-brand bg-brand/10" : "border-slate-300 bg-slate-50"
                    }`}
                  >
                    <FiUpload className="h-6 w-6 text-brand" />
                    <p className="text-xs text-slate-500">
                      اسحب الملفات أو استخدم الزر أدناه لرفع الوسائط
                    </p>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10">
                      {isUploadingMedia ? "جاري الرفع..." : "اختيار صور"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaUpload}
                        disabled={isUploadingMedia}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {sortedMedia.map((item) => (
                    <div
                      key={item.id}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
                    >
                      <img
                        src={apiClient.baseUrl + item.url}
                        alt={item.originalName}
                        className="h-40 w-full object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between gap-3 p-4 text-sm">
                        <div>
                          <p className="font-semibold text-slate-800">{item.originalName}</p>
                          <p className="text-xs text-slate-500">
                            {(item.size / (1024 * 1024)).toFixed(2)} MB • {item.mimeType}
                          </p>
                          <p className="mt-2 break-all text-xs text-slate-500">
                            {apiClient.baseUrl}
                            {item.url}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(item.id)}
                          className="inline-flex items-center gap-2 self-start rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <FiTrash2 className="h-4 w-4" />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {sortedMedia.length === 0 && (
                  <p className="text-sm text-slate-500">لم يتم رفع أي ملفات بعد.</p>
                )}
              </motion.section>
            )}

            {activeTab === "navigation" && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-title text-2xl text-slate-900">قائمة التصفح</h2>
                    <p className="text-sm text-slate-500">
                      تحكم بترتيب وروابط القائمة الرئيسية الظاهرة في الموقع.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addNavigationItem}
                    className="inline-flex items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/20"
                  >
                    <FiPlus className="h-4 w-4" />
                    إضافة رابط
                  </button>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleNavigationSubmit}>
                  {sortedNavigation.map((item) => (
                    <div
                      key={item._localId}
                      className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[2fr,2fr,1fr,auto]"
                    >
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          التسمية
                        </label>
                        <input
                          value={item.label}
                          onChange={(event) =>
                            handleNavigationChange(item._localId, { label: event.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الرابط
                        </label>
                        <input
                          value={item.path}
                          onChange={(event) =>
                            handleNavigationChange(item._localId, { path: event.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الترتيب
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={item.order}
                          onChange={(event) =>
                            handleNavigationChange(item._localId, {
                              order: Number(event.target.value),
                            })
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div className="flex items-end justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveNavigation(item._localId)}
                          className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <FiTrash2 className="h-4 w-4" />
                          إزالة
                        </button>
                      </div>
                    </div>
                  ))}

                  {sortedNavigation.length === 0 && (
                    <p className="text-sm text-slate-500">
                      لم يتم إعداد روابط بعد. استخدم زر &quot;إضافة رابط&quot; لبدء إنشاء القائمة.
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingNavigation}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSavingNavigation ? "جارٍ الحفظ..." : "حفظ القائمة"}
                    </button>
                  </div>
                </form>
              </motion.section>
            )}

            {activeTab === "admins" && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {canManageAdmins ? (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-title text-2xl text-slate-900">حسابات المسؤولين</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        قم بإدارة حسابات المشرفين على لوحة التحكم. يجب أن يبقى حساب مالك واحد على الأقل فعالاً.
                      </p>
                    </div>

                    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleAdminSubmit}>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          البريد الإلكتروني
                        </label>
                        <input
                          required
                          type="email"
                          value={adminForm.email}
                          onChange={(event) =>
                            setAdminForm((prev) => ({ ...prev, email: event.target.value }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الاسم
                        </label>
                        <input
                          value={adminForm.name}
                          onChange={(event) =>
                            setAdminForm((prev) => ({ ...prev, name: event.target.value }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          الصلاحيات
                        </label>
                        <select
                          value={adminForm.role}
                          onChange={(event) =>
                            setAdminForm((prev) => ({
                              ...prev,
                              role: event.target.value as AdminRole,
                            }))
                          }
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        >
                          <option value="owner">مالك (جميع الصلاحيات)</option>
                          <option value="editor">محرر (تحرير المحتوى فقط)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          كلمة المرور
                        </label>
                        <input
                          type="password"
                          required={!adminForm.id}
                          value={adminForm.password ?? ""}
                          onChange={(event) =>
                            setAdminForm((prev) => ({ ...prev, password: event.target.value }))
                          }
                          placeholder={adminForm.id ? "اترك الحقل فارغاً للحفاظ على كلمة المرور الحالية" : ""}
                          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>

                      <div className="md:col-span-2 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={resetAdminForm}
                          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingAdmin}
                          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSavingAdmin ? "جارٍ الحفظ..." : adminForm.id ? "حفظ التعديلات" : "إضافة مسؤول"}
                        </button>
                      </div>
                    </form>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead>
                          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                            <th className="px-3 py-2">البريد</th>
                            <th className="px-3 py-2">الاسم</th>
                            <th className="px-3 py-2">الدور</th>
                            <th className="px-3 py-2">آخر تحديث</th>
                            <th className="px-3 py-2 text-right">إجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sortedAdmins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-slate-50">
                              <td className="px-3 py-3 font-semibold text-slate-700">{admin.email}</td>
                              <td className="px-3 py-3 text-slate-500">{admin.name ?? "—"}</td>
                              <td className="px-3 py-3">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                    admin.role === "owner"
                                      ? "bg-brand/15 text-brand"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {admin.role === "owner" ? "مالك" : "محرر"}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-slate-500">
                                {new Date(admin.updatedAt).toLocaleString()}
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-brand"
                                    onClick={() => handleEditAdmin(admin)}
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-red-500"
                                    onClick={() => handleDeleteAdmin(admin.id)}
                                    disabled={admin.id === adminForm.id}
                                  >
                                    حذف
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {sortedAdmins.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-400">
                                لم يتم إضافة مسؤولين بعد.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    حسابك يمتلك صلاحية &quot;محرر&quot;. لعرض المسؤولين قم بالاتصال بمالك المنصة.
                  </p>
                )}
              </motion.section>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {previewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setPreviewData(null)}
                className="absolute right-4 top-4 text-sm font-semibold text-slate-400 hover:text-brand"
              >
                إغلاق
              </button>
              <h3 className="font-title text-2xl text-slate-900">{previewData.title}</h3>
              {previewData.excerpt && <p className="mt-2 text-sm text-slate-500">{previewData.excerpt}</p>}
              <article
                className="prose prose-slate mt-6 max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
              />
            </motion.div>
          </motion.div>
        )}
        {projectPreviewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setProjectPreviewData(null)}
                className="absolute right-4 top-4 text-sm font-semibold text-slate-400 hover:text-brand"
              >
                إغلاق
              </button>
              <h3 className="font-title text-2xl text-slate-900">{projectPreviewData.title}</h3>
              {projectPreviewData.summary && (
                <p className="mt-2 text-sm text-slate-500">{projectPreviewData.summary}</p>
              )}
              {projectPreviewData.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {projectPreviewData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <article
                className="prose prose-slate mt-6 max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedProjectPreview }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardPage;

