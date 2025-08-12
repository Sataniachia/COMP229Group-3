# External Design Document (EDD) v.1

**Project:** Rapid Tasks - Task Management Application  
**Team:** COMP229 Group 3  
**Course:** COMP229 - Web Application Development  
**Date:** August 2025

---

## Table of Contents

1. [Team Information](#1-team-information)
2. [Team Logo](#2-team-logo)
3. [Project Overview](#3-project-overview)
4. [Wireframes](#4-wireframes)
5. [Initial Screenshots](#5-initial-screenshots)
6. [Database Design](#6-database-design)
7. [Technical Implementation](#7-technical-implementation)

---

## 1. Team Information

**Team Name:** COMP229 Group 3  
**Team Members:** 4 students  
**Project Type:** Task Management Application  
**GitHub Repository:** COMP229Group-3  

---

## 2. Team Logo

```
 ____             _     _   _____         _        
|  _ \ __ _ _ __ (_) __| | |_   _|_ _ ___| | _____ 
| |_) / _` | '_ \| |/ _` |   | |/ _` / __| |/ / __|
|  _ < (_| | |_) | | (_| |   | | (_| \__ \   <\__ \
|_| \_\__,_| .__/|_|\__,_|   |_|\__,_|___/_|\_\___/
           |_|                                     

        RAPID TASKS
    Task Management System
```

---

## 3. Project Overview

### Application Type
Task Management Application - allows users to create, manage, and track personal tasks.

### Core Object: TASK
Our application's main data object is the **Task**, which includes:
- Task title and description
- Priority levels (Low, Medium, High, Urgent)
- Status tracking (Pending, In Progress, Completed)
- Due date management
- User assignment

### Key Features Implemented
- ✅ User registration and authentication
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ User authentication and authorization
- ✅ Database with User and Task collections
- ✅ Express.js backend with MVC structure
- ✅ Basic functional frontend (React)

**Development Note:** We initially built the application using separate rapid-tasks-client and rapid-tasks-server directories. During development, we migrated all code to the mern_skeleton structure to comply with COMP229 assignment requirements and improve project organization.

### Recent Update (Aug 12, 2025)
- Fixed login persistence issue (token now stored consistently on both login and registration).
- Added granular authentication error responses (user not found vs. incorrect password vs. email in use).
- Added lightweight `/api/ping` endpoint and frontend API status badge.
- Registration now auto-authenticates with returned token.

### Development Team Contributions

**Marcel Borkowski:**
- Complete backend architecture and API development
- MongoDB Atlas integration and database design
- Authentication system with JWT tokens and bcryptjs
- All CRUD operations for tasks and users
- Express.js MVC structure implementation
- Bug fixes and debugging throughout development
- Project migration and restructuring to mern_skeleton
- Server configuration and deployment setup

**Yiwei Li:**
- Initial React frontend components (AddTask.jsx, Login.jsx, Tasks.jsx)
- Original Navbar component design and implementation
- Home page with team logo integration
- Profile page for user management
- Frontend styling and layout
- Team logo creation and asset management
- Early project structure and organization

---

## 4. Wireframes

### Login Page
```
+---------------------------+
|        RAPID TASKS        |
|     Task Management       |
+---------------------------+
|                           |
|    [Login Form]           |
|    Email: [_________]     |
|    Password: [_______]    |
|    [Login Button]         |
|                           |
|    "Don't have account?"  |
|    [Register Link]        |
+---------------------------+
```

### Registration Page
```
+---------------------------+
|        RAPID TASKS        |
|     Create Account        |
+---------------------------+
|                           |
|    Name: [____________]   |
|    Email: [___________]   |
|    Password: [________]   |
|    Confirm: [_________]   |
|    [Register Button]      |
|                           |
|    "Already have account?"|
|    [Login Link]           |
+---------------------------+
```

### Task List Page (Main Dashboard)
```
+---------------------------+
|   RAPID TASKS - Dashboard |
|   Welcome, [User Name]    |
+---------------------------+
|  [+ Add New Task] [Logout]|
+---------------------------+
|                           |
|  📋 My Tasks              |
|                           |
|  □ Task 1: Study for exam |
|    Priority: High         |
|    Due: Aug 10, 2025      |
|    [Edit] [Delete]        |
|                           |
|  ✓ Task 2: Complete proj  |
|    Priority: Medium       |
|    Status: Completed      |
|    [Edit] [Delete]        |
|                           |
|  □ Task 3: Buy groceries  |
|    Priority: Low          |
|    Due: Aug 8, 2025       |
|    [Edit] [Delete]        |
+---------------------------+
```

### Add/Edit Task Page
```
+---------------------------+
|      ADD NEW TASK         |
+---------------------------+
|                           |
|  Title: [_____________]   |
|                           |
|  Description:             |
|  [___________________]    |
|  [___________________]    |
|                           |
|  Priority: [▼ Medium  ]   |
|  Status:   [▼ Pending ]   |
|  Due Date: [📅 Pick Date] |
|                           |
|  [Save Task] [Cancel]     |
+---------------------------+
```

---

## 5. Initial Screenshots

### Current Implementation Status
**Project Part 2 (Current Release) - COMPLETED ✅**

#### Backend Implementation:
- MongoDB database with User and Task collections (Marcel Borkowski)
- Express.js server with MVC architecture (Marcel Borkowski)
- RESTful API endpoints for authentication and tasks (Marcel Borkowski)
- JWT-based authentication system (Marcel Borkowski)
- Password hashing and security (Marcel Borkowski)

#### Frontend Implementation:
- React application with component-based architecture (Yiwei Li - initial structure, Marcel Borkowski - integration & fixes)
- User registration and login pages (Yiwei Li - original components, Marcel Borkowski - API integration)
- Task list view and management (Yiwei Li - UI components, Marcel Borkowski - backend integration)
- Add/Edit task forms (Yiwei Li - initial forms, Marcel Borkowski - functionality)
- Home page with team logo (Yiwei Li)
- Profile management page (Yiwei Li)
- Navigation bar with logo integration (Yiwei Li)
- Basic styling (functional, not focused on design)

#### API Endpoints Created:
- `POST /api/auth/register` - User registration (Marcel Borkowski)
- `POST /api/auth/login` - User login (Marcel Borkowski)
- `GET /api/tasks` - Get user tasks (Marcel Borkowski)
- `POST /api/tasks` - Create new task (Marcel Borkowski)
- `PUT /api/tasks/:id` - Update task (Marcel Borkowski)
- `DELETE /api/tasks/:id` - Delete task (Marcel Borkowski)

---

## 6. Database Design

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (pending, in-progress, completed),
  priority: String (low, medium, high, urgent),
  dueDate: Date,
  tags: [String],
  user: ObjectId (reference to Users),
  isArchived: Boolean,
  createdAt: Date,
  updatedAt: Date,
  completedDate: Date
}
```

---

## 7. Technical Implementation

### Technology Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React, React Router, Axios
- **Authentication:** JWT tokens, bcryptjs
- **Development:** Vite, Nodemon, ESLint

### MVC Architecture
- **Models:** User.model.js, Task.model.js (Marcel Borkowski)
- **Views:** React components (Yiwei Li - initial structure, Marcel Borkowski - integration)
- **Controllers:** auth.controller.js, task.controller.js (Marcel Borkowski)
- **Routes:** auth.routes.js, task.routes.js (Marcel Borkowski)

### CRUD Operations Implemented
- **Create:** New tasks and user accounts (Marcel Borkowski - backend, Yiwei Li - frontend forms)
- **Read:** View all user tasks and user profile (Marcel Borkowski - API, Yiwei Li - UI components)
- **Update:** Edit task details and status (Marcel Borkowski)
- **Delete:** Remove tasks from system (Marcel Borkowski)

---

## Project Status

**Release 1 (Project Part 2): COMPLETE ✅**
- All backend APIs functional
- Basic frontend operational
- User authentication working
- Task CRUD operations complete
- Database properly structured

**Next Release (Project Part 3): IN PROGRESS ✅**
- Home/Landing page with team logo (Yiwei Li - ✅ COMPLETED)
- Enhanced navigation bar (Yiwei Li - ✅ COMPLETED)
- Profile management (Yiwei Li - ✅ COMPLETED)
- Edit and delete task functionality (Marcel Borkowski - PLANNED)
- Task filtering and search (PLANNED)
- Dashboard with statistics (PLANNED)
- Improved UI/UX design (PLANNED)

**Final Release (Project Part 4): FUTURE**
- Visual design improvements
- Cloud deployment
- Testing implementation
- CI/CD pipeline

---

**Document Version:** 1.0  
**Last Updated:** August 2025  
**Prepared by:** COMP229 Group 3

### Gap & Action Summary (Aug 12, 2025)
Part 2 Outstanding Evidence To Add:
- Postman API test screenshots (to capture CRUD + auth) – Assigned: Marcel (capture) / Yuchen (embed)
- Demo video (5–10 min) – Assigned: Rohit & Yuchen (record, voiceover)

Part 3 Remaining Functional Items:
- Edit Task UI finalization (PB-017) – In progress
- Task statistics endpoint + UI (PB-011) – Planned (Rohit)
- Task filtering/search (PB-010) – In progress

Part 4 Preparation Tasks (Early Planning):
- Unit test harness (Jest for backend, React Testing Library for frontend) – Rohit
- Cypress E2E baseline scripts – Rohit
- Deployment target decision (Render / Railway / Vercel backend + Mongo Atlas) – Rohit
- CI/CD (GitHub Actions basic pipeline) – Yuchen
- Visual design pass & responsive polish – Yuchen
- Accessibility checklist (WCAG quick audit) – Yuchen

Risks:
- Low contribution from two members historically – mitigation: clearly assigned deliverables above.
- Testing & deployment time crunch – mitigation: start scaffolding tests before feature freeze.

**Team Name:** COMP229 Group 3

### Team Members & Contributions
| Name | Student ID | Role | GitHub Username | Primary Contributions |
|------|------------|------|-----------------|----------------------|
| Marcel Borkowski | 301488651 | Full-Stack Developer | Sataniachia | Backend architecture, MongoDB integration, authentication system, API development, task CRUD operations, debugging, project migration to MERN structure |
| Yiwei Li | [ID] | Frontend Developer | [Username] | Initial React components, Home page, Profile page, Navbar component, team logo integration, frontend styling, early project structure |
| Rohit Luitel | [ID] | Testing & Deployment Lead (Assigned Part 4 tasks) | [Username] | To produce Part 2 & 3 demo videos, upcoming unit/E2E test implementation, deployment & performance tasks |
| Yuchen Jiang | [ID] | Documentation & QA (Assigned Part 4 tasks) | [Username] | To produce Part 2 & 3 demo videos, backlog maintenance, final EDD polish, accessibility & CI/CD documentation |

**Team Logo:** [Insert Team Logo Here]

---

## 3. System Architecture

### Architecture Pattern
**MVC (Model-View-Controller)** pattern with separated frontend and backend

### System Components
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   React Client  │ ◄─────────────────► │ Express Server  │
│   (Frontend)    │                     │   (Backend)     │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │ MongoDB Database│
                                        └─────────────────┘
```

### Communication Flow
1. User interacts with React frontend
2. Frontend sends HTTP requests to Express API
3. Express server processes requests using controllers
4. Controllers interact with MongoDB through Mongoose models
5. Response data flows back to frontend for display

---

## 4. Database Design

### Database Technology
**MongoDB** with **Mongoose** ODM

### Collections Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String (required, max: 50),
  lastName: String (required, max: 50),
  email: String (required, unique, validated),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

#### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String (required, max: 100),
  description: String (max: 500),
  status: String (enum: ['Pending', 'In Progress', 'Completed']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  dueDate: Date (optional),
  completedDate: Date (auto-set when completed),
  userId: ObjectId (reference to Users),
  tags: [String],
  isArchived: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Database Relationships
- **One-to-Many:** Users → Tasks
- **Foreign Key:** Tasks.userId references Users._id

---

## 5. API Documentation

### Base URL
`http://localhost:3000/api`

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | User registration | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update profile | Yes |

### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all user tasks | Yes |
| POST | `/tasks` | Create new task | Yes |
| GET | `/tasks/:id` | Get specific task | Yes |
| PUT | `/tasks/:id` | Update task | Yes |
| DELETE | `/tasks/:id` | Delete task | Yes |
| GET | `/tasks/stats` | Get task statistics | Yes |

### User Management (Admin)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin |
| PUT | `/users/:id` | Update user | Admin |
| DELETE | `/users/:id` | Delete user | Admin |

---

## 6. User Interface Wireframes

### 6.1 Login Page
```
┌─────────────────────────────────────┐
│           Rapid Tasks               │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────────────────────┐      │
│    │     Login Form          │      │
│    │                         │      │
│    │  Email: [____________]  │      │
│    │                         │      │
│    │  Password: [_________]  │      │
│    │                         │      │
│    │     [Login Button]      │      │
│    │                         │      │
│    │   Don't have account?   │      │
│    │      [Sign Up]          │      │
│    └─────────────────────────┘      │
└─────────────────────────────────────┘
```

### 6.2 Task Dashboard
```
┌─────────────────────────────────────┐
│  [Logo] Rapid Tasks    [User] [▼]   │
├─────────────────────────────────────┤
│  [Tasks] [Add Task] [Profile]       │
├─────────────────────────────────────┤
│                                     │
│  Your Tasks                         │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Task Title                  │    │
│  │ Description here...         │    │
│  │ Status: Pending             │    │
│  │ Due: 2025-07-30            │    │
│  │           [Edit] [Delete]   │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Another Task                │    │
│  │ Task description...         │    │
│  │ Status: In Progress         │    │
│  │ Due: 2025-08-05            │    │
│  │           [Edit] [Delete]   │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 6.3 Add Task Form
```
┌─────────────────────────────────────┐
│  [Logo] Rapid Tasks    [User] [▼]   │
├─────────────────────────────────────┤
│  [Tasks] [Add Task] [Profile]       │
├─────────────────────────────────────┤
│                                     │
│  Add New Task                       │
│                                     │
│  Title: [_____________________]     │
│                                     │
│  Description:                       │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Status: [Pending ▼]               │
│                                     │
│  Due Date: [____/____/____]        │
│                                     │
│         [Add Task]                  │
└─────────────────────────────────────┘
```

---

## 7. Current Screenshots

### 7.1 Login Page
*[Screenshot of current login page implementation]*

### 7.2 Registration Page
*[Screenshot of current registration page implementation]*

### 7.3 Task List View
*[Screenshot of current task dashboard]*

### 7.4 Add Task Form
*[Screenshot of current add task form]*

---

## 8. Technology Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS-in-JS** - Component styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Database
- **MongoDB** - NoSQL document database

### Development Tools
- **Git** - Version control
- **GitHub** - Repository hosting
- **VS Code** - Development environment
- **Postman** - API testing

---

## 9. Development Progress

### Completed Features ✅
- [x] Express backend server with MVC architecture (Marcel Borkowski)
- [x] MongoDB database connection and models (Marcel Borkowski)
- [x] User authentication system (register/login) (Marcel Borkowski)
- [x] JWT token-based authorization (Marcel Borkowski)
- [x] Password hashing and security (Marcel Borkowski)
- [x] Complete CRUD API endpoints for tasks (Marcel Borkowski)
- [x] React frontend application (Yiwei Li - structure, Marcel Borkowski - integration)
- [x] User registration and login UI (Yiwei Li - components, Marcel Borkowski - functionality)
- [x] Task creation and viewing interface (Yiwei Li - UI, Marcel Borkowski - backend)
- [x] API integration between frontend and backend (Marcel Borkowski)
- [x] Home page with team logo (Yiwei Li)
- [x] Profile management page (Yiwei Li)
- [x] Navigation bar with branding (Yiwei Li)

### Current Functionality
1. **User Management** (Marcel Borkowski)
   - User registration with validation
   - Secure login with JWT tokens
   - Password hashing with bcrypt
   - Profile viewing (Yiwei Li - UI component)

2. **Task Management** (Marcel Borkowski - backend, Yiwei Li - frontend components)
   - Create new tasks
   - View all user tasks
   - Task status tracking
   - Due date management

3. **User Interface** (Yiwei Li)
   - Home page with team branding
   - Navigation bar with logo
   - Profile management interface
   - Responsive layout design

4. **API Testing** (Marcel Borkowski)
   - All endpoints tested and functional
   - Proper error handling
   - Input validation

### Next Phase (Part 3)
- [ ] Edit and delete task functionality
- [ ] Enhanced user interface
- [ ] Task filtering and search
- [ ] Dashboard with statistics
- [ ] Responsive design

---

## 10. API Testing Screenshots

*As required by Project Part 2 specifications, the following screenshots demonstrate our API endpoints working correctly:*

### 10.1 User Registration API Test
**Endpoint:** `POST /api/register`

**Test Data Used:**
```json
{
  "firstName": "Debug",
  "lastName": "User", 
  "email": "debug@rapidtasks.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing successful user registration]*

---

### 10.2 User Login API Test
**Endpoint:** `POST /api/login`

**Test Data Used:**
```json
{
  "email": "debug@rapidtasks.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing successful login with JWT token response]*

---

### 10.3 Create Task API Test
**Endpoint:** `POST /api/tasks`

**Headers Required:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Test Data Used:**
```json
{
  "title": "Complete COMP229 Assignment",
  "description": "Finish the task management application project",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2025-08-15"
}
```

**Expected Response:**
```json
{
  "message": "Task successfully created!",
  "task": {
    "_id": "64f...",
    "title": "Complete COMP229 Assignment",
    "description": "Finish the task management application project",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2025-08-15T00:00:00.000Z",
    "user": "64e...",
    "isArchived": false,
    "createdAt": "2025-08-05T22:45:00.000Z",
    "updatedAt": "2025-08-05T22:45:00.000Z"
  }
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing successful task creation]*

---

### 10.4 Get All Tasks API Test
**Endpoint:** `GET /api/tasks`

**Headers Required:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Expected Response:**
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "_id": "64f...",
      "title": "Complete COMP229 Assignment",
      "description": "Finish the task management application project",
      "status": "Pending",
      "priority": "High",
      "dueDate": "2025-08-15T00:00:00.000Z",
      "user": "64e...",
      "isArchived": false,
      "createdAt": "2025-08-05T22:45:00.000Z",
      "updatedAt": "2025-08-05T22:45:00.000Z"
    }
  ],
  "totalTasks": 1,
  "currentPage": 1,
  "totalPages": 1
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing list of user tasks]*

---

### 10.5 Update Task API Test
**Endpoint:** `PUT /api/tasks/:id`

**Headers Required:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Test Data Used:**
```json
{
  "status": "In Progress",
  "priority": "Medium"
}
```

**Expected Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "64f...",
    "title": "Complete COMP229 Assignment",
    "description": "Finish the task management application project",
    "status": "In Progress",
    "priority": "Medium",
    "dueDate": "2025-08-15T00:00:00.000Z",
    "user": "64e...",
    "isArchived": false,
    "createdAt": "2025-08-05T22:45:00.000Z",
    "updatedAt": "2025-08-05T22:50:00.000Z"
  }
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing successful task update]*

---

### 10.6 Delete Task API Test
**Endpoint:** `DELETE /api/tasks/:id`

**Headers Required:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Expected Response:**
```json
{
  "message": "Task deleted successfully"
}
```

*[Screenshot placeholder: Insert Postman/PowerShell screenshot showing successful task deletion]*

---

### 10.7 Authentication Error Test
**Endpoint:** `POST /api/tasks` (without token)

**Expected Response:**
```json
{
  "message": "Not authorized, token failed",
  "error": "INVALID_TOKEN"
}
```

*[Screenshot placeholder: Insert screenshot showing proper authentication error handling]*

---

## API Testing Summary

**✅ Testing Status:**
- All authentication endpoints tested and working
- All task CRUD endpoints tested and working  
- Proper error handling for invalid requests
- JWT token authentication working correctly
- Database operations confirmed successful
- All required validation rules enforced

**🔧 Testing Tools Used:**
- PowerShell Invoke-RestMethod commands
- VS Code REST Client
- MongoDB Atlas Console for database verification

**📊 Test Results:**
- Registration API: ✅ Working
- Login API: ✅ Working  
- Create Task API: ✅ Working
- Get Tasks API: ✅ Working
- Update Task API: ✅ Working
- Delete Task API: ✅ Working
- Authentication: ✅ Working
- Error Handling: ✅ Working

---

## Repository Information

**GitHub Repository:** https://github.com/Sataniachia/COMP229Group-3

**Development Notes:**
- Project was initially developed in separate rapid-tasks-client and rapid-tasks-server directories
- All code was successfully migrated to mern_skeleton structure to follow COMP229 course requirements
- This migration improved code organization and aligned with assignment specifications

**Project Structure:**
```
COMP229-Project/
├── mern_skeleton/              # Main application (migrated from separate client/server)
│   ├── client/                # React frontend
│   ├── server/                # Express backend
│   ├── config/                # Configuration files
│   └── server.js              # Server entry point
├── EXTERNAL_DESIGN_DOCUMENT.md # This document
├── PRODUCT_BACKLOG_SIMPLE.md   # Project backlog
└── README.md                   # Project documentation
```

---

**Document Version:** 1.1  
**Last Updated:** August 6, 2025  
**Prepared by:** COMP229 Group 3 (Marcel Borkowski & Yiwei Li)
