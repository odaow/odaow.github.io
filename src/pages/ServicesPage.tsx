import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SeoHead from "../components/SeoHead";

const servicesImages = [
  // Architectural Design
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  // Structural Engineering
  "https://images.unsplash.com/photo-1523419409543-8c5ae80d40c6?auto=format&fit=crop&w=1200&q=80",
  // Interior Design
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  // Supervision
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  // BIM Services
  "https://images.unsplash.com/photo-1532618793071-e5f9a6a08a1a?auto=format&fit=crop&w=1200&q=80",
];

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const services = t("services.cards", {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;
  const processSteps = t("services.processSteps", {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>;

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <SeoHead
        title={`${t("meta.title")} | ${t("nav.services")}`}
        description={t("services.heroSubtitle")}
      />
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1600&q=80"
          alt="Architectural blueprint"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-slate-950/80 via-slate-900/70 to-slate-900/40" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-title text-4xl md:text-5xl"
          >
            {t("services.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-base text-white/80 md:text-lg"
          >
            {t("services.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <img
                  src={servicesImages[index % servicesImages.length]}
                  alt={service.title}
                  className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/bim-services"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
            >
              {t("services.bimCta")}
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-900"
            >
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-title text-3xl text-slate-900 md:text-4xl">{t("services.processTitle")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

