import { Router } from "express";

import { getSettings, saveSettings } from "../database.js";
import { requireAuth } from "../middleware/authenticate.js";
import { siteSettingsSchema } from "../utils/validation.js";

const router = Router();

router.get("/", async (_req, res) => {
  const settings = await getSettings();
  res.json({ settings });
});

router.put("/", requireAuth, async (req, res) => {
  const parse = siteSettingsSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid settings data.", issues: parse.error.issues });
  }

  await saveSettings(parse.data);
  return res.json({ settings: parse.data });
});

export default router;

