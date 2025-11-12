import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { AUTH_STORAGE_KEY, DEFAULT_PASSWORD, DEFAULT_USERNAME } from "./authConfig";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: async (username, password) => {
        const success =
          username.trim().toLowerCase() === DEFAULT_USERNAME &&
          password.trim() === DEFAULT_PASSWORD;
        if (success) {
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STORAGE_KEY, "true");
        }
        return success;
      },
      logout: () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      },
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

