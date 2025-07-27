# API Testing Guide - Rapid Tasks
## Postman Collection for COMP229 Group 3

### 🚀 Getting Started

#### Prerequisites
1. **Backend server running** on `http://localhost:4000`
2. **MongoDB** connected and running
3. **Postman** installed

#### Start the Backend Server
```bash
cd rapid-tasks-server
npm run dev
```

---

## 📋 API Endpoints to Test

### 1. Authentication Endpoints

#### 1.1 User Registration
**POST** `http://localhost:4000/api/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64b8f123456789abcdef0123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "user"
  }
}
```

#### 1.2 User Login
**POST** `http://localhost:4000/api/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64b8f123456789abcdef0123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "user"
  }
}
```

#### 1.3 Get User Profile
**GET** `http://localhost:4000/api/profile`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "64b8f123456789abcdef0123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "user",
    "createdAt": "2025-07-27T10:00:00.000Z",
    "updatedAt": "2025-07-27T10:00:00.000Z"
  }
}
```

---

### 2. Task Management Endpoints

#### 2.1 Create Task
**POST** `http://localhost:4000/api/tasks`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "title": "Complete Project Documentation",
  "description": "Finish the external design document and API testing",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2025-07-30",
  "tags": ["project", "documentation"]
}
```

**Expected Response (201):**
```json
{
  "message": "Task created successfully",
  "data": {
    "_id": "64b8f123456789abcdef0124",
    "title": "Complete Project Documentation",
    "description": "Finish the external design document and API testing",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2025-07-30T00:00:00.000Z",
    "tags": ["project", "documentation"],
    "userId": "64b8f123456789abcdef0123",
    "isArchived": false,
    "createdAt": "2025-07-27T10:30:00.000Z",
    "updatedAt": "2025-07-27T10:30:00.000Z"
  }
}
```

#### 2.2 Get All Tasks
**GET** `http://localhost:4000/api/tasks`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Query Parameters (Optional):**
```
?status=Pending&priority=High&page=1&limit=10&sortBy=dueDate&sortOrder=asc
```

**Expected Response (200):**
```json
{
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "_id": "64b8f123456789abcdef0124",
      "title": "Complete Project Documentation",
      "description": "Finish the external design document and API testing",
      "status": "Pending",
      "priority": "High",
      "dueDate": "2025-07-30T00:00:00.000Z",
      "tags": ["project", "documentation"],
      "userId": "64b8f123456789abcdef0123",
      "isArchived": false,
      "createdAt": "2025-07-27T10:30:00.000Z",
      "updatedAt": "2025-07-27T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalTasks": 1,
    "tasksPerPage": 10
  }
}
```

#### 2.3 Get Single Task
**GET** `http://localhost:4000/api/tasks/{taskId}`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "message": "Task retrieved successfully",
  "data": {
    "_id": "64b8f123456789abcdef0124",
    "title": "Complete Project Documentation",
    "description": "Finish the external design document and API testing",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2025-07-30T00:00:00.000Z",
    "tags": ["project", "documentation"],
    "userId": "64b8f123456789abcdef0123",
    "isArchived": false,
    "createdAt": "2025-07-27T10:30:00.000Z",
    "updatedAt": "2025-07-27T10:30:00.000Z"
  }
}
```

#### 2.4 Update Task
**PUT** `http://localhost:4000/api/tasks/{taskId}`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "title": "Complete Project Documentation - Updated",
  "description": "Finish the external design document, API testing, and video",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2025-07-29",
  "tags": ["project", "documentation", "video"]
}
```

**Expected Response (200):**
```json
{
  "message": "Task updated successfully",
  "data": {
    "_id": "64b8f123456789abcdef0124",
    "title": "Complete Project Documentation - Updated",
    "description": "Finish the external design document, API testing, and video",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2025-07-29T00:00:00.000Z",
    "tags": ["project", "documentation", "video"],
    "userId": "64b8f123456789abcdef0123",
    "isArchived": false,
    "createdAt": "2025-07-27T10:30:00.000Z",
    "updatedAt": "2025-07-27T11:00:00.000Z"
  }
}
```

#### 2.5 Delete Task
**DELETE** `http://localhost:4000/api/tasks/{taskId}`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully",
  "data": {
    "id": "64b8f123456789abcdef0124"
  }
}
```

#### 2.6 Get Task Statistics
**GET** `http://localhost:4000/api/tasks/stats`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "message": "Task statistics retrieved successfully",
  "data": {
    "total": 5,
    "pending": 2,
    "inProgress": 2,
    "completed": 1,
    "overdue": 1
  }
}
```

---

### 3. User Management (Admin Only)

**Admin Credentials:**
- Email: `admin@rapidtasks.com`
- Password: `admin123`

**Important:** You must login as admin first to get the admin JWT token!

#### 3.0 Admin Login
**POST** `http://localhost:4000/api/login`

**Body (JSON):**
```json
{
  "email": "admin@rapidtasks.com",
  "password": "admin123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "688662a5bf8e5c4b1643ef99",
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@rapidtasks.com",
    "fullName": "Admin User",
    "role": "admin"
  }
}
```

**⚠️ Verify the `role` field shows `"admin"`!**

#### 3.1 Get All Users
**GET** `http://localhost:4000/api/users`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN_FROM_STEP_3.0
```

**Expected Response (200):**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "64b8f123456789abcdef0123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-07-27T10:00:00.000Z",
      "updatedAt": "2025-07-27T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalUsers": 1,
    "usersPerPage": 10
  }
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete User Journey
1. **Register** a new user
2. **Login** with the credentials
3. **Create** 2-3 tasks with different statuses
4. **Get** all tasks
5. **Update** one task status
6. **Get** task statistics
7. **Delete** one task

### Scenario 2: Error Handling
1. **Register** with invalid email → Should return 400
2. **Login** with wrong password → Should return 401
3. **Access** protected route without token → Should return 401
4. **Create** task with invalid data → Should return 400
5. **Get** non-existent task → Should return 404

### Scenario 3: Edge Cases
1. **Create** task without optional fields
2. **Update** task with partial data
3. **Get** tasks with various query parameters
4. **Login** with non-existent user

---

## 📝 Postman Collection JSON

Here's a ready-to-import Postman collection:

```json
{
  "info": {
    "name": "Rapid Tasks API",
    "description": "COMP229 Group 3 - Task Management API Testing",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:4000/api"
    },
    {
      "key": "authToken",
      "value": "",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"email\": \"john.doe@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/register",
              "host": ["{{baseUrl}}"],
              "path": ["register"]
            }
          }
        },
        {
          "name": "Login User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john.doe@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/login",
              "host": ["{{baseUrl}}"],
              "path": ["login"]
            }
          }
        },
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/profile",
              "host": ["{{baseUrl}}"],
              "path": ["profile"]
            }
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Complete Project Documentation\",\n  \"description\": \"Finish the external design document and API testing\",\n  \"status\": \"Pending\",\n  \"priority\": \"High\",\n  \"dueDate\": \"2025-07-30\",\n  \"tags\": [\"project\", \"documentation\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/tasks",
              "host": ["{{baseUrl}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/tasks",
              "host": ["{{baseUrl}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Get Task by ID",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/tasks/:taskId",
              "host": ["{{baseUrl}}"],
              "path": ["tasks", ":taskId"]
            }
          }
        },
        {
          "name": "Update Task",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Complete Project Documentation - Updated\",\n  \"description\": \"Finish the external design document, API testing, and video\",\n  \"status\": \"In Progress\",\n  \"priority\": \"High\",\n  \"dueDate\": \"2025-07-29\",\n  \"tags\": [\"project\", \"documentation\", \"video\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/tasks/:taskId",
              "host": ["{{baseUrl}}"],
              "path": ["tasks", ":taskId"]
            }
          }
        },
        {
          "name": "Delete Task",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/tasks/:taskId",
              "host": ["{{baseUrl}}"],
              "path": ["tasks", ":taskId"]
            }
          }
        },
        {
          "name": "Get Task Statistics",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{authToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/tasks/stats",
              "host": ["{{baseUrl}}"],
              "path": ["tasks", "stats"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🔍 Testing Checklist

### Before Testing:
- [ ] Backend server is running (`npm run dev`)
- [ ] MongoDB is connected
- [ ] Postman is installed and ready

### Authentication Tests:
- [ ] User registration works with valid data
- [ ] User registration fails with invalid email
- [ ] User registration fails with duplicate email
- [ ] User login works with correct credentials
- [ ] User login fails with wrong password
- [ ] Protected routes require authentication
- [ ] JWT token is properly returned

### Task CRUD Tests:
- [ ] Create task with all fields
- [ ] Create task with minimal fields
- [ ] Get all tasks returns user's tasks only
- [ ] Get single task by ID works
- [ ] Update task modifies correctly
- [ ] Delete task removes from database
- [ ] Task statistics are accurate

### Error Handling Tests:
- [ ] 400 errors for invalid input
- [ ] 401 errors for unauthorized access
- [ ] 404 errors for not found resources
- [ ] 500 errors are handled gracefully

---

## 📊 Test Results Template

Document your test results like this:

| Endpoint | Method | Expected Status | Actual Status | Pass/Fail | Notes |
|----------|--------|----------------|---------------|-----------|-------|
| /api/register | POST | 201 | 201 | ✅ Pass | User created successfully |
| /api/login | POST | 200 | 200 | ✅ Pass | Token received |
| /api/tasks | GET | 200 | 200 | ✅ Pass | Tasks retrieved |
| /api/tasks | POST | 201 | 201 | ✅ Pass | Task created |
| /api/tasks/:id | PUT | 200 | 200 | ✅ Pass | Task updated |
| /api/tasks/:id | DELETE | 200 | 200 | ✅ Pass | Task deleted |

---

**Ready to test!** Start your backend server and begin with the authentication endpoints. Let me know if you need help with any specific tests!
