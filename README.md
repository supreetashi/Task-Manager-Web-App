# Task Manager

A full-stack task management application with AI-powered task suggestions, secure JWT authentication using httpOnly cookies, CSRF protection, drag-and-drop Kanban board, and dark mode support.

**Live Demo:** *(https://task-manager-web-app-navy.vercel.app)*

**Video Walkthrough:** *(https://www.loom.com/share/7e5b9685ee6b488785826d7f6656bdc1)*

---

# Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS v4
- @dnd-kit (Drag & Drop)

### Backend
- Node.js
- Express 5

### Database
- PostgreSQL
- Prisma ORM 7

### AI
- Google Gemini (`gemini-2.5-flash`)
- `@google/genai`

### Authentication & Security
- JWT Authentication
- httpOnly Cookies
- CSRF Double Submit Cookie Pattern
- bcrypt Password Hashing

---

# Why These Technologies?

### PostgreSQL instead of MongoDB

The application stores structured task data (`title`, `description`, `status`, `priority`, `dueDate`, `userId`) with clear relationships between users and tasks.

A relational database provides:

- Better schema validation
- Enum support for `status` and `priority`
- Strong data consistency
- Easier querying and filtering

---

### Prisma ORM

Prisma provides:

- Type-safe database queries
- Database migrations
- Excellent developer experience
- Automatic schema documentation

> **Note:** Prisma 7 introduced Driver Adapters (`@prisma/adapter-pg`) replacing the Rust Query Engine used in previous versions.

---

### JWT in httpOnly Cookies

Instead of storing JWTs in `localStorage`, authentication tokens are stored inside **httpOnly cookies**.

Benefits:

- JavaScript cannot access the JWT.
- Significantly reduces XSS token theft risk.
- Browser automatically includes cookies with authenticated requests.

Because cookies are automatically sent by browsers, the application protects all state-changing requests using a **CSRF Double Submit Token**.

---

### Structured Gemini Responses

Gemini is configured to return structured JSON using `responseSchema`.

Advantages:

- No string parsing
- No regex extraction
- AI priority always matches database enums
- More reliable backend validation

---

### @dnd-kit

`react-beautiful-dnd` is no longer actively maintained.

`@dnd-kit` offers:

- React 18 compatibility
- Better accessibility
- Modern architecture
- Active maintenance

---

# Features

- User Registration
- User Login & Logout
- JWT Authentication
- Secure httpOnly Cookie Sessions
- CSRF Protection
- Create Tasks
- Update Tasks
- Delete Tasks
- View Individual Tasks
- Filter Tasks by Status
- Filter Tasks by Priority
- Kanban Board
- Drag & Drop Status Updates
- AI Task Suggestions
- Responsive Design
- Dark Mode

---

# Security Features

- Password hashing using **bcrypt**
- JWT stored inside **httpOnly cookies**
- CSRF protection using the **Double Submit Cookie Pattern**
- Protected API routes
- Server-side AI API key
- Environment variables for secrets

---

# Project Structure

```text
taskmanager-app/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current authenticated user |

---

## Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## AI

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/ai/suggest` | Generate AI task suggestion |

---

# Running Locally

## Prerequisites

- Node.js 18+
- PostgreSQL
- Gemini API Key

Generate a free Gemini API key:

https://aistudio.google.com/app/apikey

---

# Backend Setup

```bash
cd server
npm install
```

Create `server/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager?schema=public"
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="generate-a-secret-below"
PORT=5000
CLIENT_URL="http://localhost:5173"
```

Generate a JWT Secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start Backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Using the Application

1. Register a new account.
2. Login.
3. Click **+ New Task**.
4. Enter a rough task title.
5. Click **✨ AI Suggest**.
6. Review or edit the generated description and priority.
7. Save the task.
8. Drag tasks across columns to update their status.
9. Filter tasks by status or priority.
10. Toggle Dark Mode.

---

# AI Tools Used

## Google Gemini

- Model: `gemini-2.5-flash`
- Used only on the backend
- API key never exposed to the frontend

---

## AI Pair Programming

AI assistance was used for:

- Project architecture
- Debugging
- Prisma 7 migration changes
- Code review
- Documentation
- Best practice recommendations

---

# Future Improvements

If more time were available, the following enhancements would be added:

- Refresh CSRF tokens periodically
- Optimistic UI updates for drag-and-drop
- Pagination for large task lists
- Persist Dark Mode preference across sessions
- Unit Tests
- Integration Tests
- End-to-End Tests
- Docker support
- GitHub Actions CI/CD pipeline

---

# License

This project was created as part of a Full Stack Developer hiring assignment for **ErBrains**.