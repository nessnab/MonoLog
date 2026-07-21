# 📝 MonoLog

A collaborative workspace where teams create projects and share progress through lightweight daily logs.

Built with React, TypeScript, Express, Prisma and PostgreSQL.

## Live Demo: https://monolog-app.vercel.app/

## Overview

MonoLog is a lightweight project management application inspired by modern collaboration tools.

Instead of managing complex tasks, MonoLog focuses on one simple workflow:

- Create a workspace
- Add team members
- Create projects
- Post daily progress logs

It was built as a portfolio project to practice full-stack application architecture, authentication, relational databases, and role-based authorization.

## Features

### Authentication

- JWT authentication
- Secure HTTP-only cookies
- Login / Logout
- Workspace registration

### Workspace

- Create workspace
- Add members
- Role-based access (Admin / Member)

### Projects

- Create project
- Update project

### Logs

- Create daily logs
- Update logs
- View project activity

### UI

- Responsive dashboard (ongoing)
- Empty states
- Form validation

## Tech Stack

| Frontend | Backend | Database |
|-----------|----------|----------|
| React | Express | PostgreSQL |
| TypeScript | Prisma | pgAdmin |
| Tailwind CSS | JWT | |

## Architecture

Client (React)

↓

Express API

↓

Prisma ORM

↓

PostgreSQL

**Authentication**

JWT
↓

HTTP-only Cookies

↓

Role Middleware

↓

Protected Routes

## Installation

Clone repository

```bash
git clone https://github.com/nessnab/MonoLog.git
```

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Server

```env
DATABASE_URL=
JWT_SECRET=
```

Client
```env
VITE_API_URL=
```

## Future Improvements

- File attachments
- Comments
- Activity timeline
- Notifications
- Search
- Dashboard analytics
- Responsive mobile layout

## What I Learned

Building MonoLog taught me how to:

- Design relational database schemas with Prisma
- Structure a React application into reusable feature components
- Implement role-based authorization
- Manage authentication using JWT and HTTP-only cookies
- Separate frontend and backend responsibilities
- Deploy a full-stack application
