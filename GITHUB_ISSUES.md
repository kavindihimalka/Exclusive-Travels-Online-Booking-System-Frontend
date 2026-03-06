# 🗺️ TourismTreasure — GitHub Issues & Project Board

> **Project**: TourismTreasure — A full-stack tourism booking platform  
> **Stack**: React + TypeScript + Vite + TailwindCSS (Frontend) | Node.js + Express + Firebase/Firestore (Backend)  
> **Repository**: TourismTreasure-main  
> **Academic Year**: 2025–2026

---

## 👥 Team Members & Roles

| Name | Student ID | Role | GitHub Assignee Tag |
|---|---|---|---|
| Kavindi Himalka | 2525845 | Start-up Manager | `@kavindi` |
| Dwayne Dehoedt | 2439455 | Project Manager | `@dwayne` |
| Lakdinu Dissanayake | 2433504 | Quality Manager | `@lakdinu` |
| Elisa Perera | 2525762 | Risk Manager | `@elisa` |
| Sachini Fernando | 2433375 | Scheduling Manager | `@sachini` |

---

## 🏷️ Label System (Create These in GitHub First)

### Priority Labels
| Label | Color | Description |
|---|---|---|
| `priority: critical` | `#B60205` | Must be done immediately — blocks everything |
| `priority: high` | `#E4430A` | Important, needs to be done this sprint |
| `priority: medium` | `#FBCA04` | Should be done soon, not blocking |
| `priority: low` | `#0E8A16` | Nice to have, do when time permits |

### Type Labels
| Label | Color | Description |
|---|---|---|
| `type: feature` | `#1D76DB` | New functionality being added |
| `type: bug` | `#D93F0B` | Something is broken or not working |
| `type: task` | `#6F42C1` | Dev/setup task, not a user-facing feature |
| `type: documentation` | `#0075CA` | Writing or updating docs |
| `type: enhancement` | `#A2EEEF` | Improvement to existing functionality |
| `type: testing` | `#E99695` | Writing or running tests |
| `type: security` | `#EE0701` | Security-related concerns |
| `type: design` | `#FEF2C0` | UI/UX design tasks |

### Status Labels
| Label | Color | Description |
|---|---|---|
| `status: todo` | `#EDEDED` | Not started yet |
| `status: in-progress` | `#0052CC` | Actively being worked on |
| `status: review` | `#5319E7` | Waiting for code review |
| `status: blocked` | `#B60205` | Blocked by another issue |
| `status: done` | `#0E8A16` | Completed and merged |

### Area Labels
| Label | Color | Description |
|---|---|---|
| `area: frontend` | `#C2E0FF` | Client-side / React code |
| `area: backend` | `#BFD4F2` | Server-side / Express API |
| `area: firebase` | `#F9D71C` | Firebase / Firestore related |
| `area: auth` | `#D4C5F9` | Authentication & session management |
| `area: admin` | `#F9C513` | Admin dashboard / panel |
| `area: booking` | `#13C9F9` | Booking system logic |
| `area: ui/ux` | `#FFC0CB` | UI styling, layout, and experience |
| `area: devops` | `#85C1E9` | CI/CD, deployment, environment config |

---

## 📋 Milestone Plan

| Milestone | Goal | Target Date |
|---|---|---|
| **M1 — Project Setup** | Repo, env, tooling ready | Week 1 |
| **M2 — Core Features** | Pages, routing, auth working | Week 2–3 |
| **M3 — Booking System** | Full booking flow complete | Week 4–5 |
| **M4 — Admin Panel** | Admin management working | Week 5–6 |
| **M5 — QA & Polish** | Bug fixes, testing, UI polish | Week 7 |
| **M6 — Final Deployment** | Live, documented, ready to submit | Week 8 |

---

---

# 🚀 PHASE 1 — PROJECT SETUP & INITIALIZATION

---

## Issue #001 — Initialize GitHub Repository & Branch Strategy

**Labels:** `type: task` `priority: critical` `area: devops` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 2 hours

### Description

Set up the GitHub repository with the correct structure, branch protection rules, and team access so the entire team can collaborate safely from day one.

### Acceptance Criteria
- [ ] Repository created under team organization or shared account
- [ ] `main` branch is protected (requires PR + 1 review before merge)
- [ ] `develop` branch created as the working integration branch
- [ ] All 5 team members added as collaborators with appropriate roles
- [ ] `.gitignore` configured correctly (covers `node_modules`, `.env`, `.env.local`, `dist/`)
- [ ] Branch naming convention documented (e.g. `feature/`, `fix/`, `chore/`)

### Branch Strategy
```
main          ← Production-ready code only (protected)
develop       ← Integration branch (all PRs merge here)
feature/*     ← One branch per feature (e.g. feature/booking-system)
fix/*         ← Bug fix branches (e.g. fix/login-redirect-bug)
chore/*       ← Setup / config / refactoring
```

### Notes
> Branch naming convention must be agreed by the whole team before any coding begins.

---

## Issue #002 — Set Up Project Folder Structure & README

**Labels:** `type: task` `priority: critical` `area: devops` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 3 hours

### Description

Establish the correct project folder layout, write the main `README.md`, and ensure any new developer can clone and run the project in under 10 minutes.

### Acceptance Criteria
- [ ] Project folder structure matches agreed layout (`/client`, `/backend`)
- [ ] `README.md` at root level includes:
  - Project description
  - Tech stack overview
  - Prerequisites (Node.js version, Firebase setup)
  - Local setup instructions (`npm install`, env config, `npm run dev`)
  - Team member listing
  - Contribution guide with PR process

### Folder Structure Reference
```
TourismTreasure/
├── backend/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env.local
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── firestore.rules
└── README.md
```

---

## Issue #003 — Configure Environment Variables & Secrets Management /DONE

**Labels:** `type: task` `priority: critical` `area: devops` `area: firebase` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 2 hours

### Description

Define and document all required environment variables for both frontend and backend. Ensure no secrets are ever committed to the repository.

### Acceptance Criteria
- [ ] `.env.example` files created in `/backend` and `/client`
- [ ] `.env.local` and `.env` are confirmed in `.gitignore`
- [ ] `serviceAccountKey.json` is confirmed in `.gitignore`
- [ ] All env variables listed and described in `README.md`
- [ ] Team has a secure way to share secrets (e.g. private group message, vault)

### Required Variables — Backend (`/backend/.env.local`)
```env
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secure_password>
FIREBASE_PROJECT_ID=<your_project_id>
```

### Required Variables — Frontend (`/client/.env.local`)
```env
VITE_FIREBASE_API_KEY=<key>
VITE_FIREBASE_AUTH_DOMAIN=<domain>
VITE_FIREBASE_PROJECT_ID=<project_id>
VITE_FIREBASE_STORAGE_BUCKET=<bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<id>
VITE_FIREBASE_APP_ID=<app_id>
VITE_API_BASE_URL=http://localhost:5000
```

---

## Issue #004 — Set Up Firebase Project & Firestore Database

**Labels:** `type: task` `priority: critical` `area: firebase` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 3 hours

### Description

Create the Firebase project, enable Firestore, configure authentication, and connect both frontend and backend to the correct Firebase environment.

### Acceptance Criteria
- [ ] Firebase project created in Firebase Console
- [ ] Firestore database created in **production mode**
- [ ] Firebase Authentication enabled (Email/Password at minimum)
- [ ] `firestore.rules` configured with basic security rules
- [ ] Frontend Firebase config set in `.env.local`
- [ ] Backend uses `serviceAccountKey.json` (Admin SDK)
- [ ] Connection test passes (`/api/ping` returns `{ backend: "connected" }`)

### Firestore Collections to Create
| Collection | Purpose |
|---|---|
| `users` | Registered user profiles |
| `bookings` | Tour/air ticket/car rental bookings |
| `destinations` | Sri Lanka tourism destinations |
| `packages` | Tour packages data |

---

## Issue #005 — Install & Configure Frontend Dependencies

**Labels:** `type: task` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 1 hour

### Description

Ensure all frontend dependencies are installed and the development server runs without errors. Verify TypeScript, Tailwind, and Vite are properly configured.

### Acceptance Criteria
- [ ] `npm install` completes without errors in `/client`
- [ ] `npm run dev` launches app on `http://localhost:5173`
- [ ] TypeScript compiles without errors (`tsc --noEmit`)
- [ ] TailwindCSS classes are applying correctly
- [ ] `vite.config.js` proxy to backend API is configured

---

## Issue #006 — Install & Configure Backend Dependencies

**Labels:** `type: task` `priority: high` `area: backend` `status: todo`  
**Milestone:** M1 — Project Setup  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 1 hour

### Description

Ensure the backend Express server installs correctly, loads environment variables, and the `/health` and `/api/ping` routes respond as expected.

### Acceptance Criteria
- [ ] `npm install` completes without errors in `/backend`
- [ ] `node server.js` starts without errors on port 5000
- [ ] `GET /health` returns `{ status: "OK" }`
- [ ] `GET /api/ping` returns `{ backend: "connected" }`
- [ ] Firebase Admin SDK connects successfully on startup

---

---

# 🎨 PHASE 2 — CORE FRONTEND FEATURES

---

## Issue #007 — Build Navigation Bar Component

**Labels:** `type: feature` `priority: high` `area: frontend` `area: ui/ux` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 4 hours

### Description

Build the main `Navbar` component with responsive design, active route highlighting, and mobile hamburger menu.

### Acceptance Criteria
- [ ] Logo displayed on the left
- [ ] Navigation links: Home, Destinations, Packages, Air Tickets, Car Rentals, About
- [ ] Active route is visually highlighted
- [ ] Responsive: collapses to hamburger menu on mobile (<768px)
- [ ] Hamburger opens/closes a full-screen or slide-in mobile menu
- [ ] "Login" / "Dashboard" button appears on the right based on auth state
- [ ] Smooth scroll-based shadow on Navbar when scrolling down

---

## Issue #008 — Build Hero Section & Home Page

**Labels:** `type: feature` `priority: high` `area: frontend` `area: ui/ux` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 5 hours

### Description

Create the `Hero` component featuring a full-screen banner with search functionality and call-to-action, followed by assembling the full `HomePage`.

### Acceptance Criteria
- [ ] Full-viewport hero section with a background image/gradient
- [ ] Headline, subheadline, and CTA button ("Explore Now" / "Book Now")
- [ ] Search bar with destination input + date picker
- [ ] Smooth entrance animation using `framer-motion`
- [ ] `HomePage.tsx` assembles: Hero → Services → Destinations → Packages → Testimonials → Footer
- [ ] Page is fully responsive

---

## Issue #009 — Build Destinations Page & Component/ DONE

**Labels:** `type: feature` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Sachini Fernando (Scheduling Manager)  
**Estimate:** 6 hours
S
### Description

Implement the Destinations page that showcases Sri Lanka's tourism spots with filter and sort capabilities.

### Acceptance Criteria
- [ ] Grid layout of destination cards (image, name, short description, rating)
- [ ] Filter by category (Beach, Cultural, Adventure, Wildlife)
- [ ] Search bar to filter by name
- [ ] Clicking a card opens a modal or navigates to a detail page
- [ ] Destinations data loaded from Firestore `destinations` collection
- [ ] Loading skeleton shown while data fetches
- [ ] Empty state shown if no results match filter

---

## Issue #010 — Build Tour Packages Page & Component

**Labels:** `type: feature` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Sachini Fernando (Scheduling Manager)  
**Estimate:** 6 hours

### Description

Display available tour packages with pricing, duration, highlights, and a "Book Now" action.

### Acceptance Criteria
- [ ] Package cards showing: image, title, duration, price, included highlights
- [ ] Filter by duration and price range
- [ ] "Book Now" button navigates to the Booking page with package pre-filled
- [ ] Data loaded from Firestore `packages` collection
- [ ] Loading and empty states handled

---

## Issue #011 — Build Air Tickets Page

**Labels:** `type: feature` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 8 hours

### Description

Build `AirTickets.tsx` — a search-and-display page for air travel options, including flight search form and results listing.

### Acceptance Criteria
- [ ] Flight search form: origin, destination, departure date, return date (optional), number of passengers
- [ ] Results list shows: airline logo, flight number, departure/arrival times, price, duration
- [ ] Filter results by price, airline, number of stops
- [ ] "Book" button navigates to booking flow with flight pre-selected
- [ ] Form validates all required fields before search
- [ ] Empty/no-results state displayed

---

## Issue #012 — Build Car Rentals Page

**Labels:** `type: feature` `priority: medium` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 6 hours

### Description

Implement `CarRentals.tsx` — a page where users can browse and book car rental options.

### Acceptance Criteria
- [ ] Search form: pickup location, pickup date, return date
- [ ] Car cards: image, make/model, seats, transmission, price per day
- [ ] Filter by car type (SUV, Sedan, Van, Economy)
- [ ] "Rent" button leads to booking flow with vehicle pre-filled
- [ ] Loading and empty states handled

---

## Issue #013 — Build Footer Component

**Labels:** `type: feature` `priority: medium` `area: frontend` `area: ui/ux` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Sachini Fernando (Scheduling Manager)  
**Estimate:** 2 hours

### Description

Create a comprehensive, professional footer with links, contact info, and social media.

### Acceptance Criteria
- [ ] 4-column layout: About, Quick Links, Services, Contact Info
- [ ] Social media icons (Facebook, Instagram, Twitter/X)
- [ ] Email / phone number listed
- [ ] Copyright notice with current year
- [ ] Fully responsive (stacks to single column on mobile)

---

## Issue #014 — Build About Us & Team Sections

**Labels:** `type: feature` `priority: medium` `area: frontend` `area: ui/ux` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 3 hours

### Description

Create the `AboutUs.tsx` and `Team.tsx` components to present the company story and the team behind TourismTreasure.

### Acceptance Criteria
- [ ] Company mission, vision, values section
- [ ] Team cards with photo, name, and role for all 5 members
- [ ] Statistics/highlights section (e.g. years of experience, happy customers)
- [ ] Smooth scroll-in animations

---

---

# 🔐 PHASE 3 — AUTHENTICATION

---

## Issue #015 — Implement User Login with Firebase Auth

**Labels:** `type: feature` `priority: critical` `area: auth` `area: firebase` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 5 hours

### Description

Implement email/password login flow using Firebase Authentication. Users should be able to log in and be redirected to the Dashboard.

### Acceptance Criteria
- [ ] `LoginPage.tsx` has a styled email + password form
- [ ] Form validates: required fields, valid email format, minimum 6-char password
- [ ] Calls Firebase `signInWithEmailAndPassword`
- [ ] On success: stores user in auth context, redirects to `/dashboard`
- [ ] On failure: displays a user-friendly error message (e.g. "Invalid email or password")
- [ ] "Forgot Password" link sends a reset email via Firebase
- [ ] Google Sign-In button (optional but preferred)

---

## Issue #016 — Implement User Registration

**Labels:** `type: feature` `priority: high` `area: auth` `area: firebase` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 4 hours

### Description

Allow new users to create an account, which also creates a user document in Firestore.

### Acceptance Criteria
- [ ] Registration form: name, email, password, confirm password
- [ ] Validates all fields + password match check
- [ ] Calls Firebase `createUserWithEmailAndPassword`
- [ ] On success: creates `users/{uid}` document in Firestore with `{ name, email, createdAt }`
- [ ] Redirects to `/dashboard` on success
- [ ] Clear error messages for: email already in use, weak password, etc.

---

## Issue #017 — Implement Auth Context & Protected Routes

**Labels:** `type: feature` `priority: critical` `area: auth` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 3 hours

### Description

Create a global Authentication Context so any component can check login state, and protect routes that require authentication.

### Acceptance Criteria
- [ ] `AuthContext.tsx` provides `{ user, loading, logout }` to all components
- [ ] `useAuth()` hook wraps the context for easy consumption
- [ ] `ProtectedRoute` component redirects unauthenticated users to `/login`
- [ ] `/dashboard` and `/booking` are protected routes
- [ ] `loading` state shows a spinner while Firebase resolves auth status

---

## Issue #018 — Implement Admin Authentication (Backend)

**Labels:** `type: feature` `priority: high` `area: auth` `area: backend` `area: admin` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 2 hours

### Description

The backend has a simple token-based admin login. Ensure it is secure, the token is stored correctly, and admin-only routes are protected.

### Acceptance Criteria
- [ ] `POST /api/admin/login` verifies username/password from `.env.local`
- [ ] Returns `{ token: "admin_authenticated" }` on success
- [ ] Token stored in `localStorage` or `sessionStorage` on the client
- [ ] Admin routes check for `Authorization: Bearer admin_authenticated` header
- [ ] Token is cleared on admin logout
- [ ] Admin credentials are never hardcoded — always from environment variables

> ⚠️ **Risk Note:** This is a simplified admin auth model for academic purposes. In production, replace with Firebase Custom Claims or a proper JWT system.

---

---

# 📦 PHASE 4 — BOOKING SYSTEM

---

## Issue #019 — Build Booking Form & Page

**Labels:** `type: feature` `priority: critical` `area: booking` `area: frontend` `status: todo`  
**Milestone:** M3 — Booking System  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 8 hours

### Description

Create the full booking form that handles tours, air tickets, and car rentals. All booking data is saved to Firestore.

### Acceptance Criteria
- [ ] Booking form collects: full name, email, phone, booking type (tour/flight/car), selected item, date range, number of travelers, special requests
- [ ] Form validates all required fields using `react-hook-form`
- [ ] Date picker uses `react-datepicker` — disables past dates
- [ ] On submit: saves document to `bookings` collection with status `pending`
- [ ] Success confirmation screen shown with booking reference ID
- [ ] Booking is linked to the logged-in user (`userId` field in Firestore doc)
- [ ] Booking confirmation email sent via EmailJS

### Firestore Booking Document Schema
```json
{
  "userId": "firebase_uid",
  "userEmail": "user@example.com",
  "userName": "John Doe",
  "bookingType": "tour | flight | car",
  "itemId": "package_or_flight_or_car_id",
  "itemName": "Sigiriya Rock Package",
  "dateFrom": "2026-04-01",
  "dateTo": "2026-04-05",
  "travelers": 2,
  "totalPrice": 450.00,
  "status": "pending",
  "specialRequests": "Vegetarian meals please",
  "createdAt": "<timestamp>"
}
```

---

## Issue #020 — Build User Dashboard (My Bookings)

**Labels:** `type: feature` `priority: high` `area: booking` `area: frontend` `status: todo`  
**Milestone:** M3 — Booking System  
**Assignee:** Sachini Fernando (Scheduling Manager)  
**Estimate:** 6 hours

### Description

Create the `DashboardPage.tsx` where logged-in users can view all their bookings, check status, and cancel if needed.

### Acceptance Criteria
- [ ] Fetches all bookings from Firestore where `userId == currentUser.uid`
- [ ] Displays bookings in a table or card list with: type, destination/item, dates, travelers, total, status badge
- [ ] Status badge color: `pending` = yellow, `confirmed` = green, `cancelled` = red
- [ ] User can cancel a `pending` booking (updates Firestore to `cancelled`)
- [ ] Empty state shown when user has no bookings
- [ ] Tab filters: All | Pending | Confirmed | Cancelled
- [ ] "Book Another" CTA button visible

---

## Issue #021 — Backend API: Booking Management Endpoints

**Labels:** `type: feature` `priority: high` `area: backend` `area: booking` `status: todo`  
**Milestone:** M3 — Booking System  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 4 hours

### Description

Extend the backend API to support full booking CRUD operations for admin use.

### Acceptance Criteria
- [ ] `GET /api/admin/bookings` — returns all bookings (sorted newest first) ✅ (already implemented)
- [ ] `PATCH /api/admin/bookings/:id` — update booking status ✅ (already implemented)
- [ ] `DELETE /api/admin/bookings/:id` — delete a booking (admin only)
- [ ] `GET /api/admin/bookings?status=pending` — filter bookings by status
- [ ] All endpoints protected by `adminAuth` middleware
- [ ] Error handling returns descriptive messages

---

## Issue #022 — Implement TanStack Query for Data Fetching

**Labels:** `type: enhancement` `priority: medium` `area: frontend` `status: todo`  
**Milestone:** M3 — Booking System  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 4 hours

### Description

Integrate `@tanstack/react-query` for all Firestore data fetching to get automatic caching, background refetching, and loading/error states.

### Acceptance Criteria
- [ ] `QueryClientProvider` wraps the app in `main.tsx`
- [ ] `useQuery` hooks replace all raw `useEffect` data fetches
- [ ] Loading spinners shown via `isLoading` state
- [ ] Error boundaries handle query failures gracefully
- [ ] Stale time set to 5 minutes for read-heavy collections

---

---

# 🛠️ PHASE 5 — ADMIN PANEL

---

## Issue #023 — Build Admin Dashboard Overview Page

**Labels:** `type: feature` `priority: high` `area: admin` `area: frontend` `status: todo`  
**Milestone:** M4 — Admin Panel  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 5 hours

### Description

Create the admin overview page with key statistics, recent bookings, and quick action buttons.

### Acceptance Criteria
- [ ] Admin login form with username + password (calls `POST /api/admin/login`)
- [ ] Stats cards: Total Bookings, Pending, Confirmed, Cancelled, Total Revenue
- [ ] Recent bookings table (last 10)
- [ ] Quick action: confirm or cancel a booking from the table
- [ ] Admin panel is accessible only after admin login
- [ ] Logout button clears admin token

---

## Issue #024 — Build Admin Bookings Management Page

**Labels:** `type: feature` `priority: high` `area: admin` `area: booking` `status: todo`  
**Milestone:** M4 — Admin Panel  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 5 hours

### Description

Full CRUD management of all bookings in the admin panel.

### Acceptance Criteria
- [ ] Full bookings table with all fields
- [ ] Search and filter by status, date, booking type
- [ ] Inline status update (dropdown: pending → confirmed → cancelled)
- [ ] Delete booking with confirmation dialog
- [ ] Pagination (10 bookings per page)
- [ ] Export bookings to CSV button

---

## Issue #025 — Admin: Destination & Package Management

**Labels:** `type: feature` `priority: medium` `area: admin` `area: frontend` `status: todo`  
**Milestone:** M4 — Admin Panel  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 8 hours

### Description

Allow admins to add, edit, and remove destinations and tour packages from the Firestore database via the admin panel.

### Acceptance Criteria
- [ ] Destinations management: Create, Read, Update, Delete
- [ ] Packages management: Create, Read, Update, Delete
- [ ] Forms for adding/editing include image upload (Firebase Storage or URL)
- [ ] Confirmation dialogs before deleting
- [ ] Changes reflect immediately on the public-facing pages

---

---

# 🐛 PHASE 6 — BUG FIXES & QUALITY ASSURANCE

---

## Issue #026 — 🐛 Bug: Security Risk — Admin Password Hardcoded Fallback

**Labels:** `type: bug` `type: security` `priority: high` `area: backend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 1 hour

### Description

In `server.js` line 61, the admin password has a hardcoded fallback: `'admin123'`. This is a security risk even in development.

### Steps to Reproduce
1. Start backend without setting `ADMIN_PASSWORD` in `.env.local`
2. Login with username `admin` and password `admin123`
3. Access is granted — no environment variable required

### Expected Behavior
Server should refuse to start or throw an error if `ADMIN_PASSWORD` is not set in environment variables.

### Fix
```js
// server.js — update admin login route
const validUser = process.env.ADMIN_USERNAME;
const validPass = process.env.ADMIN_PASSWORD;

if (!validUser || !validPass) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in environment variables');
}
```

---

## Issue #027 — 🐛 Bug: `/api/destinations` & `/api/tours` Return Empty Arrays

**Labels:** `type: bug` `priority: medium` `area: backend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 3 hours

### Description

`GET /api/destinations` and `GET /api/tours` are stub routes that only return `data: []`. They need to be connected to Firestore.

### Expected Behavior
Both endpoints should return real data from the `destinations` and `packages` Firestore collections.

### Fix
Connect the routes to Firestore using the Admin SDK, similar to the `/api/admin/bookings` implementation.

---

## Issue #028 — 🐛 Bug: No CORS Origin Restriction on Backend

**Labels:** `type: bug` `type: security` `priority: medium` `area: backend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 1 hour

### Description

The backend uses `app.use(cors())` with no allowed-origin restriction. This means any website can make requests to the backend API.

### Fix
```js
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
};
app.use(cors(corsOptions));
```

---

## Issue #029 — 🐛 Bug: `CarRentalPage.tsx` and `AirTicketPage.tsx` Are Empty Stubs

**Labels:** `type: bug` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 1 hour

### Description

`CarRentalPage.tsx` (345 bytes) and `AirTicketPage.tsx` (431 bytes) are nearly empty stub files. They need to render their respective feature components.

### Fix
Each page file should import and render its corresponding component:
```tsx
// CarRentalPage.tsx
import CarRentals from '../components/CarRentals';
export default function CarRentalPage() { return <CarRentals />; }
```

---

## Issue #030 — 🐛 Bug: `PackagesPage.tsx` Is an Empty Stub

**Labels:** `type: bug` `priority: high` `area: frontend` `status: todo`  
**Milestone:** M2 — Core Features  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 1 hour

### Description

`PackagesPage.tsx` (346 bytes) is a stub that doesn't render the `TourPackages` component.

### Fix
```tsx
import TourPackages from '../components/TourPackages';
export default function PackagesPage() { return <TourPackages />; }
```

---

## Issue #031 — Firestore Security Rules: Harden Read/Write Permissions

**Labels:** `type: security` `priority: high` `area: firebase` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Elisa Perera (Risk Manager)  
**Estimate:** 3 hours

### Description

Review and tighten `firestore.rules` to ensure users can only read/write their own data, and public data is read-only.

### Acceptance Criteria
- [ ] `bookings`: users can only read/write their own bookings (`request.auth.uid == resource.data.userId`)
- [ ] `destinations` & `packages`: publicly readable, admin-write only
- [ ] `users`: users can only read/write their own profile
- [ ] All rules tested with Firebase Emulator Suite

### Firestore Rules Template
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /destinations/{docId} {
      allow read: if true;
      allow write: if false; // admin via backend only
    }
    match /packages/{docId} {
      allow read: if true;
      allow write: if false;
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

---

# ✅ PHASE 7 — TESTING

---

## Issue #032 — Write Unit Tests for Backend API Routes

**Labels:** `type: testing` `priority: high` `area: backend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 6 hours

### Description

Write automated tests for all backend API endpoints using Jest and Supertest.

### Tests to Cover
- [ ] `GET /health` returns 200 OK
- [ ] `GET /api/ping` returns `{ backend: "connected" }`
- [ ] `POST /api/admin/login` — valid credentials → 200 + token
- [ ] `POST /api/admin/login` — invalid credentials → 401
- [ ] `GET /api/admin/bookings` — no auth → 401
- [ ] `GET /api/admin/bookings` — with valid token → 200 + data
- [ ] `PATCH /api/admin/bookings/:id` — invalid status → 400

---

## Issue #033 — Manual QA Testing Checklist

**Labels:** `type: testing` `priority: high` `area: frontend` `area: backend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 8 hours

### Description

Perform full end-to-end manual testing of all user-facing and admin features before the final release.

### Test Scenarios
- [ ] User registration → redirected to dashboard
- [ ] User login → redirected to dashboard
- [ ] Unauthenticated access to `/dashboard` → redirect to `/login`
- [ ] Browse destinations page — filter + search works
- [ ] Browse tour packages — filter + "Book Now" navigates correctly
- [ ] Complete a booking form end-to-end → success screen shown
- [ ] User sees their booking in dashboard
- [ ] Admin login → sees all bookings
- [ ] Admin confirms a booking → status updates correctly
- [ ] Admin cancels a booking → status updates
- [ ] Responsive layout tested on: Desktop (1440px), Tablet (768px), Mobile (375px)
- [ ] All pages load without console errors
- [ ] All forms show correct validation messages

---

## Issue #034 — Cross-Browser Compatibility Testing

**Labels:** `type: testing` `priority: medium` `area: frontend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Lakdinu Dissanayake (Quality Manager)  
**Estimate:** 2 hours

### Description

Test the application in all major browsers to ensure consistent visual and functional behavior.

### Browsers to Test
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Microsoft Edge (latest)
- [ ] Safari (if Mac available)
- [ ] Chrome on Android (mobile)

---

---

# 📄 PHASE 8 — DOCUMENTATION & DEPLOYMENT

---

## Issue #035 — Write Project Technical Documentation

**Labels:** `type: documentation` `priority: high` `status: todo`  
**Milestone:** M6 — Final Deployment  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 6 hours

### Description

Write comprehensive technical documentation covering architecture, API reference, data models, and setup guide for submission.

### Documents to Write
- [ ] `README.md` — Project overview, setup guide, team info
- [ ] `docs/ARCHITECTURE.md` — System architecture diagram, tech stack rationale
- [ ] `docs/API_REFERENCE.md` — All API endpoints with request/response examples
- [ ] `docs/DATA_MODELS.md` — Firestore collection schemas
- [ ] `docs/DEPLOYMENT.md` — Step-by-step deployment instructions
- [ ] `ADMIN_SETUP.md` — Admin account setup (exists, needs review)

---

## Issue #036 — SEO & Performance Optimization

**Labels:** `type: enhancement` `priority: medium` `area: frontend` `status: todo`  
**Milestone:** M5 — QA & Polish  
**Assignee:** Kavindi Himalka (Start-up Manager)  
**Estimate:** 4 hours

### Description

Optimize the app for search visibility and load performance using existing SEO components and Vite build optimization.

### Acceptance Criteria
- [ ] Every page has a `<title>` and `<meta name="description">` via `react-helmet-async`
- [ ] `<h1>` tag used exactly once per page
- [ ] Images have descriptive `alt` attributes
- [ ] Lighthouse Performance score ≥ 80
- [ ] Lighthouse SEO score ≥ 90
- [ ] Code splitting enabled (Vite does this automatically)
- [ ] Large images optimized/compressed before commit

---

## Issue #037 — Production Build & Deployment

**Labels:** `type: task` `priority: critical` `area: devops` `status: todo`  
**Milestone:** M6 — Final Deployment  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 5 hours

### Description

Build the frontend for production and deploy both frontend and backend to a hosting provider.

### Recommended Deployment Stack
| Service | Platform | Notes |
|---|---|---|
| Frontend | **Vercel** or **Netlify** | Free tier, automatic deploys from main branch |
| Backend | **Railway** or **Render** | Node.js hosting, set env vars in dashboard |
| Database | **Firebase Firestore** | Already cloud-hosted |

### Acceptance Criteria
- [ ] `npm run build` in `/client` completes without errors
- [ ] Frontend deployed and accessible on public URL
- [ ] Backend deployed with all environment variables set
- [ ] Frontend's `VITE_API_BASE_URL` points to live backend URL
- [ ] CORS on backend updated to allow the live frontend URL
- [ ] Live app tested end-to-end after deployment
- [ ] Final URL shared with team and recorded in `README.md`

---

## Issue #038 — Final Review & Submission Preparation

**Labels:** `type: task` `priority: critical` `status: todo`  
**Milestone:** M6 — Final Deployment  
**Assignee:** Dwayne Dehoedt (Project Manager)  
**Estimate:** 3 hours

### Description

Final checklist before project submission to ensure everything is complete, documented, and working.

### Acceptance Criteria
- [ ] All issues in M1–M5 are closed or documented as out-of-scope
- [ ] `main` branch is production-ready (no debug logs, no test credentials)
- [ ] All `.env` files and secrets are excluded from the repository
- [ ] `README.md` is complete and up to date
- [ ] Live deployment URL works and demonstrates full functionality
- [ ] Code reviewed by at least 2 team members
- [ ] Final version tagged: `git tag v1.0.0`

---

---

# 📊 Issue Summary Table

| # | Title | Type | Priority | Assignee | Milestone |
|---|---|---|---|---|---|
| #001 | Initialize GitHub Repository | Task | 🔴 Critical | Dwayne | M1 |
| #002 | Project Folder Structure & README | Task | 🔴 Critical | Kavindi | M1 |
| #003 | Environment Variables & Secrets | Task | 🔴 Critical | Dwayne | M1 |
| #004 | Firebase Project & Firestore Setup | Task | 🔴 Critical | Kavindi | M1 |
| #005 | Frontend Dependencies | Task | 🟠 High | Kavindi | M1 |
| #006 | Backend Dependencies | Task | 🟠 High | Dwayne | M1 |
| #007 | Navigation Bar Component | Feature | 🟠 High | Kavindi | M2 |
| #008 | Hero Section & Home Page | Feature | 🟠 High | Kavindi | M2 |
| #009 | Destinations Page | Feature | 🟠 High | Sachini | M2 |
| #010 | Tour Packages Page | Feature | 🟠 High | Sachini | M2 |
| #011 | Air Tickets Page | Feature | 🟠 High | Elisa | M2 |
| #012 | Car Rentals Page | Feature | 🟡 Medium | Elisa | M2 |
| #013 | Footer Component | Feature | 🟡 Medium | Sachini | M2 |
| #014 | About Us & Team Sections | Feature | 🟡 Medium | Kavindi | M2 |
| #015 | User Login with Firebase | Feature | 🔴 Critical | Dwayne | M2 |
| #016 | User Registration | Feature | 🟠 High | Dwayne | M2 |
| #017 | Auth Context & Protected Routes | Feature | 🔴 Critical | Dwayne | M2 |
| #018 | Admin Authentication (Backend) | Feature | 🟠 High | Dwayne | M2 |
| #019 | Booking Form & Page | Feature | 🔴 Critical | Elisa | M3 |
| #020 | User Dashboard (My Bookings) | Feature | 🟠 High | Sachini | M3 |
| #021 | Backend Booking API Endpoints | Feature | 🟠 High | Dwayne | M3 |
| #022 | TanStack Query Integration | Enhancement | 🟡 Medium | Kavindi | M3 |
| #023 | Admin Dashboard Overview | Feature | 🟠 High | Lakdinu | M4 |
| #024 | Admin Bookings Management | Feature | 🟠 High | Lakdinu | M4 |
| #025 | Admin Destination/Package CRUD | Feature | 🟡 Medium | Lakdinu | M4 |
| #026 | 🐛 Hardcoded Admin Password | Bug/Security | 🟠 High | Elisa | M5 |
| #027 | 🐛 API Stubs Return Empty Data | Bug | 🟡 Medium | Dwayne | M5 |
| #028 | 🐛 No CORS Origin Restriction | Bug/Security | 🟡 Medium | Elisa | M5 |
| #029 | 🐛 Empty CarRental/AirTicket Pages | Bug | 🟠 High | Kavindi | M2 |
| #030 | 🐛 Empty Packages Page | Bug | 🟠 High | Kavindi | M2 |
| #031 | Firestore Security Rules | Security | 🟠 High | Elisa | M5 |
| #032 | Backend Unit Tests | Testing | 🟠 High | Lakdinu | M5 |
| #033 | Manual QA Testing Checklist | Testing | 🟠 High | Lakdinu | M5 |
| #034 | Cross-Browser Testing | Testing | 🟡 Medium | Lakdinu | M5 |
| #035 | Technical Documentation | Docs | 🟠 High | Dwayne | M6 |
| #036 | SEO & Performance Optimization | Enhancement | 🟡 Medium | Kavindi | M5 |
| #037 | Production Build & Deployment | Task | 🔴 Critical | Dwayne | M6 |
| #038 | Final Review & Submission | Task | 🔴 Critical | Dwayne | M6 |

---

## 🗂️ How to Use This Document

### Step 1 — Create Labels in GitHub
Go to your GitHub repo → **Issues** → **Labels** → **New label** and create all labels from the Label System section above.

### Step 2 — Create Milestones
Go to **Issues** → **Milestones** → **New milestone** and create M1 through M6 with target dates.

### Step 3 — Create Issues
Copy each issue from this document into GitHub:
1. Use the issue title
2. Paste the description body
3. Apply the corresponding labels
4. Set the milestone
5. Assign to the team member listed

### Step 4 — Set Up Project Board
1. Go to **Projects** → **New project** → choose **Board** layout
2. Create columns: `📋 Backlog` | `🔄 In Progress` | `👀 In Review` | `✅ Done`
3. Add all issues to the Backlog column
4. Move issues as work progresses

### Step 5 — Sprint Workflow
- Start of each sprint: team moves relevant issues from Backlog → In Progress
- When code is pushed and PR opened: move to In Review
- After PR merged: close the issue → it moves to Done

---

*Document prepared by Dwayne Dehoedt (Project Manager) — TourismTreasure Project — 2025/2026*
