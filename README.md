# Nebras Office Admin Dashboard

A secure content management dashboard for the Nebras Office website. The system combines a Vite + React front-end with an Express/TypeScript backend that persists site data in JSON files. Admins can manage pages, navigation, site settings, media assets, and user accounts without touching the codebase.

## Features

- 🔐 **Authentication** – JWT stored in HTTP-only cookies with login/logout flows and `/api/auth/me` session checks.
- 📄 **Pages** – Create, edit, publish, delete, and preview HTML content before publishing.
- 🏗️ **Projects** – Manage portfolio projects with tags, image galleries, and publish/unpublish workflows.
- ⚙️ **Site Settings** – Update title, footer text, contact information, and social links.
- 🧭 **Navigation** – Manage menu labels, URLs, orders, and external links.
- 🖼️ **Media Library** – Upload images (stored on disk) and copy direct URLs for use in content.
- 👥 **Admin Management** – Owner-level users can add/edit/remove admins and reset passwords.
- 🚀 **One-click Publishing** – Owner can commit content/media changes, push to Git, and trigger GitHub Pages deploy from the dashboard.
- 🌐 **Dynamic Front-end** – Public navigation, footer, and dynamic pages (`/pages/:slug`) are sourced from the backend APIs.

## Project Structure

```
nebras-office/
├── server/             # Express + TypeScript backend
│   ├── data/           # JSON persistence (pages, settings, navigation, media, admins)
│   ├── uploads/        # Uploaded media files (gitignored)
│   ├── scripts/        # Utility scripts (e.g. seed admin)
│   └── src/            # API routes, middleware, utils
├── src/                # React front-end (Vite)
│   ├── components/     # Shared UI + admin modules
│   ├── context/        # Auth + site settings providers
│   ├── lib/            # API client helpers
│   ├── pages/          # Public + admin views
│   └── types/          # Shared TypeScript models
└── package.json
```

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10

## Environment Variables

Create a `.env` file (copy `server/env.example`) and adjust as needed:

```
PORT=4000
JWT_SECRET=replace-with-secure-secret
CORS_ORIGIN=http://localhost:5173
AUTH_COOKIE_NAME=neb_admin_token
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=ChangeMe123!
DEFAULT_ADMIN_NAME=Site Owner
PUBLISH_GIT_REMOTE=origin
PUBLISH_GIT_BRANCH=main
PUBLISH_GIT_ADD_PATHS=server/data,server/uploads
PUBLISH_COMMIT_MESSAGE=chore: publish site content
PUBLISH_DEPLOY_SCRIPT=npm run deploy
```

> **Security note:** change `JWT_SECRET` and the default admin credentials before deploying.

## Installation

```bash
npm install
```

This single workspace installs both front-end and backend dependencies.

## Running Locally

Open two terminals:

```bash
# Terminal 1 – start the API (auto reload)
npm run server:dev

# Terminal 2 – start the Vite dev server
npm run dev
```

The front-end runs on `http://localhost:5173` and the API on `http://localhost:4000`.

### All-in-one Dev Session

```bash
npm run dev:full
```

## Seeding the Default Admin

```bash
npm run seed:admin
```

Creates (or verifies) an owner-level admin using the credentials in your `.env`.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run the React front-end (Vite) |
| `npm run server:dev` | Run the Express API with hot reload |
| `npm run server` | Start the API in production mode |
| `npm run dev:full` | Launch API and front-end concurrently |
| `npm run seed:admin` | Seed the default admin account |
| `npm run deploy` | Build the front-end and publish to GitHub Pages |
| `npm run build` | Type-check and build the front-end |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API Overview

Authenticated routes are exposed under `/api`:

- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET/POST/PUT/DELETE /pages`, `POST /pages/:id/publish`, `POST /pages/preview`
- `GET/POST/PUT/DELETE /projects`, `POST /projects/:id/publish`, `POST /projects/:id/unpublish`, image upload/update/delete endpoints
- `GET/PUT /settings`
- `GET/PUT /navigation`
- `GET/POST/DELETE /media`
- `GET/POST/PUT/DELETE /admins` *(owner only)*
- `POST /publish` *(owner only — commit, push, deploy pipeline)*

Uploads are served from `/uploads/<filename>`.

## Deployment Notes

1. **Secure environment** – Provide production-grade `JWT_SECRET`, configure `CORS_ORIGIN`, and serve over HTTPS so cookies remain secure.
2. **Persistent storage** – Ensure `server/data` and `server/uploads` live on durable storage with backups.
3. **GitHub access** – Configure repository credentials (SSH key or PAT) so the `/api/publish` endpoint can push commits.
4. **Reverse proxy** – Proxy `/api` and `/uploads` to the Node process and serve the Vite build separately.
5. **Rotate credentials** – Run `npm run seed:admin` with new credentials or create admins from the dashboard before going live.

## Admin Workflow

1. Open `/admin/login` and authenticate.
2. Create or edit pages, then preview before publishing to `/pages/:slug`.
3. Update global settings, contact info, and social links.
4. Upload media assets and copy their URLs for use in content.
5. Reorder navigation links so they appear correctly in the public site.
6. (Owner only) manage additional admin accounts.
7. (Owner only) اضغط زر "نشر إلى GitHub Pages" من رأس لوحة التحكم لعمل commit، push، وتشغيل سكربت النشر.

All changes are stored server-side and reflected on the site instantly—no code changes required.

