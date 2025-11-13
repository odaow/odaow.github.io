import { Router } from "express";

import { sanitizeAdmin } from "../auth.js";
import { getAdmins, saveAdmins } from "../database.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { requireAuth, requireOwner } from "../middleware/authenticate.js";
import { generateId } from "../utils/id.js";
import { hashPassword } from "../utils/password.js";
import { adminCreateSchema, adminUpdateSchema } from "../utils/validation.js";

const router = Router();

router.use(requireAuth);
router.use(requireOwner);

router.get("/", async (_req, res) => {
  const admins = await getAdmins();
  res.json({ admins: admins.map(sanitizeAdmin) });
});

router.post("/", async (req: AuthenticatedRequest, res) => {
  const parse = adminCreateSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid admin data.", issues: parse.error.issues });
  }

  const admins = await getAdmins();
  const exists = admins.some((admin) => admin.email.toLowerCase() === parse.data.email.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: "Email already in use." });
  }

  const now = new Date().toISOString();
  const newAdmin = {
    id: generateId(),
    email: parse.data.email.toLowerCase(),
    name: parse.data.name,
    role: parse.data.role,
    passwordHash: await hashPassword(parse.data.password),
    createdAt: now,
    updatedAt: now,
  };

  admins.push(newAdmin);
  await saveAdmins(admins);

  res.status(201).json({ admin: sanitizeAdmin(newAdmin) });
});

router.put("/:id", async (req, res) => {
  const parse = adminUpdateSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid admin data.", issues: parse.error.issues });
  }

  const admins = await getAdmins();
  const index = admins.findIndex((admin) => admin.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Admin not found." });
  }

  if (parse.data.email) {
    const exists = admins.some(
      (admin) => admin.email.toLowerCase() === parse.data.email!.toLowerCase() && admin.id !== req.params.id,
    );
    if (exists) {
      return res.status(409).json({ message: "Email already in use." });
    }
  }

  const target = admins[index];
  const nextRole = parse.data.role ?? target.role;

  if (target.role === "owner" && nextRole !== "owner") {
    const remainingOwners = admins.filter((admin) => admin.role === "owner" && admin.id !== target.id);
    if (remainingOwners.length === 0) {
      return res
        .status(400)
        .json({ message: "The system must retain at least one owner-level administrator." });
    }
  }

  const updated = {
    ...target,
    ...("email" in parse.data ? { email: parse.data.email?.toLowerCase() } : {}),
    ...("name" in parse.data ? { name: parse.data.name } : {}),
    ...("role" in parse.data ? { role: parse.data.role } : {}),
    updatedAt: new Date().toISOString(),
    ...(parse.data.password ? { passwordHash: await hashPassword(parse.data.password) } : {}),
  };

  admins[index] = updated;
  await saveAdmins(admins);

  res.json({ admin: sanitizeAdmin(updated) });
});

router.delete("/:id", async (req: AuthenticatedRequest, res) => {
  const admins = await getAdmins();
  const index = admins.findIndex((admin) => admin.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Admin not found." });
  }

  const admin = admins[index];

  if (admin.role === "owner") {
    const remainingOwners = admins.filter((item) => item.role === "owner" && item.id !== admin.id);
    if (remainingOwners.length === 0) {
      return res
        .status(400)
        .json({ message: "Cannot remove the final owner. Promote another admin to owner first." });
    }
  }

  admins.splice(index, 1);
  await saveAdmins(admins);

  res.json({ admin: sanitizeAdmin(admin) });
});

export default router;

