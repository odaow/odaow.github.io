import { Router } from "express";

import { sanitizeAdmin, setAuthCookie, clearAuthCookie, signAuthToken } from "../auth.js";
import { getAdmins } from "../database.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { requireAuth } from "../middleware/authenticate.js";
import { verifyPassword } from "../utils/password.js";
import { loginSchema } from "../utils/validation.js";

const router = Router();

router.post("/login", async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid credentials", issues: parseResult.error.issues });
  }

  const { email, password } = parseResult.data;
  const admins = await getAdmins();
  const admin = admins.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passwordMatch = await verifyPassword(password, admin.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = signAuthToken(admin);
  setAuthCookie(res, token);
  return res.json({ user: sanitizeAdmin(admin), token });
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  return res.json({ success: true });
});

router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  return res.json({ user: req.user });
});

export default router;

