
# 📓 Notes App (MERN)

A concise, production-oriented notes application implemented with a React frontend and an Express + MongoDB backend. This repository demonstrates a full-stack implementation of user authentication, protected REST APIs for CRUD operations on notes, client-side state management with Redux, form handling and validation, and sensible middleware for security and rate-limiting. ✅

---

**📁 Repository snapshot**
- Frontend: React + Vite + Redux + React-Bootstrap
- Backend: Node.js + Express + Mongoose + Zod

---

**🧭 Project Overview**

- Purpose: Provide authenticated users a lightweight interface to create, view, update and delete personal notes. Each note includes a title, category and markdown content. The app persists users and notes in MongoDB and protects note operations behind JWT-based authentication. 🔐
- Problem solved: A simple, secure personal notes manager with server-side validation, rate-limiting for sensitive routes, and a responsive UI. ⚡

---

**⚙️ Architecture**

- The project is structured as a two-folder workspace: a Vite-powered React frontend (served in development by Vite) and an Express backend. During development the frontend proxies `/api` requests to the backend (see [frontend/vite.config.js](frontend/vite.config.js#L1-L40)). 🔁
- Frontend communicates with backend over REST endpoints under `/api/users` and `/api/notes` using `axios` and includes the JWT token in the `Authorization: Bearer <token>` header for protected routes. 🧩

---

**✨ Frontend**

Key files: [frontend/package.json](frontend/package.json#L1-L80), [frontend/src/App.jsx](frontend/src/App.jsx#L1-L120), [frontend/src/store.js](frontend/src/store.js#L1-L200)

Major libraries and why they were chosen
- `react` / `react-dom` — UI library used to build component-driven interface.
  - Usage: core UI rendering and component model.
  - Benefit: declarative UI, large ecosystem. 🧱
- `vite` + `@vitejs/plugin-react` — Fast development server and build tool.
  - Usage: dev server, HMR, build pipeline.
  - Benefit: much faster local iteration than older toolchains. ⚡
- `react-router-dom` — Client-side routing.
  - Usage: routes defined in `App.jsx` for pages such as `/login`, `/signup`, `/mynotes`, `/note/:id`, `/createnote`, `/myprofile`.
  - Benefit: Declarative route definitions and nested routing support. 🧭
- `react-redux` + `@reduxjs/toolkit` — Global state management.
  - Usage: `store.js` configures reducers for user and notes state, actions in `src/actions` dispatch API calls and update store.
  - Benefit: Centralized state for authentication and list management; preloaded state uses `localStorage` for session persistence. 🔁
- `axios` — HTTP client.
  - Usage: All API calls to backend endpoints (e.g., `/api/users/login`, `/api/notes`).
  - Benefit: Promise-based API with request/response intercept options. 🌐
- `react-bootstrap` + `bootstrap` — UI components + CSS utility styles.
  - Usage: Forms, navigation bar, layout, buttons and responsive components across screens.
  - Benefit: Faster UI composition with consistent bootstrap styling. 🎨
- `react-markdown` — Renders note content as Markdown in previews and read views.
  - Usage: In `CreateNote`, `SingleNote`, and `MyNotes` preview and content display.
  - Benefit: Allows users to write notes with Markdown formatting. ✍️

Frontend structure & patterns
- Component-driven layout: top-level `App.jsx` composes `Header`, `Footer` and lazy-loaded screen components via `React.lazy` + `Suspense` for code-splitting. 📦
- Routing: defined in `App.jsx` with routes for authentication, profile, note CRUD and the landing page. 🗺️
- State management: Redux slice-like reducers in `src/reducers` with actions in `src/actions`. `localStorage` is used to persist `userInfo` (token + user data). 💾
- Styling: Bootstrap CSS is used globally via `bootstrap.min.css` and small local CSS files per screen/component. 🎨
- API integration & auth flow: After successful login/register, the backend returns `{ user, token }` which is stored in Redux and `localStorage`. Subsequent API calls attach `Authorization: Bearer <token>` to access protected endpoints. 🔐
- Form handling & validation: Forms use controlled components from React and `react-bootstrap`. Client performs simple checks (e.g., confirm password matching); authoritative validation is performed server-side using `zod` (see backend validators). ✅
- Error handling: UI displays API validation and error objects via a reusable `Error` component that normalizes messages and `zod` error outputs. 🚨
- Notable optimizations: Lazy-loading routes for smaller initial bundles and preview rendering using `react-markdown` only where needed. 📈

Implementation notes / omissions
- Image upload UI is present (commented-out file input behavior in Register/Profile screens) but image upload to a server or cloud storage is not implemented. ⚠️

---

**🛠️ Backend**

Key files: [server/index.js](server/index.js#L1-L160), [server/controllers/user.controller.js](server/controllers/user.controller.js#L1-L200), [server/controllers/note.controller.js](server/controllers/note.controller.js#L1-L240), [server/models/usermodel.js](server/models/usermodel.js#L1-L240), [server/models/notesmodel.js](server/models/notesmodel.js#L1-L200)

Major libraries and why they were chosen
- `express` — Minimal and flexible web framework.
  - Usage: Application server, routing and middleware stack.
  - Benefit: Familiar, mature ecosystem and middleware support. 🧭
- `mongoose` — MongoDB ODM.
  - Usage: Schema definitions and data operations for `users` and `notes` collections.
  - Benefit: Schema enforcement, query helpers, and integration with MongoDB. 🗄️
- `zod` — Schema validation library.
  - Usage: request validation for user and note payloads in `server/validators/*` and the `validate` middleware.
  - Benefit: Strong, composable runtime validation with clear error shapes used by the frontend `Error` component. 🔍
- `bcryptjs` — Password hashing.
  - Usage: User password hashing in `UserSchema.pre('save')` and verification via `bcrypt.compare`.
  - Benefit: Secure password storage. 🔒
- `jsonwebtoken` — JWT creation and verification.
  - Usage: `generateAuthToken()` on the user model; `auth.middleware.js` verifies tokens for protected routes.
  - Benefit: Simple token-based authentication suitable for stateless APIs. 🧾
- `express-rate-limit` — Rate limiting.
  - Usage: `globalLimiter` applied for basic DDOS protection; stricter limits applied to login and register routes.
  - Benefit: Basic brute-force protection for auth endpoints. 🚫
- `helmet` — HTTP header hardening.
  - Usage: Applied to `app` in `server/index.js` for headers like `X-DNS-Prefetch-Control`, `X-Content-Type-Options`, etc.
  - Benefit: Improves security posture by setting safe defaults. 🛡️

Backend architecture & features
- Authentication: JWT-based. `POST /api/users/register` creates a user and returns a token. `POST /api/users/login` verifies credentials with `User.findByCredentials` and returns a token and user. The `auth` middleware protects note endpoints and the profile update endpoint by verifying the token and attaching `req.user`. 🔐
- Validation: All key request payloads use `zod` schemas and a small `validate` middleware that calls `schema.safeParse()` and translates errors to a consistent JSON shape. ✅
- Rate-limiting: Global rate limit and per-route limits for `login` and `register` to reduce abuse. 🛑
- Error handling: Centralized error handlers `NotFound` and `ErrorHandler` provide consistent JSON error responses and optional stack traces when `NODE_ENV` is `development`. 🧾
- Data model: `User` and `Note` mongoose models. Notes reference the owning user in `user` field and enforce required fields and timestamps. 🧱
- API endpoints (implemented)
  - Users:
    - `POST /api/users/register` — register a new user. (uses `registerLimiter`) 📝
    - `POST /api/users/login` — login and return user + token. (uses `loginLimiter`) 🔑
    - `POST /api/users/profile` — protected; update profile fields and return updated user + token. ✏️
  - Notes (all protected by `auth` middleware):
    - `GET /api/notes` — list notes owned by authenticated user. 📄
    - `GET /api/notes/:id` — get a single note by id (params validated). 🔎
    - `POST /api/notes/create` — create a note for authenticated user. ➕
    - `PUT /api/notes/:id` — update a note (only owner allowed). ✨
    - `DELETE /api/notes/:id` — delete a note (only owner allowed). 🗑️

Security and best practices implemented
- Password hashing with `bcryptjs` and no password returned from model's `toJSON()`. 🔐
- JWT tokens signed with `process.env.JWT_SECRET` and expiry configured in model (`7d`). ⏳
- Input validation using `zod` to prevent malformed payloads and enforce types/lengths. ✅
- Rate-limiting and `helmet` for basic security hardening. 🛡️

---

**✅ Features**

- User registration and login with password hashing and JWT tokens. 🔑
- Update user profile (name, email, picture URL, password). ✍️
- Create, read, update, delete notes (CRUD) tied to authenticated user. 🗂️
- Notes support Markdown content and show a rendered preview in the UI. ✨
- Client-side state persistence using `localStorage` for session. 💾
- Validation on server (detailed `zod` schemas) with consistent error shapes surfaced to the UI. ✅
- Route-level rate limiting for authentication endpoints and global request limiting. 🚫

---

**🧠 Technical decisions**

- Zod for server-side validation: chosen for concise runtime schema validation with predictable error shapes the frontend can render directly. 🔍
- JWT for stateless auth: simple token approach that integrates cleanly with REST and the SPA client; tokens are short lived and refreshed on profile update. 🔑
- Redux for global session and notes state: keeps authentication state and API-driven lists consistent across routes and enables easy preloading from `localStorage`. 🔁
- Vite + React.lazy for dev speed and smaller initial bundles: improves developer experience and reduces initial download size. ⚡
- Separation of concerns: controllers handle business logic, validators handle request validation, models contain Mongoose schema logic, and middleware centralizes cross-cutting concerns (auth, validation, rate-limit, error handling). 🧩

---

**📂 Project structure**

- Root
  - `package.json` — top-level scripts and server dependencies. See [package.json](package.json#L1-L120). 📦
- `frontend/`
  - `package.json` — frontend dev/build scripts and dependencies. See [frontend/package.json](frontend/package.json#L1-L80). 📦
  - `vite.config.js` — dev proxy to backend (proxies `/api` to `http://127.0.0.1:3000`). 🔁
  - `src/` — React source
    - `App.jsx` — route definitions and layout. 🗺️
    - `store.js` — Redux store configuration and preloaded state. 🧾
    - `actions/` — async action creators that call backend APIs via `axios`. 🔌
    - `reducers/` — reducers for user and notes state. 🧠
    - `components/` — shared UI components (Header, Footer, Loading, Error, MainScreen). 🧩
    - `screens/` — route-level screens for Login, Register, MyNotes, Create/Edit Note, Profile, Landing. 🖥️
- `server/`
  - `index.js` — Express app bootstrap (helmet, JSON parser, route mounts, error handlers). 🚀
  - `config/` — `dbconfig.js` connects to MongoDB. 🔗
  - `controllers/` — route handlers for users and notes. 🧾
  - `models/` — `usermodel.js` and `notesmodel.js` (Mongoose schemas and methods). 🗄️
  - `routes/` — router files wiring endpoints to controllers. 🛣️
  - `validators/` — `zod` schemas and validation logic. 🔍
  - `middleware/` — `auth`, `validate`, `rate-limiter`, and error handlers. 🛡️

---

**🚀 Setup & Run (Development)**

1. Install top-level dependencies and server dev tools

```bash
npm install
```

2. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

3. Environment variables

Create a `.env` file in the project root (or set environment variables) with the following values:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.example/mydb
JWT_SECRET=your_jwt_secret_here
PORT=3000        # optional, defaults to 3000
NODE_ENV=development
```

4. Run in development (server + client)

```bash
npm run dev
```

This runs the Express server (nodemon) and the Vite dev server concurrently. Vite proxies `/api` to the server at `http://127.0.0.1:3000`.

5. Build frontend for production

```bash
cd frontend
npm run build
```

Note: The repository does not currently include an Express static-server integration for serving the built frontend. For production you can host the built `dist/` separately (for example on Netlify, Vercel, or by adding static middleware in Express). 🏷️

---

**🔐 Environment variables (summary)**

- `MONGO_URI` — MongoDB connection string (required)
- `JWT_SECRET` — secret used to sign JWT tokens (required)
- `PORT` — server port (optional, default 3000)
- `NODE_ENV` — environment mode (optional, used by error handler)

---

**🔭 Future improvements**

- Add production static serving: integrate frontend build output with Express to serve a single-deploy artifact. 🏷️
- Implement refresh tokens or shorter token rotation for improved security. 🔁
- Add centralized logging (e.g., winston) and request tracing for production observability. 📊
- Add automated tests (unit + integration) for controllers, middleware and frontend components. 🧪
- Implement image/file upload properly (currently UI placeholders exist but no server upload/storage). 📷
- Add pagination, search backend support and rate-limit tuning for larger data sets. 🔎
- Harden security headers and CSP configuration beyond Helmet defaults as required for production. 🛡️

---

