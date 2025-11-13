import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Fix for ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const ADMIN_DATA_PATH = path.join(__dirname, '../data/admins.json');

// Hardcoded values
const email = 'odai@nebras-bim.com';
const password = 'Nebras2025!';
const name = 'Odai Salahat';

async function run() {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(ADMIN_DATA_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing admins
    let admins: any[] = [];
    if (fs.existsSync(ADMIN_DATA_PATH)) {
      const raw = fs.readFileSync(ADMIN_DATA_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      admins = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.admins) ? parsed.admins : [];
    }

    // Check if admin already exists
    const existing = admins.find((a: any) => a.email === email);
    if (existing) {
      console.log(`Admin ${email} already exists. Skipping.`);
      return;
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 12);

    // Create admin
    const admin = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'owner',
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save
    admins.push(admin);
    fs.writeFileSync(ADMIN_DATA_PATH, JSON.stringify(admins, null, 2));
    
    console.log(`✅ Seeded admin account (${email}) successfully!`);
    console.log(`Password: ${password}`);
    
  } catch (error) {
    console.error('Failed to seed admin user', error);
    process.exit(1);
  }
}

run();