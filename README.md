# 🛠️ WorkNest Server — REST API for Employee Management System

This is the **server-side** of the **WorkNest** platform — a full-stack role-based employee management system for Admins, HRs, and Employees.

The backend is built with **Express.js**, uses **MongoDB** as the primary database, and exposes a secure REST API for authentication, role-based access, employee work tracking, salary management, and contact message handling.

---

## 🌐 Related Repositories

- ✅ [WorkNest Client (Frontend)](https://github.com/Md-Sufian-Jidan/work-nest-client)

---

## 🚀 Features

- ⚙️ RESTful API using Express 5
- 🌍 Cross-Origin support via CORS
- 🔐 Secured routes via middleware (role-based logic)
- 🗃 MongoDB Database Integration
- 🧑 Employee & HR Management
- 📄 Work Sheet & Payment History API
- 📬 Contact Us messages endpoint

---

## 🔐 Security

- ✅ **JWT Token Authentication**
- ✅ **`verifyToken` middleware** for all protected routes
- ✅ **`verifyAdmin` middleware** for admin-only endpoints
- ✅ Stripe Payment Integration (with `description`, `payment_method_types`, and `INR` currency)

---

## 🧰 Tech Stack

| Dependency                | Purpose                          |
|---------------------------|----------------------------------|
| **Express.js**            | HTTP server and routing          |
| **MongoDB v6**            | Database connection and queries  |
| **JWT (jsonwebtoken)**    | Token-based authentication       |
| **CORS**                  | Cross-origin access              |
| **Dotenv**                | Manage secret keys and config    |
| **Stripe SDK v18**        | Payment processing               |


---

## 🔐 Environment Variables

Create a `.env` file in the root of your `/server` folder:

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Md-Sufian-Jidan/work-nest-server.git

# Move into the project
cd work-nest-server

# Install dependencies
npm install

# Add your MongoDB credentials to .env
cp .env.example .env

# Run the server
node index.js

✅ Server is running on port 5000
🗄️ Connected to MongoDB
