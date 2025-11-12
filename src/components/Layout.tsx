import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { i18n } = useTranslation();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const direction = i18n.dir(resolvedLanguage);

  return (
    <div
      dir={direction}
      className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300"
    >
      <Navbar />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;

