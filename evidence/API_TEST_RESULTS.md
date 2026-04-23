# API Test Evidence

Generated: 2026-04-23T09:33:01.065Z

## POST http://localhost:5001/api/register
Status: 201

```json
{
  "message": "Registration successful",
  "student": {
    "id": "69e9e74b6969bc154e41fa41",
    "name": "Demo Student",
    "email": "student_1776936779552@example.com"
  }
}
```

## POST http://localhost:5001/api/register
Status: 409

```json
{
  "message": "Duplicate email"
}
```

## POST http://localhost:5001/api/login
Status: 401

```json
{
  "message": "Invalid login"
}
```

## POST http://localhost:5001/api/login
Status: 200

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTllNzRiNjk2OWJjMTU0ZTQxZmE0MSIsIm5hbWUiOiJEZW1vIFN0dWRlbnQiLCJlbWFpbCI6InN0dWRlbnRfMTc3NjkzNjc3OTU1MkBleGFtcGxlLmNvbSIsImlhdCI6MTc3NjkzNjc4MCwiZXhwIjoxNzc3MDIzMTgwfQ.WbL_fIxVsoFsNkohyp0ZFuK61eVGLCXwsfiK24kfK0g",
  "student": {
    "id": "69e9e74b6969bc154e41fa41",
    "name": "Demo Student",
    "email": "student_1776936779552@example.com"
  }
}
```

## GET http://localhost:5001/api/grievances
Status: 401

```json
{
  "message": "Unauthorized access"
}
```

## POST http://localhost:5001/api/grievances
Status: 201

```json
{
  "message": "Grievance submitted",
  "grievance": {
    "title": "Mess food issue",
    "description": "Food quality needs improvement.",
    "category": "Hostel",
    "status": "Pending",
    "student": "69e9e74b6969bc154e41fa41",
    "_id": "69e9e74c6969bc154e41fa46",
    "date": "2026-04-23T09:33:00.364Z",
    "createdAt": "2026-04-23T09:33:00.364Z",
    "updatedAt": "2026-04-23T09:33:00.364Z",
    "__v": 0
  }
}
```

## GET http://localhost:5001/api/grievances
Status: 200

```json
[
  {
    "_id": "69e9e74c6969bc154e41fa46",
    "title": "Mess food issue",
    "description": "Food quality needs improvement.",
    "category": "Hostel",
    "status": "Pending",
    "student": "69e9e74b6969bc154e41fa41",
    "date": "2026-04-23T09:33:00.364Z",
    "createdAt": "2026-04-23T09:33:00.364Z",
    "updatedAt": "2026-04-23T09:33:00.364Z",
    "__v": 0
  }
]
```

## GET http://localhost:5001/api/grievances/69e9e74c6969bc154e41fa46
Status: 200

```json
{
  "_id": "69e9e74c6969bc154e41fa46",
  "title": "Mess food issue",
  "description": "Food quality needs improvement.",
  "category": "Hostel",
  "status": "Pending",
  "student": "69e9e74b6969bc154e41fa41",
  "date": "2026-04-23T09:33:00.364Z",
  "createdAt": "2026-04-23T09:33:00.364Z",
  "updatedAt": "2026-04-23T09:33:00.364Z",
  "__v": 0
}
```

## PUT http://localhost:5001/api/grievances/69e9e74c6969bc154e41fa46
Status: 200

```json
{
  "message": "Grievance updated",
  "grievance": {
    "_id": "69e9e74c6969bc154e41fa46",
    "title": "Mess food issue resolved",
    "description": "Food quality needs improvement.",
    "category": "Hostel",
    "status": "Resolved",
    "student": "69e9e74b6969bc154e41fa41",
    "date": "2026-04-23T09:33:00.364Z",
    "createdAt": "2026-04-23T09:33:00.364Z",
    "updatedAt": "2026-04-23T09:33:00.715Z",
    "__v": 0
  }
}
```

## GET http://localhost:5001/api/grievances/search?title=mess
Status: 200

```json
[
  {
    "_id": "69e9e74c6969bc154e41fa46",
    "title": "Mess food issue resolved",
    "description": "Food quality needs improvement.",
    "category": "Hostel",
    "status": "Resolved",
    "student": "69e9e74b6969bc154e41fa41",
    "date": "2026-04-23T09:33:00.364Z",
    "createdAt": "2026-04-23T09:33:00.364Z",
    "updatedAt": "2026-04-23T09:33:00.715Z",
    "__v": 0
  }
]
```

## DELETE http://localhost:5001/api/grievances/69e9e74c6969bc154e41fa46
Status: 200

```json
{
  "message": "Grievance deleted"
}
```
