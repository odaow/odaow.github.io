import { LayoutGroup, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { languageOptions } from "../i18n/config";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const rawLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const baseLanguage = rawLanguage.split("-")[0] as "en" | "ar";
  const activeLanguage = languageOptions.some((lang) => lang.code === baseLanguage)
    ? baseLanguage
    : "en";

  const handleChange = (code: "en" | "ar") => {
    if (code !== activeLanguage) {
      void i18n.changeLanguage(code);
    }
  };

  return (
    <LayoutGroup>
      <div className="relative inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur">
        {languageOptions.map((lang) => {
          const isActive = lang.code === activeLanguage;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChange(lang.code)}
              className={`relative z-10 mx-0.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
                isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="langToggle"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-light"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {lang.label}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default LanguageToggle;

