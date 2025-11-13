import { APP_PORT } from "./config.js";
import app from "./app.js";
import { initDatabase, getAdmins } from "./database.js";

const start = async () => {
  await initDatabase();

  const admins = await getAdmins();
  if (admins.length === 0) {
    console.warn(
      "No admin accounts found. Run `npm run seed:admin` to create the default administrator.",
    );
  }

  app.listen(APP_PORT, () => {
    console.log(`Admin API listening on http://localhost:${APP_PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

