import { Router } from "express";
import multer from "multer";
import { extname, resolve } from "node:path";
import { unlink } from "node:fs/promises";

import { UPLOADS_DIR } from "../config.js";
import { getMedia, saveMedia } from "../database.js";
import { requireAuth } from "../middleware/authenticate.js";
import { ensureDirectory } from "../utils/fileStorage.js";
import { generateId } from "../utils/id.js";

const router = Router();

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    await ensureDirectory(UPLOADS_DIR);
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = generateId();
    cb(null, `${unique}${extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }
    cb(null, true);
  },
});

router.get("/", requireAuth, async (_req, res) => {
  const media = await getMedia();
  res.json({ media });
});

router.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const media = await getMedia();
  const mediaItem = {
    id: generateId(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`,
    uploadedAt: new Date().toISOString(),
  };

  media.push(mediaItem);
  await saveMedia(media);
  res.status(201).json({ media: mediaItem });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const media = await getMedia();
  const index = media.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Media item not found." });
  }

  const [item] = media.splice(index, 1);
  await saveMedia(media);

  try {
    await unlink(resolve(UPLOADS_DIR, item.filename));
  } catch {
    // Ignore file removal errors
  }

  res.json({ media: item });
});

export default router;

