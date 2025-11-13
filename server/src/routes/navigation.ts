import { Router } from "express";

import { getNavigation, saveNavigation } from "../database.js";
import { requireAuth } from "../middleware/authenticate.js";
import { generateId } from "../utils/id.js";
import { navigationSchema } from "../utils/validation.js";

const router = Router();

router.get("/", async (_req, res) => {
  const navigation = await getNavigation();
  res.json({ navigation });
});

router.put("/", requireAuth, async (req, res) => {
  const parse = navigationSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid navigation data.", issues: parse.error.issues });
  }

  const withIds = parse.data.map((item) => ({
    ...item,
    id: item.id ?? generateId(),
  }));

  await saveNavigation(withIds);
  res.json({ navigation: withIds });
});

export default router;

