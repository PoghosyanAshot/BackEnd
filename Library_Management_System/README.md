📚 Library Management System

Node.js + Express + EJS

A full-featured Library Management System built with server-side rendering (SSR).
The system supports authentication, role-based authorization, book catalog, and borrowing/returning logic using local JSON storage.

🚀 Features
Authentication

Register / Login / Logout

Password hashing with bcrypt

JWT authentication via HttpOnly cookies

Authorization

Role-based access:

admin (librarian)

member (regular user)

Admin-only routes protected

Book Management

Browse all books

View book details

Borrow and return books

Track availability

Admin Panel

Create / edit / delete books

View all users

Promote users to admin

User Dashboard

View active loans

View loan history

Return borrowed books

🧱 Tech Stack

Node.js

Express

EJS (SSR templates)

JWT (jsonwebtoken)

bcrypt

Local JSON storage

📁 Project Structure
project/
  app.js
  data/
    users.json
    books.json
    loans.json

  src/
    routes/
      auth.routes.js
      books.routes.js
      admin.routes.js

    services/
      auth.service.js
      user.service.js
      book.service.js
      loan.service.js
      jsonStore.js

    middlewares/
      attachUser.js
      requireAuth.js
      requireAdmin.js

    utils/
      AppError.js
      id.js
      validators.js

  views/
    pages/
    partials/

  public/
    css/

🔐 Authentication Flow

On login:

Server generates JWT

Stored in HttpOnly cookie: auth_token

On each request:

Token verified

User loaded from users.json

req.user is attached

No sessions. No server-side state.

📡 API Endpoints
Public
Method	URL
GET	/
GET	/login
GET	/register
POST	/login
POST	/register
GET	/logout
Authenticated
Method	URL
GET	/books
GET	/books/:id
POST	/books/:id/borrow
POST	/books/:id/return
GET	/me/loans
Admin
Method	URL
GET	/admin
GET	/admin/users
POST	/admin/users/:id/make-admin
GET	/admin/books/new
POST	/admin/books
GET	/admin/books/:id/edit
POST	/admin/books/:id
POST	/admin/books/:id/delete
🗃 Data Models
User
{
  "id": "u1",
  "name": "Admin",
  "email": "admin@mail.com",
  "passwordHash": "...",
  "role": "admin",
  "createdAt": "..."
}

Book
{
  "id": "b1",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "available": true
}

Loan
{
  "id": "l1",
  "userId": "u2",
  "bookId": "b1",
  "borrowedAt": "...",
  "returnedAt": null
}

🧠 Business Rules

One book can have only one active loan

Only borrower can return a book

Admin actions protected by middleware

No duplicate emails

No plain passwords stored

JWT role is ignored – real role loaded from DB

▶️ Run Project
Install
npm install

Environment

Create .env:

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=2h
PORT=3001

Start
npm start


Open:

http://localhost:3001

🧪 Default Admin

Seed one admin user manually in users.json:

{
  "id": "admin-1",
  "name": "Admin",
  "email": "admin@mail.com",
  "passwordHash": "<bcrypt hash>",
  "role": "admin"
}

🏆 Architecture Principles

Controllers: HTTP only

Services: business logic

JSON store: persistence

Middlewares: auth

Views: SSR only

No frontend JS hacks

No client-side auth

📌 Final Note

This project is designed to teach:

Real backend architecture

Authentication vs Authorization

Domain-driven design

SSR workflows

Transactional logic without DB

It simulates how real-world backend systems work.
