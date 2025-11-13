import "./index.css";
import "./i18n/config";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SiteContentProvider } from "./context/SiteContentContext.tsx";
import { SiteSettingsProvider } from "./context/SiteSettingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <SiteContentProvider>
            <SiteSettingsProvider>
              <App />
            </SiteSettingsProvider>
          </SiteContentProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
