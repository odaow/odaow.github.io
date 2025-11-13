import { Router } from "express";

import { getPages, savePages } from "../database.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { requireAuth } from "../middleware/authenticate.js";
import { generateId } from "../utils/id.js";
import { pageSchema, pageUpdateSchema, previewSchema } from "../utils/validation.js";

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const pages = await getPages();
  res.json({ pages });
});

router.get("/published", async (_req, res) => {
  const pages = await getPages();
  res.json({ pages: pages.filter((page) => page.status === "published") });
});

router.get("/slug/:slug", async (req: AuthenticatedRequest, res) => {
  const pages = await getPages();
  const slug = req.params.slug;
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    return res.status(404).json({ message: "Page not found." });
  }

  if (page.status !== "published" && !req.user) {
    return res.status(403).json({ message: "Access denied." });
  }

  return res.json({ page });
});

router.post("/", requireAuth, async (req, res) => {
  const parse = pageSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid page data.", issues: parse.error.issues });
  }

  const pages = await getPages();
  const duplicateSlug = pages.some((page) => page.slug === parse.data.slug);
  if (duplicateSlug) {
    return res.status(409).json({ message: "Slug already exists. Choose a different slug." });
  }

  const now = new Date().toISOString();
  const newPage = {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    publishedAt: parse.data.status === "published" ? now : undefined,
    ...parse.data,
  };
  pages.push(newPage);
  await savePages(pages);
  return res.status(201).json({ page: newPage });
});

router.put("/:id", requireAuth, async (req, res) => {
  const parse = pageUpdateSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid page data.", issues: parse.error.issues });
  }

  const pages = await getPages();
  const pageIndex = pages.findIndex((item) => item.id === req.params.id);
  if (pageIndex === -1) {
    return res.status(404).json({ message: "Page not found." });
  }

  if (parse.data.slug) {
    const duplicateSlug = pages.some(
      (page) => page.slug === parse.data.slug && page.id !== req.params.id,
    );
    if (duplicateSlug) {
      return res.status(409).json({ message: "Slug already exists. Choose a different slug." });
    }
  }

  const existing = pages[pageIndex];
  const updated = {
    ...existing,
    ...parse.data,
    updatedAt: new Date().toISOString(),
    publishedAt:
      parse.data.status === "published"
        ? existing.publishedAt ?? new Date().toISOString()
        : existing.publishedAt,
  };
  pages[pageIndex] = updated;
  await savePages(pages);
  return res.json({ page: updated });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const pages = await getPages();
  const pageIndex = pages.findIndex((item) => item.id === req.params.id);
  if (pageIndex === -1) {
    return res.status(404).json({ message: "Page not found." });
  }
  const removed = pages.splice(pageIndex, 1);
  await savePages(pages);
  return res.json({ page: removed[0] });
});

router.post("/:id/publish", requireAuth, async (req, res) => {
  const pages = await getPages();
  const pageIndex = pages.findIndex((item) => item.id === req.params.id);
  if (pageIndex === -1) {
    return res.status(404).json({ message: "Page not found." });
  }

  const now = new Date().toISOString();
  pages[pageIndex] = {
    ...pages[pageIndex],
    status: "published",
    publishedAt: now,
    updatedAt: now,
  };

  await savePages(pages);
  return res.json({ page: pages[pageIndex] });
});

router.post("/preview", requireAuth, (req, res) => {
  const parse = previewSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid preview data.", issues: parse.error.issues });
  }
  return res.json({ preview: parse.data });
});

export default router;

