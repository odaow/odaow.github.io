import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import SeoHead from "../components/SeoHead";
import { useAuth } from "../context/AuthContext";
import { useSiteContent } from "../context/SiteContentContext";
import type { ProjectCategory } from "../data/defaultContent";

type TeamFormState = {
  id?: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  imageUrl: string;
};

type ProjectFormState = {
  id?: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: ProjectCategory;
  imageUrl: string;
  featured: boolean;
};

const EMPTY_TEAM_FORM: TeamFormState = {
  nameEn: "",
  nameAr: "",
  roleEn: "",
  roleAr: "",
  imageUrl: "",
};

const EMPTY_PROJECT_FORM: ProjectFormState = {
  titleEn: "",
  titleAr: "",
  locationEn: "",
  locationAr: "",
  descriptionEn: "",
  descriptionAr: "",
  category: "civic",
  imageUrl: "",
  featured: false,
};

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const {
    projects,
    team,
    addProject,
    updateProject,
    removeProject,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
  } = useSiteContent();

  const [teamForm, setTeamForm] = useState<TeamFormState>(EMPTY_TEAM_FORM);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(EMPTY_PROJECT_FORM);
  const [teamEditing, setTeamEditing] = useState<string | null>(null);
  const [projectEditing, setProjectEditing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const handleTeamSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      imageUrl: teamForm.imageUrl || "https://via.placeholder.com/300x300.png?text=Team+Member",
      name: {
        en: teamForm.nameEn,
        ar: teamForm.nameAr,
      },
      role: {
        en: teamForm.roleEn,
        ar: teamForm.roleAr,
      },
    };

    if (teamEditing) {
      updateTeamMember(teamEditing, payload);
      setFeedback("تم تحديث بيانات الفريق بنجاح.");
    } else {
      addTeamMember(payload);
      setFeedback("تمت إضافة عضو جديد للفريق.");
    }

    setTeamForm(EMPTY_TEAM_FORM);
    setTeamEditing(null);
  };

  const handleProjectSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      category: projectForm.category,
      imageUrl:
        projectForm.imageUrl || "https://via.placeholder.com/600x400.png?text=Nebras+Project",
      title: {
        en: projectForm.titleEn,
        ar: projectForm.titleAr,
      },
      location: {
        en: projectForm.locationEn,
        ar: projectForm.locationAr,
      },
      description: {
        en: projectForm.descriptionEn,
        ar: projectForm.descriptionAr,
      },
      featured: projectForm.featured,
    };

    if (projectEditing) {
      updateProject(projectEditing, payload);
      setFeedback("تم تحديث بيانات المشروع بنجاح.");
    } else {
      addProject(payload);
      setFeedback("تمت إضافة مشروع جديد.");
    }

    setProjectForm(EMPTY_PROJECT_FORM);
    setProjectEditing(null);
  };

  const startEditTeam = (id: string) => {
    const member = team.find((item) => item.id === id);
    if (!member) return;
    setTeamEditing(id);
    setTeamForm({
      nameEn: member.name.en,
      nameAr: member.name.ar,
      roleEn: member.role.en,
      roleAr: member.role.ar,
      imageUrl: member.imageUrl,
    });
  };

  const startEditProject = (id: string) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    setProjectEditing(id);
    setProjectForm({
      titleEn: project.title.en,
      titleAr: project.title.ar,
      locationEn: project.location.en,
      locationAr: project.location.ar,
      descriptionEn: project.description.en,
      descriptionAr: project.description.ar,
      category: project.category,
      imageUrl: project.imageUrl,
      featured: Boolean(project.featured),
    });
  };

  const categories = useMemo(
    () =>
      t("projects.categories", {
        returnObjects: true,
      }) as Record<ProjectCategory, string>,
    [t],
  );

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.en.localeCompare(b.title.en);
      }),
    [projects],
  );

  return (
    <div className="bg-slate-50 pb-20">
      <SeoHead title="لوحة التحكم | مكتب النبراس الهندسي" description="إدارة محتوى الموقع" />
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-title text-3xl text-slate-900 md:text-4xl">لوحة التحكم</h1>
            <p className="mt-1 text-sm text-slate-500">
              قم بإدارة المشاريع وفريق العمل. يتم حفظ التغييرات تلقائياً على هذا الجهاز.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="self-start rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand"
          >
            تسجيل الخروج
          </button>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm"
          >
            {feedback}
          </motion.div>
        )}

        <div className="mt-12 grid gap-12">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-title text-2xl text-slate-900">فريق العمل</h2>
                <p className="text-sm text-slate-500">
                  أضف أو عدل بيانات فريق مكتب النبراس الهندسي.
                </p>
              </div>
              {teamEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setTeamEditing(null);
                    setTeamForm(EMPTY_TEAM_FORM);
                  }}
                  className="text-xs font-semibold text-brand underline"
                >
                  إلغاء التعديل
                </button>
              )}
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleTeamSubmit}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  الاسم (إنجليزي)
                </label>
                <input
                  required
                  value={teamForm.nameEn}
                  onChange={(event) => setTeamForm((prev) => ({ ...prev, nameEn: event.target.value }))}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  الاسم (عربي)
                </label>
                <input
                  required
                  value={teamForm.nameAr}
                  onChange={(event) => setTeamForm((prev) => ({ ...prev, nameAr: event.target.value }))}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  المنصب (إنجليزي)
                </label>
                <input
                  required
                  value={teamForm.roleEn}
                  onChange={(event) => setTeamForm((prev) => ({ ...prev, roleEn: event.target.value }))}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  المنصب (عربي)
                </label>
                <input
                  required
                  value={teamForm.roleAr}
                  onChange={(event) => setTeamForm((prev) => ({ ...prev, roleAr: event.target.value }))}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  رابط الصورة
                </label>
                <input
                  value={teamForm.imageUrl}
                  onChange={(event) =>
                    setTeamForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                  }
                  placeholder="https://"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                <p className="mt-1 text-xs text-slate-400">
                  استخدم رابط صورة مباشر (يفضل من Unsplash أو مرفوع خاص بك).
                </p>
              </div>
              {teamForm.imageUrl && (
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    معاينة
                  </p>
                  <img
                    src={teamForm.imageUrl}
                    alt="معاينة صورة العضو"
                    className="mt-2 h-40 w-full rounded-2xl border border-slate-200 object-cover md:h-48"
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  {teamEditing ? "حفظ التعديلات" : "إضافة عضو للفريق"}
                </button>
              </div>
            </form>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name.en}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{member.name.en}</p>
                      <p className="text-sm text-slate-500">{member.name.ar}</p>
                      <p className="mt-2 text-xs text-slate-400">
                        {member.role.en} | {member.role.ar}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-xs font-semibold text-brand"
                        onClick={() => startEditTeam(member.id)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-500"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-title text-2xl text-slate-900">المشاريع</h2>
                <p className="text-sm text-slate-500">
                  أضف أو عدل المشاريع المعروضة على الموقع وحدد المشاريع المميزة للصفحة الرئيسية.
                </p>
              </div>
              {projectEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setProjectEditing(null);
                    setProjectForm(EMPTY_PROJECT_FORM);
                  }}
                  className="text-xs font-semibold text-brand underline"
                >
                  إلغاء التعديل
                </button>
              )}
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleProjectSubmit}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  اسم المشروع (إنجليزي)
                </label>
                <input
                  required
                  value={projectForm.titleEn}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, titleEn: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  اسم المشروع (عربي)
                </label>
                <input
                  required
                  value={projectForm.titleAr}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, titleAr: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  الموقع (إنجليزي)
                </label>
                <input
                  required
                  value={projectForm.locationEn}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, locationEn: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  الموقع (عربي)
                </label>
                <input
                  required
                  value={projectForm.locationAr}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, locationAr: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  الفئة
                </label>
                <select
                  value={projectForm.category}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      category: event.target.value as ProjectCategory,
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  {Object.entries(categories).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  وصف المشروع (إنجليزي)
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.descriptionEn}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, descriptionEn: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  وصف المشروع (عربي)
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.descriptionAr}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, descriptionAr: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  رابط الصورة
                </label>
                <input
                  value={projectForm.imageUrl}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                  }
                  placeholder="https://"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              {projectForm.imageUrl && (
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    معاينة
                  </p>
                  <img
                    src={projectForm.imageUrl}
                    alt="معاينة صورة المشروع"
                    className="mt-2 h-48 w-full rounded-2xl border border-slate-200 object-cover"
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600 md:col-span-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, featured: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                />
                <label htmlFor="featured">إظهار هذا المشروع ضمن المشاريع المميزة في الصفحة الرئيسية</label>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  {projectEditing ? "حفظ التعديلات" : "إضافة مشروع"}
                </button>
              </div>
            </form>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {sortedProjects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title.en}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-2 p-4">
                    <span className="inline-flex items-center rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-slate-700">
                      {categories[project.category]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{project.title.en}</p>
                      <p className="text-sm text-slate-500">{project.title.ar}</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      {project.location.en} | {project.location.ar}
                    </p>
                    <p className="text-xs text-slate-500">{project.description.en}</p>
                    {project.featured && (
                      <p className="text-xs font-semibold text-emerald-600">مميز في الصفحة الرئيسية</p>
                    )}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        className="text-xs font-semibold text-brand"
                        onClick={() => startEditProject(project.id)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-500"
                        onClick={() => removeProject(project.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

