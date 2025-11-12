import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import SeoHead from "../components/SeoHead";
import { useSiteContent } from "../context/SiteContentContext";

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const { team } = useSiteContent();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const baseLanguage = (resolvedLanguage.split("-")[0] as "en" | "ar") ?? "en";
  const isRTL = i18n.dir(resolvedLanguage) === "rtl";

  const approachPoints = t("about.approachPoints", { returnObjects: true }) as string[];

  return (
    <div className={`${isRTL ? "text-right" : "text-left"} bg-white`}>
      <SeoHead
        title={`${t("meta.title")} | ${t("nav.about")}`}
        description={t("about.intro")}
      />
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1511295742362-92c96b1d1dde?auto=format&fit=crop&w=1600&q=80"
          alt="Architectural interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-slate-900/75" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.5em] text-white/70"
          >
            {t("brand")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-title text-4xl md:text-5xl"
          >
            {t("about.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base text-white/80 md:text-lg"
          >
            {t("about.intro")}
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {t("about.missionTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">{t("about.missionBody")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {t("about.visionTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">{t("about.visionBody")}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="font-title text-3xl text-slate-900 md:text-4xl">{t("about.approachTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">{t("about.intro")}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {approachPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base text-slate-700">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className={`mb-10 ${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="font-title text-3xl text-slate-900 md:text-4xl">{t("about.teamTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">{t("about.teamIntro")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="h-24 w-24 overflow-hidden rounded-full border border-slate-200">
                  <img
                    src={member.imageUrl}
                    alt={member.name[baseLanguage]}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {member.name[baseLanguage]}
                </h3>
                <p className="text-sm text-slate-500">{member.role[baseLanguage]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

