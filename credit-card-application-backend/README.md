# Credit Card Application – Backend

Node.js + Express + MongoDB API for the Credit Card Application.

## Quick Start

```bash
npm install
```

Create `.env` (optional):

```env
MONGO_URI=mongodb://localhost:27017/creditcard
PORT=5000
```

```bash
npm run dev
```

Server runs on `http://localhost:5000`. MongoDB database `creditcard` and collection `Applicant` are created automatically on first use.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/debug` | DB connection + sample data |
| POST | `/api/applicant` | Submit application |
| GET | `/api/applicant/:id` | Get application by ID |
| GET | `/api/approver` | List all applications |
| PUT | `/api/approver/:id` | Update status/score |

See the [root README](../README.md) for full API reference and request/response details.
