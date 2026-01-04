# 🎯 BudgetHobby

> Discover hobbies that match your interests and budget.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

BudgetHobby is a full-stack web platform that helps you discover new hobbies and activities tailored to your budget and personal interests. Browse hundreds of activities, save your favorites, and manage your profile — all in a clean, modern interface.

---

## ✨ Features

- 🔍 **Discover** — Browse and search activities with filters by category and price
- 💰 **Budget-aware** — Set your monthly budget and find hobbies that fit
- ❤️ **Favorites** — Save and manage your favorite activities
- 🧭 **Onboarding** — Personalized setup in 3 simple steps
- 👤 **Profile** — Manage preferences, budget, and dark mode
- 🔐 **Auth** — Secure JWT-based registration and login

---

## 🛠 Tech Stack

| Layer      | Technologies                                                               |
|------------|----------------------------------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, TailwindCSS, Shadcn UI, Zustand, React Query  |
| Backend    | Node.js, Express.js, TypeScript, Prisma ORM                               |
| Database   | PostgreSQL                                                                 |
| Auth       | JWT, bcrypt                                                                |
| Dev Tools  | ESLint, Prettier, Docker Compose                                           |

---

## 📁 Project Structure

```
budgethobby/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Node.js backend (Express + Prisma)
├── database/        # Prisma schema and migrations
├── docs/            # Documentation
├── docker-compose.yml
└── package.json     # Monorepo root
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Docker & Docker Compose (for local PostgreSQL)

### 1. Clone the repo

```bash
git clone https://github.com/A-mons/budgethobby.git
cd budgethobby
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` with your database URL and JWT secret.

### 4. Start the database

```bash
docker-compose up -d db
```

### 5. Run migrations and seed data

```bash
npm run db:migrate
npm run db:seed
```

### 6. Start the dev servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Prisma Studio: `npm run db:studio`

---

## 🐳 Docker (Full Stack)

```bash
docker-compose up
```

This starts PostgreSQL, the backend API, and the frontend dev server together.

---

## 📡 API Reference

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| POST   | /auth/register        | Create a new account     | No            |
| POST   | /auth/login           | Login and receive JWT    | No            |
| GET    | /activities           | List all activities      | No            |
| GET    | /activities/:id       | Get single activity      | No            |
| GET    | /favorites            | Get user favorites       | Yes           |
| POST   | /favorites            | Add to favorites         | Yes           |
| DELETE | /favorites/:id        | Remove from favorites    | Yes           |
| GET    | /user/preferences     | Get user preferences     | Yes           |
| POST   | /user/preferences     | Update preferences       | Yes           |

---

## 🗂 Database Schema

```prisma
model User {
  id         String      @id @default(cuid())
  email      String      @unique
  password   String
  createdAt  DateTime    @default(now())
  favorites  Favorite[]
  preferences Preferences?
}

model Activity {
  id          String     @id @default(cuid())
  name        String
  category    String
  description String
  price       Float
  difficulty  String
  image       String
  favorites   Favorite[]
}

model Favorite {
  id         String   @id @default(cuid())
  userId     String
  activityId String
  createdAt  DateTime @default(now())
  user       User     @relation(fields: [userId], references: [id])
  activity   Activity @relation(fields: [activityId], references: [id])
}

model Preferences {
  id         String   @id @default(cuid())
  userId     String   @unique
  budget     Float    @default(150)
  categories String[]
  user       User     @relation(fields: [userId], references: [id])
}
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © [A-mons](https://github.com/A-mons)


