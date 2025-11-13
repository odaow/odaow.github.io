import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import { useSiteSettings } from "../../context/SiteSettingsContext";
import type { NavigationItem } from "../../types/api";
import LanguageToggle from "../LanguageToggle";

const navLinkClasses =
  "relative px-3 py-2 text-sm font-semibold transition-colors duration-200 hover:text-brand-accent";

const isExternalPath = (path: string) => /^https?:\/\//.test(path);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { navigation, settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);

  const fallbackNavItems: NavigationItem[] = [
    { id: "home", path: "/", label: t("nav.home"), order: 0 },
    { id: "about", path: "/about", label: t("nav.about"), order: 1 },
    { id: "services", path: "/services", label: t("nav.services"), order: 2 },
    { id: "bim-services", path: "/bim-services", label: t("nav.bim"), order: 3 },
    { id: "projects", path: "/projects", label: t("nav.projects"), order: 4 },
    { id: "contact", path: "/contact", label: t("nav.contact"), order: 5 },
  ];

  const navItems: NavigationItem[] = navigation.length > 0 ? navigation : fallbackNavItems;

  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const direction = i18n.dir(resolvedLanguage);
  const isRTL = direction === "rtl";

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      dir={direction}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-lg"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold uppercase tracking-[0.2em]"
          onClick={closeMenu}
        >
          <span className="h-8 w-8 rounded-full border-2 border-brand-accent"></span>
          <span>{settings?.siteTitle ?? t("brand")}</span>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) =>
            isExternalPath(item.path) || item.isExternal ? (
              <a
                key={item.id ?? item.path}
                href={item.path}
                className={`${navLinkClasses} text-slate-600`}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.id ?? item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? "text-brand-accent" : "text-slate-600"}`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 text-slate-700 shadow-sm transition-colors duration-200 hover:border-brand-accent hover:text-brand-accent md:hidden"
            onClick={handleToggle}
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <div
              className={`mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 pb-4 ${
                isRTL ? "items-end text-right" : "items-start text-left"
              }`}
            >
              {navItems.map((item) =>
                isExternalPath(item.path) || item.isExternal ? (
                  <a
                    key={item.id ?? item.path}
                    href={item.path}
                    className="w-full rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-brand"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    key={item.id ?? item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `w-full rounded-md px-3 py-2 text-sm font-semibold ${
                        isActive
                          ? "bg-brand-light/60 text-brand"
                          : "text-slate-600 hover:bg-slate-100 hover:text-brand"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

