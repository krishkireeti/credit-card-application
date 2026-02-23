# Credit Card Application

A full-stack web application for submitting and managing credit card applications. Applicants can apply online, check application status by ID, and approvers can review, score, and approve or reject applications from an admin dashboard.

## Tech Stack

| Layer      | Technology                          |
| ---------- | ------------------------------------ |
| Frontend   | React 19, Vite 7, React Router, MUI (Material-UI) 7, Axios |
| Backend    | Node.js, Express 5, Mongoose 9       |
| Database   | MongoDB (local or Atlas)             |

## Project Structure

```
credit-card-application/
├── credit-card-application-frontend/   # React SPA
│   ├── src/
│   │   ├── api/           # Axios instance (baseURL)
│   │   ├── actions/       # Redux actions (optional)
│   │   ├── components/    # Home, Login, Navbar, Footer, Approver, Status
│   │   ├── pages/         # ApplyCard
│   │   ├── reducers/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── credit-card-application-backend/
│   ├── models/
│   │   └── Application.js # Mongoose schema (Applicant collection)
│   ├── server.js          # Express app + API + MongoDB connect
│   ├── .env               # MONGO_URI, PORT
│   └── package.json
└── README.md              # This file
```

## Features

- **Home** – Landing page with “Apply Credit Card” and “Login”.
- **Apply for card** (`/applicant`) – Form: Full Name, Age, Annual Income, PAN. Validation: age ≥ 18. Success/error modals.
- **Check status** (`/status`) – Enter application ID to see status (Pending / Approved / Rejected) and applicant name.
- **Admin dashboard** (`/approver`) – List all applications; assign credit score (“Check”); Approve or Reject. PAN shown masked (e.g. ****1234).
- **Backend** – REST API with validation, MongoDB persistence, health and debug endpoints.

## Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** running locally (e.g. `mongodb://localhost:27017`) or a MongoDB Atlas connection string

## Setup & Run

### 1. Backend

```bash
cd credit-card-application-backend
npm install
```

Create a `.env` file (or use defaults):

```env
# Optional; defaults below if not set
MONGO_URI=mongodb://localhost:27017/creditcard
PORT=5000
```

Start the server:

```bash
npm run dev
# or: node server.js
```

You should see: `Server running on port 5000`. The `creditcard` database and `Applicant` collection are created automatically when the first application is saved.

### 2. Frontend

```bash
cd credit-card-application-frontend
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). The app talks to the backend at `http://localhost:5000` by default (see `src/api/api.js`). For a different backend URL, change `baseURL` there or use an env variable.

### 3. Verify Backend

- Health: [http://localhost:5000/api/health](http://localhost:5000/api/health) → `{"status":"Server is running"}`
- Debug (DB + sample data): [http://localhost:5000/api/debug](http://localhost:5000/api/debug) → connection status, database name, document count, sample applications

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/debug` | MongoDB connection status + sample data |
| POST | `/api/applicant` | Submit application. Body: `{ fullName, age, income, pan }`. Age ≥ 18. Returns `{ success, message, id }`. |
| GET | `/api/applicant/:id` | Get one application by ID (for status check). Returns `{ fullName, status, creditScore, appliedAt }`. |
| GET | `/api/approver` | List all applications (newest first). |
| PUT | `/api/approver/:id` | Update application. Body: `{ status? }` and/or `{ score? }`. `status`: `Pending` \| `Approved` \| `Rejected`. |

## Data Model (Application)

Stored in MongoDB collection `Applicant`:

- `fullName` (string)
- `age` (number)
- `income` (number)
- `pan` (string)
- `creditScore` (number, optional)
- `status` (`Pending` \| `Approved` \| `Rejected`, default `Pending`)
- `appliedAt` (date, set on create)

## Routes (Frontend)

| Path | Page |
|------|------|
| `/` | Home (landing) |
| `/login` | Login |
| `/applicant` | Apply for credit card |
| `/approver` | Admin dashboard (list, score, approve/reject) |
| `/status` | Check application status by ID |

## License

ISC (see backend/frontend `package.json` as needed).
