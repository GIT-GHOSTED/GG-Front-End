# GG-Front-End

A modern React-based frontend application for tracking job applications. Built with Vite, this app provides an intuitive interface for job seekers to manage their application process, visualize progress, and stay organized.

## Features

- **User Authentication**: Login and registration forms for secure access
- **Application Management**: Create, view, edit, and track job applications
- **Dashboard**: Visual charts and summaries of application statuses and progress
- **Follow-ups**: Track and manage follow-up actions on applications
- **Responsive Design**: Built with Ant Design for a clean, mobile-friendly UI

## Tech Stack

- **React**: Frontend framework
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Ant Design**: UI component library
- **Recharts**: Data visualization library
- **Axios**: HTTP client for API calls (assumed in services/api.js)

## Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GIT-GHOSTED/GG-Front-End.git
   cd GG-Front-End
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ApplicationDetail/
│   ├── Applications/
│   ├── Dashboard/
│   ├── EditApplication/
│   ├── FollowUps/
│   ├── Homepage/
│   ├── Layout/
│   ├── Login/
│   ├── NewApplicationForm/
│   └── Register/
├── context/
│   └── applicationsContext.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

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

- `Sidebar` — Navigation bar with logout button
- `ApplicationCard` — Summary card used in the list view
- `ApplicationForm` — Shared form for create and edit
- `StatusBadge` — Color-coded badge showing current status
- `StatusPipeline` — Visual pipeline showing progress through hiring stages
- `DashboardChart` — Bar or pie chart showing application breakdown by status
- `PrivateRoute` — Wrapper component that redirects unauthenticated users

---

## Getting Started

### Prerequisites

- Node.js (v22+)
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

## Stretch Goals

These are features to add if time permits:

- **Search bar/ Filter**- Add a search bar to applications and filter the applications page
- **Timeline / Activity Log** — Log every status change with a timestamp
- **Dark Mode** — Theme toggle for the UI
