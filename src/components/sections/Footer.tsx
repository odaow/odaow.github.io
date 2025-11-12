import type { FormEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isRTL = i18n.dir() === "rtl";

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/bim-services", label: t("nav.bim") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-100 bg-slate-50/70">
      <div
        className={`mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`grid gap-10 md:grid-cols-[1.2fr,1fr,1fr] ${
            isRTL ? "md:text-right" : "md:text-left"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full border-2 border-brand-accent"></span>
              <p className="text-lg font-bold uppercase tracking-[0.2em]">{t("brand")}</p>
            </div>
            <p className="max-w-sm text-sm text-slate-600">{t("footer.tagLine")}</p>
            <p className="text-sm font-medium text-slate-500">{t("footer.location")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("footer.quickLinks")}
            </h3>
            <nav className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="transition-colors duration-200 hover:text-brand-accent"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("footer.newsletter.title")}
            </h3>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-900"
              >
                {submitted ? "✓" : t("footer.newsletter.button")}
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">{t("footer.newsletter.disclaimer")}</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 text-xs text-slate-500">
          {t("footer.rights", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

