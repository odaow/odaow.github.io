import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SeoHead from "../components/SeoHead";
import { useSiteContent } from "../context/SiteContentContext";
import type { Project } from "../data/defaultContent";

const heroImage =
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80";
const projectImages = [
  "https://images.unsplash.com/photo-1529429617124-aee0a93d72cc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1541264161754-445bbdd7de3d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { projects } = useSiteContent();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const baseLanguage = (resolvedLanguage.split("-")[0] as "en" | "ar") ?? "en";
  const isRTL = i18n.dir(resolvedLanguage) === "rtl";

  const stats = t("hero.stats", { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;
  const featuredProjects = useMemo(() => {
    const selection = projects.filter((project) => project.featured);
    const pool = selection.length > 0 ? selection : projects;
    return pool.slice(0, 3);
  }, [projects]);

  const categories = t("projects.categories", {
    returnObjects: true,
  }) as Record<Project["category"], string>;

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <SeoHead title={`${t("meta.title")} | ${t("nav.home")}`} description={t("hero.subtitle")} />
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImage}
          alt="Modern architectural skyline"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/20" />
        <div className="mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col items-start justify-center gap-10 px-4 py-24">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.5em] text-white/80"
          >
            {t("hero.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl font-title text-4xl leading-tight text-white md:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-base text-white/80 md:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className={`flex flex-wrap items-center gap-4 ${isRTL ? "justify-end" : "justify-start"}`}
          >
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-200"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:text-white/90"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`grid gap-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur md:grid-cols-3 ${
              isRTL ? "md:text-right" : "md:text-left"
            }`}
          >
            {stats.map((item) => (
              <div key={item.label} className="space-y-1 text-white">
                <p className="text-3xl font-bold md:text-4xl">{item.value}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[1.1fr,1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="font-title text-3xl text-slate-900 md:text-4xl">{t("home.aboutTitle")}</h2>
            <p className="text-base leading-relaxed text-slate-600">{t("home.aboutBody")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand"
              >
                {t("cta.discover")}
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
              >
                {t("cta.exploreServices")}
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1000&q=80"
              alt="Nebras Office studio workspace"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-slate-900/10" />
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="font-title text-3xl text-slate-900 md:text-4xl">{t("home.featuredTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">{t("home.featuredSubtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <img
                  src={project.imageUrl ?? projectImages[index % projectImages.length]}
                  alt={project.title[baseLanguage]}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {categories[project.category]}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {project.title[baseLanguage]}
                  </h3>
                  <p className="text-sm text-slate-500">{project.location[baseLanguage]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=1600&q=80"
            alt="Architectural detail"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-title text-3xl md:text-4xl"
          >
            {t("cta.contact")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-base text-white/80"
          >
            {t("contact.heroSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-200"
            >
              {t("cta.talkToUs")}
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              {t("cta.viewProjects")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

