# AI Driven Full Stack Development (AI308B)
## Moodle MSE2 Submission

### Student Details
- Name: Upwan Singh
- Branch: CSEAIML
- Roll Number: 202401100400200
- Section: C
- Shift: 2nd
- Case Study Name: Student Grievance Management System

---

## 1. GitHub Repository Link
- https://github.com/UpwanSingh/AIFSD_MSE_2

---

## 2. Render Deployment Links

### Backend Deployment Link
- https://student-grievance-backend-mfqb.onrender.com

### Frontend Deployment Link
- https://student-grievance-frontend-od85.onrender.com

### Live Backend Routes
- GET Health: https://student-grievance-backend-mfqb.onrender.com/
- POST Register: https://student-grievance-backend-mfqb.onrender.com/api/register
- POST Login: https://student-grievance-backend-mfqb.onrender.com/api/login
- POST Submit Grievance: https://student-grievance-backend-mfqb.onrender.com/api/grievances
- GET All Grievances: https://student-grievance-backend-mfqb.onrender.com/api/grievances
- GET Grievance by ID: https://student-grievance-backend-mfqb.onrender.com/api/grievances/:id
- PUT Update Grievance: https://student-grievance-backend-mfqb.onrender.com/api/grievances/:id
- DELETE Grievance: https://student-grievance-backend-mfqb.onrender.com/api/grievances/:id
- GET Search by Title: https://student-grievance-backend-mfqb.onrender.com/api/grievances/search?title=xyz

---

## 3. Project Code Used in Development

### Backend Code Files
- [backend/src/server.js](backend/src/server.js)
- [backend/src/models/Student.js](backend/src/models/Student.js)
- [backend/src/models/Grievance.js](backend/src/models/Grievance.js)
- [backend/src/routes/authRoutes.js](backend/src/routes/authRoutes.js)
- [backend/src/routes/grievanceRoutes.js](backend/src/routes/grievanceRoutes.js)
- [backend/src/middleware/authMiddleware.js](backend/src/middleware/authMiddleware.js)
- [backend/package.json](backend/package.json)
- [backend/.env.example](backend/.env.example)

### Frontend Code Files
- [frontend/src/App.jsx](frontend/src/App.jsx)
- [frontend/src/main.jsx](frontend/src/main.jsx)
- [frontend/src/pages/DashboardPage.jsx](frontend/src/pages/DashboardPage.jsx)
- [frontend/src/pages/LoginPage.jsx](frontend/src/pages/LoginPage.jsx)
- [frontend/src/pages/RegisterPage.jsx](frontend/src/pages/RegisterPage.jsx)
- [frontend/src/components/ProtectedRoute.jsx](frontend/src/components/ProtectedRoute.jsx)
- [frontend/src/api.js](frontend/src/api.js)
- [frontend/src/styles.css](frontend/src/styles.css)
- [frontend/package.json](frontend/package.json)

---

## 4. Screenshots of Login, Register, Dashboard and All Functional Modules

### Auto-captured UI screenshots

1. Register Page (UI)
![Register Page](evidence/screenshots/01_register_page.png)

2. Register Success
![Register Success](evidence/screenshots/02_register_success.png)

3. Login Page (UI)
![Login Page](evidence/screenshots/03_login_page.png)

4. Dashboard Page (UI)
![Dashboard Page](evidence/screenshots/04_dashboard_page.png)

5. Submit Grievance (successful)
![Submit Grievance](evidence/screenshots/05_submit_grievance_success.png)

6. Search Grievance
![Search Grievance](evidence/screenshots/06_search_grievance.png)

7. Update Grievance
![Update Grievance](evidence/screenshots/07_update_grievance.png)

8. Delete Grievance
![Delete Grievance](evidence/screenshots/08_delete_grievance.png)

9. Logout
![Logout](evidence/screenshots/09_logout_to_login.png)

### Add these remaining screenshots manually before final PDF export:
10. API testing screenshots (Postman/Thunder Client)
11. Error handling screenshots:
   - Invalid login
   - Duplicate email
   - Unauthorized access
12. MongoDB data storage screenshot (students + grievances collections)

### User-uploaded screenshots found in project folder

13. Uploaded Screenshot 1
![Uploaded Screenshot 1](Screenshot%202026-04-23%20at%204.10.08%E2%80%AFPM.png)

14. Uploaded Screenshot 2
![Uploaded Screenshot 2](Screenshot%202026-04-23%20at%204.10.29%E2%80%AFPM.png)

15. Uploaded Screenshot 3
![Uploaded Screenshot 3](Screenshot%202026-04-23%20at%204.18.42%E2%80%AFPM.png)

API evidence file generated:
- [evidence/API_TEST_RESULTS.md](evidence/API_TEST_RESULTS.md)

---

## 5. Screenshot of VS Code Project Structure

Add one screenshot from VS Code Explorer showing folder structure including:
- backend
- frontend
- evidence
- render.yaml
- README.md

If one of the uploaded screenshots is the VS Code structure image, keep it under this section in final PDF.

---

## Notes
- Project strictly follows required MERN APIs and functionality from the question paper.
- Password hashing done using bcrypt.
- JWT authentication used for protected grievance routes.
- Deployment configured for both backend and frontend on Render.
