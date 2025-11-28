# UniConnect Backend (NestJS)

This is the backend API for the **UniConnect Community Portal**, built using **NestJS**.  
It provides secure, scalable services for user management, posts, events, and event registration.

---

## 🚀 Features

### 🔐 User Management
- User Registration
- Login with JWT authentication
- Password hashing (bcrypt)
- Role-based access (optional)

### 📝 Posts Module
- Create, read, update, delete posts
- Optional image upload using Multer
- Fetch all posts (public)

### 🎉 Events Module
- Create, read, update, delete events
- RSVP / event registration
- Track registered users
- Capacity control

### 📩 Notifications
- sending new post or events

### 🧱 Architecture
- Fully modular (Users, Auth, Posts, Events)
- Follows NestJS best practices (controllers, services, DTOs)

---

## 🛠 Tech Stack

- NestJS (Node.js Framework)
- TypeScript
- MongoDB + Mongoose
- Class-Validator
- Multer
- Nodemailer (email service)

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/uniconnect-backend.git
