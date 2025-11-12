import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import SeoHead from "../components/SeoHead";
import { useSiteContent } from "../context/SiteContentContext";
import type { ProjectCategory } from "../data/defaultContent";

const ProjectsPage = () => {
  const { t, i18n } = useTranslation();
  const { projects } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const baseLanguage = (resolvedLanguage.split("-")[0] as "en" | "ar") ?? "en";

  const categories = t("projects.categories", {
    returnObjects: true,
  }) as Record<ProjectCategory, string>;

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const isRTL = i18n.dir(resolvedLanguage) === "rtl";

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <SeoHead
        title={`${t("meta.title")} | ${t("nav.projects")}`}
        description={t("projects.heroSubtitle")}
      />
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
          alt="Modern skyline at night"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/75" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-title text-4xl md:text-5xl"
          >
            {t("projects.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-base text-white/80 md:text-lg"
          >
            {t("projects.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <div className={`flex flex-wrap items-center gap-3 ${isRTL ? "justify-end" : "justify-start"}`}>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                activeCategory === "all"
                  ? "border-transparent bg-slate-900 text-white shadow"
                  : "border-slate-200 text-slate-600 hover:border-brand hover:text-brand"
              }`}
            >
              {t("projects.filterAll")}
            </button>
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  activeCategory === key
                    ? "border-transparent bg-slate-900 text-white shadow"
                    : "border-slate-200 text-slate-600 hover:border-brand hover:text-brand"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title[baseLanguage]}
                  className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {categories[project.category]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {project.title[baseLanguage]}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {project.location[baseLanguage]}
                    </p>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    {project.description[baseLanguage]}
                  </p>
                  <span className="text-sm font-semibold text-brand">{t("projects.detailsLabel")}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

