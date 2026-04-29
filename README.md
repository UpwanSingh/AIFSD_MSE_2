# Student Grievance Management System (MERN)

This project is implemented as per the provided exam case study using MERN stack.

## Project Structure

- backend: Node.js + Express + MongoDB APIs
- frontend: React (Vite) UI
- render.yaml: Render deployment blueprint

## Backend Features

### MongoDB Schemas
- Student
  - name
  - email (unique)
  - password (hashed with bcrypt)
- Grievance
  - title
  - description
  - category (Academic / Hostel / Transport / Other)
  - date
  - status (Pending / Resolved)
  - student reference

### Auth APIs
- POST /api/register
- POST /api/login

### Grievance APIs (JWT Protected)
- POST /api/grievances
- GET /api/grievances
- GET /api/grievances/:id
- PUT /api/grievances/:id
- DELETE /api/grievances/:id
- GET /api/grievances/search?title=xyz

### Error Handling Included
- Invalid login
- Duplicate email
- Unauthorized access

## Frontend Features

- Registration Form
- Login Form
- Protected Dashboard
- Submit grievance
- View all grievances
- Search grievance by title
- Update/Delete grievance
- Logout

## Local Setup

### 1) Backend
1. Go to backend folder.
2. Copy .env.example to .env
3. Set values:
   - MONGO_URI
   - JWT_SECRET
4. Run:
   - npm install
   - npm run dev

Backend runs on http://localhost:5000

### 2) Frontend
1. Go to frontend folder.
2. Copy .env.example to .env
3. Set:
   - VITE_API_BASE_URL=http://localhost:5000/api
4. Run:
   - npm install
   - npm run dev

Frontend runs on http://localhost:5173

## Render Deployment

You can deploy both services using render.yaml:

1. Push project to GitHub.
2. In Render, create Blueprint from the GitHub repo.
3. Set environment variables:
   - backend: MONGO_URI, JWT_SECRET
   - frontend: VITE_API_BASE_URL (set to deployed backend URL + /api)
4. Deploy both services.

### Important for MongoDB Atlas on Render

- In [render.yaml](render.yaml), `MONGO_URI` uses `sync: false`, so Render will not auto-update it from repo changes.
- Update `MONGO_URI` manually in Render service environment variables after password changes.
- If MongoDB password has special characters (`@`, `:`, `/`, `?`, `#`), URL-encode the password in the URI.

## Submission Checklist (as per question)

Include in your report PDF:
- Source code
- Output screenshots
- Postman/Thunder request screenshots for all endpoints
- MongoDB storage screenshots
- Render deployment success screenshot
- Live URL testing for each endpoint
