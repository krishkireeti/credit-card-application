# Credit Card Application – Frontend

React frontend for the Credit Card Application. Built with **React 19**, **Vite 7**, **React Router**, **Material-UI (MUI) 7**, and **Axios**.

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`). Ensure the [backend](https://github.com/your-repo/credit-card-application/tree/main/credit-card-application-backend) is running on `http://localhost:5000` (see root [README](../README.md) for backend setup).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Main Routes

- **/** – Home (Apply / Login)
- **/applicant** – Apply for credit card form
- **/approver** – Admin dashboard (list, score, approve/reject)
- **/status** – Check application status by ID
- **/login** – Login page

## API Base URL

The app uses `http://localhost:5000` by default (see `src/api/api.js`). Change `baseURL` there if your backend runs elsewhere.

## Full Documentation

See the [root README](../README.md) for full project structure, API reference, and setup for both frontend and backend.
