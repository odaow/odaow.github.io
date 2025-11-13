import bcrypt from 'bcryptjs';
import fs from 'fs';

const password = 'Nebras2025!';
const hash = bcrypt.hashSync(password, 12);

const admin = {
  id: Math.random().toString(36).substr(2, 9),
  email: 'odai@nebras-bim.com',
  name: 'Odai Salahat',
  role: 'owner',
  passwordHash: hash,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// تأكد من مجلد exists
if (!fs.existsSync('server/data')) {
  fs.mkdirSync('server/data', { recursive: true });
}

// كتابة الملف
fs.writeFileSync('server/data/admins.json', JSON.stringify([admin], null, 2));

console.log('✅ Admin created!');
console.log('Email: odai@nebras-bim.com');
console.log('Password: Nebras2025!');