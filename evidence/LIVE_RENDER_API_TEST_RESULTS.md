# Live Render API Test Evidence

Generated: 2026-04-23T10:24:39.979Z

## GET https://student-grievance-backend-mfqb.onrender.com/
Status: 200

```json
{
  "message": "Student Grievance Management API is running"
}
```

## POST https://student-grievance-backend-mfqb.onrender.com/api/register
Status: 201

```json
{
  "message": "Registration successful",
  "student": {
    "id": "69e9f35f1519a0f9d5231971",
    "name": "Render Demo Student",
    "email": "render_student_1776939870146@example.com"
  }
}
```

## POST https://student-grievance-backend-mfqb.onrender.com/api/register
Status: 409

```json
{
  "message": "Duplicate email"
}
```

## POST https://student-grievance-backend-mfqb.onrender.com/api/login
Status: 401

```json
{
  "message": "Invalid login"
}
```

## POST https://student-grievance-backend-mfqb.onrender.com/api/login
Status: 200

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTlmMzVmMTUxOWEwZjlkNTIzMTk3MSIsIm5hbWUiOiJSZW5kZXIgRGVtbyBTdHVkZW50IiwiZW1haWwiOiJyZW5kZXJfc3R1ZGVudF8xNzc2OTM5ODcwMTQ2QGV4YW1wbGUuY29tIiwiaWF0IjoxNzc2OTM5ODc1LCJleHAiOjE3NzcwMjYyNzV9.WWMw55i0-gz-UYsbLSfGcREF-9mHRj3LMTpcX9Vk8rY",
  "student": {
    "id": "69e9f35f1519a0f9d5231971",
    "name": "Render Demo Student",
    "email": "render_student_1776939870146@example.com"
  }
}
```

## GET https://student-grievance-backend-mfqb.onrender.com/api/grievances
Status: 401

```json
{
  "message": "Unauthorized access"
}
```

## POST https://student-grievance-backend-mfqb.onrender.com/api/grievances
Status: 201

```json
{
  "message": "Grievance submitted",
  "grievance": {
    "title": "Render test grievance",
    "description": "Created by live API evidence script.",
    "category": "Other",
    "status": "Pending",
    "student": "69e9f35f1519a0f9d5231971",
    "_id": "69e9f3641519a0f9d5231976",
    "date": "2026-04-23T10:24:36.275Z",
    "createdAt": "2026-04-23T10:24:36.276Z",
    "updatedAt": "2026-04-23T10:24:36.276Z",
    "__v": 0
  }
}
```

## GET https://student-grievance-backend-mfqb.onrender.com/api/grievances
Status: 200

```json
[
  {
    "_id": "69e9f3641519a0f9d5231976",
    "title": "Render test grievance",
    "description": "Created by live API evidence script.",
    "category": "Other",
    "status": "Pending",
    "student": "69e9f35f1519a0f9d5231971",
    "date": "2026-04-23T10:24:36.275Z",
    "createdAt": "2026-04-23T10:24:36.276Z",
    "updatedAt": "2026-04-23T10:24:36.276Z",
    "__v": 0
  }
]
```

## GET https://student-grievance-backend-mfqb.onrender.com/api/grievances/69e9f3641519a0f9d5231976
Status: 200

```json
{
  "_id": "69e9f3641519a0f9d5231976",
  "title": "Render test grievance",
  "description": "Created by live API evidence script.",
  "category": "Other",
  "status": "Pending",
  "student": "69e9f35f1519a0f9d5231971",
  "date": "2026-04-23T10:24:36.275Z",
  "createdAt": "2026-04-23T10:24:36.276Z",
  "updatedAt": "2026-04-23T10:24:36.276Z",
  "__v": 0
}
```

## PUT https://student-grievance-backend-mfqb.onrender.com/api/grievances/69e9f3641519a0f9d5231976
Status: 200

```json
{
  "message": "Grievance updated",
  "grievance": {
    "_id": "69e9f3641519a0f9d5231976",
    "title": "Render test grievance resolved",
    "description": "Created by live API evidence script.",
    "category": "Other",
    "status": "Resolved",
    "student": "69e9f35f1519a0f9d5231971",
    "date": "2026-04-23T10:24:36.275Z",
    "createdAt": "2026-04-23T10:24:36.276Z",
    "updatedAt": "2026-04-23T10:24:38.125Z",
    "__v": 0
  }
}
```

## GET https://student-grievance-backend-mfqb.onrender.com/api/grievances/search?title=render
Status: 200

```json
[
  {
    "_id": "69e9f3641519a0f9d5231976",
    "title": "Render test grievance resolved",
    "description": "Created by live API evidence script.",
    "category": "Other",
    "status": "Resolved",
    "student": "69e9f35f1519a0f9d5231971",
    "date": "2026-04-23T10:24:36.275Z",
    "createdAt": "2026-04-23T10:24:36.276Z",
    "updatedAt": "2026-04-23T10:24:38.125Z",
    "__v": 0
  }
]
```

## DELETE https://student-grievance-backend-mfqb.onrender.com/api/grievances/69e9f3641519a0f9d5231976
Status: 200

```json
{
  "message": "Grievance deleted"
}
```
