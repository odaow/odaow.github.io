import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_NAME,
  DEFAULT_ADMIN_PASSWORD,
} from "../src/config.js";
import { getAdmins, saveAdmins, initDatabase } from "../src/database.js";
import { generateId } from "../src/utils/id.js";
import { hashPassword } from "../src/utils/password.js";

const run = async () => {
  await initDatabase();

  const admins = await getAdmins();
  const existing = admins.find(
    (admin) => admin.email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase(),
  );

  if (existing) {
    console.log(`Admin ${DEFAULT_ADMIN_EMAIL} already exists. Skipping.`);
    return;
  }

  const now = new Date().toISOString();
  const admin = {
    id: generateId(),
    email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
    name: DEFAULT_ADMIN_NAME,
    role: "owner" as const,
    passwordHash: await hashPassword(DEFAULT_ADMIN_PASSWORD),
    createdAt: now,
    updatedAt: now,
  };

  admins.push(admin);
  await saveAdmins(admins);

  console.log(`Seeded admin account (${DEFAULT_ADMIN_EMAIL}) with default password.`);
};

run().catch((error) => {
  console.error("Failed to seed admin user", error);
  process.exit(1);
});

