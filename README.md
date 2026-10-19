# Brain The Next Devs — Think Beyond. Build the Future.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-black?logo=express)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Connected-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

A modern, software engineering and IT solutions company web platform for **Brain The Next Devs**. Built with a dark futuristic visual language, 3D AI neural mesh illustration, full-stack Express API backend, Supabase cloud database integration, and an administrative control console.

---

## Key Features

- **Futuristic Dark Aesthetic**: Pure obsidian surface palette, luminous electric cyan highlights, circuit line backdrops, and high-resolution 3D digital human neural mesh illustration.
- **Top Navigation Bar**: Slim, translucent header with the Brain & Circuit wordmark, 8 core links (*Home, About, Services, Portfolio, Products, Pricing, Blog, Contact*), an electric blue *"Get a Quote"* primary action, and Admin Console link.
- **Dynamic Homepage Hero & Statistics Strip**: 2-column hero with verified value proposition, call-to-action buttons, and a 4-column metrics row (*Projects Completed, Happy Clients, Years of Experience, Technical Support*).
- **8 Core Services**: Interactive cards with dedicated iconography, technical checklists, and deep-dive modals (*Website Development, Software Development, Mobile Apps, E-commerce, AI Solutions, UI/UX Design, Database Architecture, Maintenance*).
- **Featured Projects & Live Demo Sandbox**: Filterable portfolio (*Websites, Applications, Software*) featuring an interactive in-browser simulation sandbox and technology breakdowns.
- **Proprietary Software Showcase**: Feature highlights and live demo booking requests for *Brain ERP, School Management System, Inventory Management System,* and *Hospital Management System*.
- **Executive & Core Team**: Dedicated profiles for Tahir Mangi (*CEO & Founder* with cyan border and glowing badge), Ayesha Khan (*Project Manager*), and Bilal Khan (*Lead Developer*).
- **Verified Booking & Inquiry System**: Form validation with client-side feedback and direct cloud persistence to Supabase and database store.
- **Admin Management Console**: Password-authenticated dashboard to view and manage client inquiries, demo requests, portfolio projects, team members, pricing packages, blogs, and database sync status.
- **Supabase Cloud Integration**: Integrated `@supabase/supabase-js` saving every appointment booking directly to your Supabase project with Row Level Security (RLS).

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion |
| **Backend** | Node.js, Express.js REST APIs |
| **Cloud Database** | Supabase PostgreSQL (`@supabase/supabase-js`), Mongoose / MongoDB Atlas support |
| **Local Fallback** | Persistent File-Backed JSON Store (`data/store.json`) |
| **Tooling & Build** | Vite 8, tsx, ESLint, GitHub Actions |

---

## Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or later, v20+ recommended)
- `npm` (v9 or later) or `pnpm` / `yarn`
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/brain-the-next-devs.git
cd brain-the-next-devs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Your `.env` includes preconfigured settings:

```env
PORT=3000

# Supabase Storage & Booking Appointment Database
SUPABASE_URL="https://huzrvybpywrzelmhlvlh.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_GKzkYbXl8wAcBnxYtCJDTA_iXmGUqNt"
SUPABASE_PROJECT_ID="huzrvybpywrzelmhlvlh"

# Admin Dashboard Credentials
ADMIN_EMAIL="admin@brainthenextdevs.com"
ADMIN_PASSWORD="admin123"
```

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your web browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## Supabase Database Setup

All appointment bookings, consultation requests, and product demo inquiries sync directly to your Supabase project.

To initialize or verify the table in your [Supabase SQL Editor](https://supabase.com/dashboard/project/huzrvybpywrzelmhlvlh/sql), run:

```sql
-- Create bookings and appointments table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT,
  project_details TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public booking submissions from the website
DROP POLICY IF EXISTS "Allow public booking submissions" ON public.bookings;
CREATE POLICY "Allow public booking submissions" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Allow reading bookings
DROP POLICY IF EXISTS "Allow read bookings" ON public.bookings;
CREATE POLICY "Allow read bookings" ON public.bookings
  FOR SELECT USING (true);
```

---

## Admin Dashboard

Access the administrative management console by clicking **Admin** in the top navigation bar or navigating to the bottom of the page.

* **Default Admin Email**: `admin@brainthenextdevs.com` (or `admin`)
* **Default Admin Password**: `admin123`
* Features:
  - Review all client booking appointments and inquiries (update status: *New, Contacted, In Progress, Closed*).
  - Add, edit, or delete portfolio projects.
  - Edit team profiles, services, and software product specs.
  - Monitor live Supabase connection status with 1-click test sync.

---

## How to Push to GitHub

Follow these steps to push this project to your GitHub account:

### Step 1: Create a New GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Enter repository name: `brain-the-next-devs` (or your preferred name).
3. Set visibility to **Public** or **Private**.
4. **Do not** check "Initialize with README" (since this repository already contains one).
5. Click **Create repository**.

### Step 2: Push Local Repository to GitHub
In your local project terminal, run:

```bash
# Initialize git if not already initialized
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Brain The Next Devs complete website and backend"

# Set default branch to main
git branch -M main

# Link to your new GitHub repository (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/brain-the-next-devs.git

# Push code to GitHub
git push -u origin main
```

---

## Deployment Options

### Option A: Render / Railway (Recommended Full-Stack)
Deploy both the Express backend and React frontend with persistent endpoints:
1. Connect your GitHub repository to [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Set **Build Command**: `npm install && npm run build`
3. Set **Start Command**: `npm start`
4. Add your environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`).

### Option B: Vercel
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Deploy!

### Option C: GitHub Pages (Frontend Hosting)
This repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy-pages.yml`):
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` branch to trigger automated deployment.

---

## License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
