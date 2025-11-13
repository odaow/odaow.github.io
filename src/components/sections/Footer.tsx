import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { FiGrid, FiLogIn } from "react-icons/fi";

import { useSiteSettings } from "../../context/SiteSettingsContext";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { navigation, settings } = useSiteSettings();
  const { isAuthenticated, isLoading } = useAuth();
  const adminButton = (() => {
    if (isLoading) return null;

    if (isAuthenticated) {
      return (
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <FiGrid className="h-4 w-4" aria-hidden />
          <span>لوحة التحكم</span>
        </Link>
      );
    }

    return (
      <Link
        to="/admin/login"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-200"
      >
        <FiLogIn className="h-4 w-4" aria-hidden />
        <span>دخول لوحة التحكم</span>
      </Link>
    );
  })();

  const isRTL = i18n.dir() === "rtl";

  const fallbackLinks = [
    { id: "home", path: "/", label: t("nav.home"), isExternal: false },
    { id: "about", path: "/about", label: t("nav.about"), isExternal: false },
    { id: "services", path: "/services", label: t("nav.services"), isExternal: false },
    { id: "bim-services", path: "/bim-services", label: t("nav.bim"), isExternal: false },
    { id: "projects", path: "/projects", label: t("nav.projects"), isExternal: false },
    { id: "contact", path: "/contact", label: t("nav.contact"), isExternal: false },
  ];

  const links = (navigation.length > 0 ? navigation : fallbackLinks).map((item) => ({
    id: "id" in item ? item.id : undefined,
    path: item.path,
    label: item.label,
    isExternal: "isExternal" in item ? item.isExternal : false,
  }));

  const socialEntries = Object.entries(settings?.socialLinks ?? {}).filter(
    ([, value]) => Boolean(value),
  );

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
              <p className="text-lg font-bold uppercase tracking-[0.2em]">
                {settings?.siteTitle ?? t("brand")}
              </p>
            </div>
            <p className="max-w-sm text-sm text-slate-600">
              {settings?.footerText ?? t("footer.tagLine")}
            </p>
            <div className="space-y-1 text-sm text-slate-600">
              {settings?.contact?.address && <p>{settings.contact.address}</p>}
              {settings?.contact?.phone && <p>{settings.contact.phone}</p>}
              {settings?.contact?.email && (
                <a
                  className="text-brand hover:underline"
                  href={`mailto:${settings.contact.email}`}
                >
                  {settings.contact.email}
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("footer.quickLinks")}
            </h3>
            <nav className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
              {links.map((link) =>
                link.isExternal || /^https?:\/\//.test(link.path) ? (
                  <a
                    key={link.id ?? link.path}
                    href={link.path}
                    className="transition-colors duration-200 hover:text-brand-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.id ?? link.path}
                    to={link.path}
                    className="transition-colors duration-200 hover:text-brand-accent"
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("footer.connect")}
            </h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {socialEntries.length > 0 ? (
                socialEntries.map(([network, url]) => (
                  <a
                    key={network}
                    href={url as string}
                    className="block transition-colors duration-200 hover:text-brand-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {network.charAt(0).toUpperCase() + network.slice(1)}
                  </a>
                ))
              ) : (
                <p className="text-sm text-slate-400">{t("footer.noSocialLinks")}</p>
              )}
            </div>
          </div>
        </div>

        <div className={`flex flex-col gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
          {adminButton}
          {t("footer.rights", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

