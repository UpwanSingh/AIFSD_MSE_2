# What to Check (Exam Submission)

## 1) App running
- Frontend opens: http://localhost:5173
- Backend root opens: http://localhost:5001/

## 2) API status checks
- Register -> 201 + "Registration successful"
- Duplicate register -> 409 + "Duplicate email"
- Login -> 200 + token
- Invalid login -> 401 + "Invalid login"
- Unauthorized grievances (no token) -> 401 + "Unauthorized access"
- Submit grievance -> 201
- Get all -> 200
- Get by ID -> 200
- Update -> 200
- Search -> 200
- Delete -> 200

## 3) MongoDB checks
- `students` collection has new user
- `grievances` collection has created item (before delete screenshot)

## 4) Screenshots needed
- Registration success
- Login success
- Each API request/response in Thunder/Postman
- Error cases (duplicate email, invalid login, unauthorized)
- MongoDB document screenshots
- Frontend dashboard features (create/search/update/delete/logout)

## 5) Import-ready file for Postman
- evidence/Student_Grievance_API.postman_collection.json

Import this file in Postman and run requests in order.
