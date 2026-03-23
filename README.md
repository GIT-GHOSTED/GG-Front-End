# 📋 Git-Ghosted

A full stack web application that helps job seekers organize and manage their job search. Track applications, monitor statuses, log interviews, and visualize your progress — all in one place.

---

## 🗂️ Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Frontend Pages & Components](#frontend-pages--components)
- [Getting Started](#getting-started)
- [Project Roadmap](#project-roadmap)
- [Stretch Goals](#stretch-goals)

---

## Project Overview

The Job Application Tracker is a personal CRM (Customer Relationship Management) tool designed specifically for job seekers. Users can create an account, log job applications, track their status through the hiring pipeline, and gain insight into their job search through a visual dashboard.

**Target User:** Anyone actively job hunting who wants a better system than spreadsheets or sticky notes.

---

## Features

- **User Authentication** — Secure sign-up, login, and logout with hashed passwords and JWT sessions
- **Application Management** — Create, view, edit, and delete job applications
- **Status Tracking** — Track each application through stages: `Saved → Applied → Phone Screen → Interview → Offer → Rejected`
- **Notes & Contacts** — Add notes and recruiter/contact info to each application
- **Dashboard** — Visual summary of application statuses and activity over time
- **Search & Filter** — Filter applications by status, company, or date applied

---

## Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | React (with React Router, Axios) |
| Backend   | Node.js, Express.js              |
| Database  | PostgreSQL                       |
| Auth      | JSON Web Tokens (JWT), bcrypt    |
| Styling   | CSS Modules or Tailwind CSS      |
| Dev Tools | Nodemon, dotenv, pgAdmin         |

---

```sql
-- Users table
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
  company       VARCHAR(255) NOT NULL,
  role          VARCHAR(255) NOT NULL,
  status        VARCHAR(50) DEFAULT 'Saved',
  job_url       TEXT,
  date_applied  DATE,
  notes         TEXT,
  contact_name  VARCHAR(100),
  contact_email VARCHAR(255),
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);
```

**Status values (enforced in application logic):**
`Saved`, `Applied`, `Phone Screen`, `Interview`, `Offer`, `Rejected`

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint             | Description                | Auth Required |
| ------ | -------------------- | -------------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user        | No            |
| POST   | `/api/auth/login`    | Login and receive JWT      | No            |
| GET    | `/api/auth/me`       | Get current logged-in user | Yes           |

### Application Routes — `/api/applications`

| Method | Endpoint                | Description                                 | Auth Required |
| ------ | ----------------------- | ------------------------------------------- | ------------- |
| GET    | `/api/applications`     | Get all applications for the logged-in user | Yes           |
| GET    | `/api/applications/:id` | Get a single application by ID              | Yes           |
| POST   | `/api/applications`     | Create a new application                    | Yes           |
| PUT    | `/api/applications/:id` | Update an existing application              | Yes           |
| DELETE | `/api/applications/:id` | Delete an application                       | Yes           |

---

## Frontend Pages & Components

### Pages

- **`/`** — Landing / marketing page with login and signup links
- **`/register`** — Sign-up form
- **`/login`** — Login form
- **`/dashboard`** — Overview stats and recent applications
- **`/applications`** — Full list of applications with filters
- **`/applications/new`** — Form to add a new application
- **`/applications/:id`** — Detail view for a single application
- **`/applications/:id/edit`** — Edit form for an application

### Key Components

- `Navbar` — Navigation bar with logout button
- `ApplicationCard` — Summary card used in the list view
- `ApplicationForm` — Shared form for create and edit
- `StatusBadge` — Color-coded badge showing current status
- `StatusPipeline` — Visual pipeline showing progress through hiring stages
- `DashboardChart` — Bar or pie chart showing application breakdown by status
- `PrivateRoute` — Wrapper component that redirects unauthenticated users

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/michaelflorentino4444/Git-Ghosted.git
cd Git-Ghosted
```

### 2. Install All Dependencies

### 3. Set Up the Database

```bash
psql -U postgres
CREATE DATABASE git_ghosted;
\c git_ghosted
\i server/db/schema.sql
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/git_ghosted
JWT_SECRET=your_jwt_secret_here
```

The app will be available at `http://localhost:3000`, with the API running on `http://localhost:5432`.

---

## Project Roadmap

### Phase 1 — Foundation

- [ ] Set up project structure and repositories
- [ ] Initialize Express server with PostgreSQL connection
- [ ] Create database schema and run migrations
- [ ] Implement user registration and login (JWT auth)
- [ ] Build auth-protected API routes for applications (full CRUD)

### Phase 2 — Frontend Core

- [ ] Set up React app with React Router
- [ ] Build Login and Register pages
- [ ] Implement auth context for global user state
- [ ] Build Applications list page with cards
- [ ] Build Application create/edit form
- [ ] Build Application detail page

### Phase 3 — Polish & Dashboard

- [ ] Build Dashboard page with status summary counts
- [ ] Add status pipeline / progress visualization
- [ ] Add search and filter functionality
- [ ] Add form validation and user-friendly error messages
- [ ] Responsive design / mobile-friendly layout

### Phase 4 — Testing & Deployment

- [ ] Manual end-to-end testing of all features
- [ ] Deploy backend to Render or Railway
- [ ] Deploy frontend to Netlify or Vercel
- [ ] Connect production frontend to production API
- [ ] Write final README with live demo link

---

## Stretch Goals

These are features to add if time permits:

- **Follow-up Reminders** — Set a reminder date per application and show overdue items
- **Timeline / Activity Log** — Log every status change with a timestamp
- **Export to CSV** — Download your applications as a spreadsheet
- **Dark Mode** — Theme toggle for the UI
