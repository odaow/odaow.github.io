import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname } from "node:path";

export const ensureDirectory = async (dirPath: string) => {
  await mkdir(dirPath, { recursive: true });
};

export const ensureFile = async <T>(filePath: string, defaultValue: T) => {
  try {
    await access(filePath, constants.F_OK);
  } catch {
    await ensureDirectory(dirname(filePath));
    await writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
  }
};

export const readJsonFile = async <T>(filePath: string, defaultValue: T): Promise<T> => {
  await ensureFile(filePath, defaultValue);
  const content = await readFile(filePath, "utf8");
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Failed to parse JSON file at ${filePath}. Restoring default.`, error);
    await writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
    return structuredClone(defaultValue);
  }
};

export const writeJsonFile = async <T>(filePath: string, data: T) => {
  await ensureDirectory(dirname(filePath));
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};

