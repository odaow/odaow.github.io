import { Router } from "express";
import multer from "multer";
import { extname, resolve } from "node:path";
import { unlink } from "node:fs/promises";

import { UPLOADS_DIR } from "../config.js";
import { getProjects, saveProjects } from "../database.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { requireAuth } from "../middleware/authenticate.js";
import { ensureDirectory } from "../utils/fileStorage.js";
import { generateId } from "../utils/id.js";
import {
  projectImageUpdateSchema,
  projectSchema,
  projectUpdateSchema,
} from "../utils/validation.js";

const router = Router();

const PROJECT_UPLOAD_DIR = resolve(UPLOADS_DIR, "projects");

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    await ensureDirectory(PROJECT_UPLOAD_DIR);
    cb(null, PROJECT_UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = generateId();
    cb(null, `${unique}${extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }
    cb(null, true);
  },
});

const findProjectIndex = (projects: Awaited<ReturnType<typeof getProjects>>, id: string) =>
  projects.findIndex((project) => project.id === id);

router.get("/", requireAuth, async (_req, res) => {
  const projects = await getProjects();
  res.json({ projects });
});

router.get("/published", async (_req, res) => {
  const projects = await getProjects();
  res.json({ projects: projects.filter((project) => project.status === "published") });
});

router.get("/slug/:slug", async (req: AuthenticatedRequest, res) => {
  const projects = await getProjects();
  const slug = req.params.slug;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  if (project.status !== "published" && !req.user) {
    return res.status(403).json({ message: "Access denied." });
  }

  return res.json({ project });
});

router.post("/", requireAuth, async (req, res) => {
  const parse = projectSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid project data.", issues: parse.error.issues });
  }

  const projects = await getProjects();
  const duplicateSlug = projects.some((project) => project.slug === parse.data.slug);
  if (duplicateSlug) {
    return res.status(409).json({ message: "Slug already exists. Choose a different slug." });
  }

  const now = new Date().toISOString();
  const project = {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    publishedAt: parse.data.status === "published" ? now : undefined,
    ...parse.data,
  };

  projects.push(project);
  await saveProjects(projects);

  res.status(201).json({ project });
});

router.put("/:id", requireAuth, async (req, res) => {
  const parse = projectUpdateSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid project data.", issues: parse.error.issues });
  }

  const projects = await getProjects();
  const projectIndex = findProjectIndex(projects, req.params.id);
  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  if (parse.data.slug) {
    const duplicateSlug = projects.some(
      (project) => project.slug === parse.data.slug && project.id !== req.params.id,
    );
    if (duplicateSlug) {
      return res.status(409).json({ message: "Slug already exists. Choose a different slug." });
    }
  }

  const existing = projects[projectIndex];
  const updated = {
    ...existing,
    ...parse.data,
    tags: parse.data.tags ?? existing.tags,
    gallery: parse.data.gallery ?? existing.gallery,
    updatedAt: new Date().toISOString(),
    publishedAt:
      parse.data.status === "published"
        ? existing.publishedAt ?? new Date().toISOString()
        : parse.data.status === "draft"
          ? existing.publishedAt
          : existing.publishedAt,
  };

  projects[projectIndex] = updated;
  await saveProjects(projects);

  res.json({ project: updated });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const projects = await getProjects();
  const projectIndex = findProjectIndex(projects, req.params.id);
  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  const [removed] = projects.splice(projectIndex, 1);
  await saveProjects(projects);

  await Promise.all(
    removed.gallery.map(async (image) => {
      try {
        await unlink(resolve(PROJECT_UPLOAD_DIR, image.filename));
      } catch {
        // ignore fs errors
      }
    }),
  );

  res.json({ project: removed });
});

router.post("/:id/publish", requireAuth, async (req, res) => {
  const projects = await getProjects();
  const index = findProjectIndex(projects, req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  const now = new Date().toISOString();
  projects[index] = {
    ...projects[index],
    status: "published",
    publishedAt: now,
    updatedAt: now,
  };

  await saveProjects(projects);
  res.json({ project: projects[index] });
});

router.post("/:id/images", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const projects = await getProjects();
  const index = findProjectIndex(projects, req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  const imageId = generateId();
  const image = {
    id: imageId,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/projects/${req.file.filename}`,
    uploadedAt: new Date().toISOString(),
    altText: typeof req.body.altText === "string" ? req.body.altText : undefined,
  };

  const featured =
    typeof req.body.featured === "string"
      ? req.body.featured === "true" || req.body.featured === "1"
      : false;

  if (featured) {
    projects[index].featuredImageId = imageId;
  }

  projects[index].gallery = [...projects[index].gallery, image];
  await saveProjects(projects);

  res.status(201).json({ image, project: projects[index] });
});

router.put(
  "/:id/images/:imageId",
  requireAuth,
  upload.single("file"),
  async (req: AuthenticatedRequest, res) => {
    const parse = projectImageUpdateSchema.safeParse({
      altText: req.body?.altText,
      featured: req.body?.featured,
    });
    if (!parse.success) {
      return res
        .status(400)
        .json({ message: "Invalid image data.", issues: parse.error.issues });
    }

    const projects = await getProjects();
    const projectIndex = findProjectIndex(projects, req.params.id);
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found." });
    }

    const imageIndex = projects[projectIndex].gallery.findIndex(
      (image) => image.id === req.params.imageId,
    );
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found." });
    }

    const existingImage = projects[projectIndex].gallery[imageIndex];
    let filename = existingImage.filename;
    let originalName = existingImage.originalName;
    let mimeType = existingImage.mimeType;
    let size = existingImage.size;
    let url = existingImage.url;

    if (req.file) {
      const oldPath = resolve(PROJECT_UPLOAD_DIR, existingImage.filename);
      filename = req.file.filename;
      originalName = req.file.originalname;
      mimeType = req.file.mimetype;
      size = req.file.size;
      url = `/uploads/projects/${req.file.filename}`;

      try {
        await unlink(oldPath);
      } catch {
        // ignore fs errors
      }
    }

    const updatedImage = {
      ...existingImage,
      filename,
      originalName,
      mimeType,
      size,
      url,
      altText: parse.data.altText ?? existingImage.altText,
      uploadedAt: req.file ? new Date().toISOString() : existingImage.uploadedAt,
    };

    projects[projectIndex].gallery[imageIndex] = updatedImage;

    if (parse.data.featured !== undefined) {
      projects[projectIndex].featuredImageId = parse.data.featured
        ? updatedImage.id
        : projects[projectIndex].featuredImageId === updatedImage.id
          ? undefined
          : projects[projectIndex].featuredImageId;
    }

    await saveProjects(projects);

    res.json({ image: updatedImage, project: projects[projectIndex] });
  },
);

router.delete("/:id/images/:imageId", requireAuth, async (req, res) => {
  const projects = await getProjects();
  const projectIndex = findProjectIndex(projects, req.params.id);
  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  const imageIndex = projects[projectIndex].gallery.findIndex(
    (image) => image.id === req.params.imageId,
  );
  if (imageIndex === -1) {
    return res.status(404).json({ message: "Image not found." });
  }

  const [image] = projects[projectIndex].gallery.splice(imageIndex, 1);
  if (projects[projectIndex].featuredImageId === image.id) {
    projects[projectIndex].featuredImageId = undefined;
  }

  await saveProjects(projects);

  try {
    await unlink(resolve(PROJECT_UPLOAD_DIR, image.filename));
  } catch {
    // ignore fs errors
  }

  res.json({ image, project: projects[projectIndex] });
});

router.post("/:id/unpublish", requireAuth, async (req, res) => {
  const projects = await getProjects();
  const index = findProjectIndex(projects, req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found." });
  }

  projects[index] = {
    ...projects[index],
    status: "draft",
    updatedAt: new Date().toISOString(),
  };

  await saveProjects(projects);
  res.json({ project: projects[index] });
});

router.post("/preview", requireAuth, (req, res) => {
  const parse = projectSchema.pick({
    title: true,
    summary: true,
    description: true,
    tags: true,
  }).safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid preview data.", issues: parse.error.issues });
  }

  return res.json({ preview: parse.data });
});

export default router;


