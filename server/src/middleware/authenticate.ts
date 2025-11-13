import type { NextFunction, Request, Response } from "express";

import { COOKIE_NAME } from "../config";
import { verifyAuthToken } from "../auth.js";
import type { AuthTokenPayload } from "../auth.js";

export type AuthenticatedRequest = Request & {
  user?: AuthTokenPayload;
};

export const authenticate = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const cookieToken = req.cookies?.[COOKIE_NAME];
  const header = req.header("authorization");
  const bearerToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  const token = cookieToken ?? bearerToken;

  if (token) {
    const payload = verifyAuthToken(token);
    if (payload) {
      req.user = payload;
    }
  }

  next();
};

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  return next();
};

export const requireOwner = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  if (req.user.role !== "owner") {
    return res.status(403).json({ message: "Owner role required to perform this action." });
  }
  return next();
};

