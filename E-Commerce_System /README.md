# E-Commerce Backend (Node.js + Express + JSON Storage)

A secure, minimal e-commerce backend built with **Node.js + Express** using **JSON files as a data store** (no database).
It includes:
- JWT-based authentication (register/login)
- Role-based authorization (admin vs customer)
- Product management (admin-only write operations)
- Order creation with **atomic-like stock handling** (stock decreases during order creation)
- Centralized error handling + consistent response messages

> Data persists in `data/users.json`, `data/products.json`, `data/orders.json`.

---

## Tech Stack
- Node.js
- Express
- JSON file storage (fs/promises)
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- dotenv (env vars)

---

## Project Structure

.
├─ app.js
├─ controllers/
│ ├─ auth.controller.js
│ ├─ product.controller.js
│ └─ order.controller.js
├─ services/
│ ├─ auth.service.js
│ ├─ product.service.js
│ └─ order.service.js
├─ routes/
│ ├─ auth.routes.js
│ ├─ product.routes.js
│ └─ order.routes.js
├─ middlewares/
│ ├─ auth.middleware.js
│ ├─ role.middleware.js
│ ├─ validation.js
│ └─ errorHandler.js
├─ utils/
│ ├─ asyncHandler.js
│ ├─ appError.js
│ └─ jsonStore.js
├─ constants/
│ ├─ httpStatus.js
│ └─ responseMessages.js
└─ data/
├─ users.json
├─ products.json
└─ orders.json

---

## How It Works (High Level)

### 1) JSON Storage Layer
A small utility reads/writes JSON from `/data/*.json`.  
Reads parse JSON; writes stringify JSON. Errors become `AppError`.  

### 2) Services
Services contain business logic:
- **Auth**: register/login, bcrypt hash/compare, jwt sign
- **Products**: CRUD-like operations, stored in `products.json`
- **Orders**: creates orders and decreases product stock

### 3) Controllers
Controllers call services and return HTTP responses.

### 4) Middleware
- `auth.middleware`: validates JWT from `Authorization: Bearer <token>`
- `role.middleware`: restricts access to roles (admin)
- `validation`: validates request bodies for auth/products/orders
- `errorHandler`: centralized error response

---

## Setup

### 1) Install dependencies
```bash
npm install
2) Create .env
Create a .env file in the project root:

HOST=127.0.0.1
PORT=3000

API_KEY=your_super_secret_key
API_EXP=1h
API_KEY is the JWT secret

API_EXP is token expiration (example: 1h, 7d, 30m)

3) Start the server
node app.js
Server will run on:

http://HOST:PORT
Authentication
Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
JWT payload contains:

id

role

Roles
admin: can create/update/delete products, can view all orders

customer: can browse products and create/view own orders

API Endpoints
Auth
Register
POST /auth/register

Body

{
  "email": "admin@mail.com",
  "password": "password123",
  "role": "admin"
}
Role defaults to "customer" if not provided or invalid.

Response (201)

{
  "message": "User registered successfully",
  "payload": {
    "id": "uuid",
    "email": "admin@mail.com",
    "role": "admin",
    "createdAt": "2026-01-12T12:00:00.000Z"
  }
}
Login
POST /auth/login

Body

{
  "email": "admin@mail.com",
  "password": "password123"
}
Response (200)

{
  "message": "Login successful",
  "payload": {
    "token": "JWT_TOKEN"
  }
}
Products
Get all products
GET /products

Response (200)

{
  "message": "OK",
  "payload": [
    {
      "id": "uuid",
      "name": "Laptop",
      "price": 1200,
      "stock": 10,
      "createdAt": "2026-01-12T12:00:00.000Z"
    }
  ]
}
Get product by id
GET /products/:id

Create product (admin only)
POST /products

Headers

Authorization: Bearer <ADMIN_TOKEN>
Body

{
  "name": "Laptop",
  "price": 1200,
  "stock": 10
}
Response (201)

{
  "message": "Product created successfully",
  "payload": {
    "id": "uuid",
    "name": "Laptop",
    "price": 1200,
    "stock": 10,
    "createdAt": "2026-01-12T12:00:00.000Z"
  }
}
Update product (admin only)
PATCH /products/:id

Headers

Authorization: Bearer <ADMIN_TOKEN>
Body (any subset)

{
  "price": 1300,
  "stock": 8
}
Response (200)

{
  "message": "Product updated successfully"
}
Delete product (admin only)
DELETE /products/:id

Headers

Authorization: Bearer <ADMIN_TOKEN>
Response (200)

{
  "message": "Product deleted successfully"
}
Orders
Create order (authenticated)
POST /orders

Headers

Authorization: Bearer <TOKEN>
Body

{
  "items": [
    { "productId": "PRODUCT_UUID_1", "quantity": 2 },
    { "productId": "PRODUCT_UUID_2", "quantity": 1 }
  ]
}
What happens internally

For each item:

product must exist

stock must be enough

stock decreases immediately

priceAtPurchase is saved into the order item

Total amount is calculated from priceAtPurchase * quantity

Response (201)

{
  "message": "Order created successfully",
  "payload": {
    "id": "uuid",
    "userId": "user_uuid",
    "items": [
      { "productId": "PRODUCT_UUID_1", "quantity": 2, "priceAtPurchase": 1200 },
      { "productId": "PRODUCT_UUID_2", "quantity": 1, "priceAtPurchase": 300 }
    ],
    "totalAmount": 2700,
    "status": "created",
    "createdAt": "2026-01-12T12:00:00.000Z"
  }
}
Get my orders (authenticated)
GET /orders

Headers

Authorization: Bearer <TOKEN>
Get all orders (admin only)
GET /orders/all

Headers

Authorization: Bearer <ADMIN_TOKEN>
Validation Rules
Auth
Email must match a valid email pattern

Password must be at least 8 characters and alphanumeric

Product
name: string

price: number > 0

stock: number > 0

Order
items must be an array with length > 0

each item must include:

productId

quantity (number >= 1)

Error Handling
All errors return consistent JSON:

{
  "success": false,
  "message": "Some error message"
}
Examples:

missing auth header

invalid bearer scheme

invalid/expired token

forbidden role

product not found

insufficient stock

invalid request body

Quick Test (cURL)
Register admin
curl -X POST http://127.0.0.1:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mail.com","password":"password123","role":"admin"}'
Login admin
curl -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mail.com","password":"password123"}'
Create product (replace token)
curl -X POST http://127.0.0.1:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"name":"Laptop","price":1200,"stock":10}'
Create order (replace token + product ids)
curl -X POST http://127.0.0.1:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{"items":[{"productId":"PRODUCT_UUID_1","quantity":2}]}'
Notes / Known Behavior
This project uses JSON files instead of a database, so it’s meant for learning backend architecture patterns.

Stock decreases during order creation; if validation fails, order creation is rejected.

Endpoints are REST-like and return consistent message/payload objects.
