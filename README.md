Developer: Hillary Mukaka
Project Type: Full-stack Web Application
Status: Active / Production-ready

📌 Overview

This project is a complete website for a Taekwondo academy, designed to serve students, parents, and administrators.

It includes:

A public-facing website for visitors

A secure admin dashboard for content management

Backend services for data storage, authentication, and image uploads

The goal was to create a professional, easy-to-manage platform that allows non-technical admins to update content without touching code.

✨ Features
🌍 Public Website

Responsive landing page

About the academy

Coaches section

Events & news updates

Gallery

Contact form

Student registration (Join form)

🔐 Admin Dashboard

Secure authentication (email & password)

Admin-only access control

Manage coaches (add, edit, delete)

Manage events (add, edit, delete)

Upload and update images

View student registrations

Read contact form messages

🖼️ Media Management

Image uploads for coaches and events

Public image access

Admin-only upload permissions

🧱 Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Framer Motion

React Router

Backend

Lovable Cloud Backend

Authentication

Database

Storage

Role-based access control (RLS)

Tooling

Git & GitHub

VS Code

Chrome DevTools

🔐 Security & Roles

Role-based access control (Admin / Public)

Public users:

Can view coaches and events

Can submit forms (students & contact)

Admin users:

Full CRUD access

Image uploads

Dashboard access

Row Level Security (RLS) enabled on all tables

📂 Project Structure (Simplified)
src/
 ├─ components/
 ├─ pages/
 │   ├─ Home
 │   ├─ Auth
 │   ├─ Admin
 │   ├─ Coaches
 │   ├─ Events
 │   └─ Gallery
 ├─ hooks/
 ├─ lib/
 └─ styles/

🚀 Getting Started (Local Development)
# Clone the repository
git clone https://github.com/mukaka-ai/page-reader.git

# Install dependencies
npm install

# Start development server
npm run dev


Backend configuration is handled by Lovable Cloud and does not require manual environment setup.

🛠️ Admin Access

Visit /auth to sign in

Admin users are managed through the backend role system

Visit /admin to access the dashboard (admin-only)

🎯 Project Goals

Build a real-world client-ready website

Implement secure authentication and admin roles

Enable content management without developer involvement

Prepare for deployment and long-term maintenance

📈 Future Improvements

Email notifications for contact & registrations

Analytics dashboard

SEO optimizations

Multi-language support

Payment integration (memberships)

👨‍💻 Author

Hillary Mukaka
Frontend & Backend Web Developer
Passionate about building scalable, real-world solutions.