import type { Response } from "express";
import jwt from "jsonwebtoken";

import { COOKIE_DOMAIN, COOKIE_NAME, COOKIE_SECURE, JWT_SECRET } from "./config.js";
import type { AdminUser } from "./types.js";

export type AuthTokenPayload = {
  sub: string;
  id: string;
  email: string;
  role: AdminUser["role"];
  name?: string;
};

export type SafeAdminUser = Omit<AdminUser, "passwordHash">;

export const signAuthToken = (user: AdminUser) => {
  const payload: AuthTokenPayload = {
    sub: user.id,
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "12h",
  });
};

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
};

export const sanitizeAdmin = (user: AdminUser): SafeAdminUser => {
  const { passwordHash, ...rest } = user;
  return rest;
};

export const authCookieOptions = {
  httpOnly: true,
  secure: COOKIE_SECURE,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 12 * 60 * 60 * 1000,
  ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, authCookieOptions);
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    ...authCookieOptions,
    expires: new Date(0),
  });
};

