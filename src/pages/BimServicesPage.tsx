import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SeoHead from "../components/SeoHead";

const imagery = [
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518322064958-1643a4c1fcff?auto=format&fit=crop&w=1200&q=80",
];

const BimServicesPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const pillars = t("bim.pillars", {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>;

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <SeoHead
        title={`${t("meta.title")} | ${t("nav.bim")}`}
        description={t("bim.heroSubtitle")}
      />
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <img
          src={imagery[0]}
          alt="Digital modeling process"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-900/40" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-title text-4xl md:text-5xl"
          >
            {t("bim.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-base text-white/80 md:text-lg"
          >
            {t("bim.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[1.2fr,1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400">BIM</h2>
            <h3 className="font-title text-3xl text-slate-900 md:text-4xl">{t("bim.heroTitle")}</h3>
            <p className="text-base leading-relaxed text-slate-600">{t("bim.intro")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <img
              src={imagery[1]}
              alt="Engineers collaborating with BIM"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-slate-900/40" />
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <img
          src={imagery[2]}
          alt="City skyline rendered with BIM technology"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-slate-900/70" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-title text-3xl md:text-4xl"
          >
            {t("bim.ctaTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-base text-white/80"
          >
            {t("bim.ctaBody")}
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
              {t("bim.ctaButton")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BimServicesPage;

