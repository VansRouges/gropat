# GROPATShift — Shift Booking Widget

A simple guest shift booking widget with localization (EN/DE) and a minimal backend.

## Structure
- `frontend/` — static site (HTML/CSS/JS)
- `backend/` — Node/Express API with SQLite (better-sqlite3)

## Run locally
- Backend
  1. Open a terminal in `backend/`
  2. Install deps and start

     ```powershell
     npm install
     npm start
     ```

  3. API runs at http://localhost:3001

- Frontend
  - Open `frontend/index.html` in your browser, or serve statically and proxy `/api` to the backend.

## API
- `POST /api/bookings` — create booking `{ name, email, date, time, location }`
- `GET /api/bookings` — list bookings (optional `?date=YYYY-MM-DD&location=Berlin`)

## Database choice
- Default: SQLite (file `gropat.db`) for simplicity.
- For production scale or multi-instance: Postgres is recommended.

## Deployment
- Frontend-only hosting: Netlify, Vercel (static), GitHub Pages.
- Backend-only hosting: Render, Railway, Fly.io, Azure App Service, or a serverless function (Vercel/Netlify Functions) with a managed DB.
- Unified hosting: Vercel (Next.js full-stack), Render monorepo, or Azure Web App + Static Web Apps.

## Security & quality
- Helmet, CORS, rate limit, input validation, basic overlap checks.
- Add auth for admin routes, logs/monitoring as needed.

## Notes
- Time ranges use en dash “–”. Keep this consistent between frontend and backend.