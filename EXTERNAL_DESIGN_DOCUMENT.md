# External Design Document v.1
## Rapid Tasks - Task Management Application

**Team:** COMP229 Group 3  
**Course:** COMP229 - Web Application Development  
**Institution:** Centennial College  
**Semester:** Summer 2025

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Team Information](#2-team-information)
3. [System Architecture](#3-system-architecture)
4. [Database Design](#4-database-design)
5. [API Documentation](#5-api-documentation)
6. [User Interface Wireframes](#6-user-interface-wireframes)
7. [Current Screenshots](#7-current-screenshots)
8. [Technology Stack](#8-technology-stack)
9. [Development Progress](#9-development-progress)

---

## 1. Project Overview

**Project Name:** Rapid Tasks  
**Project Type:** Task Management Application  
**Logo:** [Insert Rapid Tasks Logo Here]

### Purpose
Rapid Tasks is a full-stack web application designed to help users manage their daily tasks efficiently. The application provides a comprehensive task management system with user authentication, CRUD operations, and task tracking capabilities.

### Key Features
- User registration and authentication
- Create, read, update, and delete tasks
- Task status management (Pending, In Progress, Completed)
- Due date tracking
- User profile management
- Secure authentication with JWT tokens

### Target Users
- Students managing academic tasks
- Professionals organizing work projects
- Anyone needing personal task organization

---

## 2. Team Information

**Team Name:** COMP229 Group 3

### Team Members
| Name | Student ID | Role | GitHub Username |
|------|------------|------|-----------------|
| Marcel Borkowski | 301488651 | Full-Stack Developer | Sataniachia |
| [Team Member 2] | [ID] | [Role] | [Username] |
| [Team Member 3] | [ID] | [Role] | [Username] |

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
`http://localhost:4000/api`

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
- [x] Express backend server with MVC architecture
- [x] MongoDB database connection and models
- [x] User authentication system (register/login)
- [x] JWT token-based authorization
- [x] Password hashing and security
- [x] Complete CRUD API endpoints for tasks
- [x] React frontend application
- [x] User registration and login UI
- [x] Task creation and viewing interface
- [x] API integration between frontend and backend

### Current Functionality
1. **User Management**
   - User registration with validation
   - Secure login with JWT tokens
   - Password hashing with bcrypt

2. **Task Management**
   - Create new tasks
   - View all user tasks
   - Task status tracking
   - Due date management

3. **API Testing**
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

## Repository Information

**GitHub Repository:** https://github.com/Sataniachia/COMP229Group-3

**Project Structure:**
```
COMP229Group-3/
├── rapid-tasks-client/     # React frontend
├── rapid-tasks-server/     # Express backend
├── README.md              # Project documentation
├── TEAM_SETUP.md         # Setup instructions
└── CONTRIBUTING.md       # Contribution guidelines
```

---

**Document Version:** 1.0  
**Last Updated:** July 27, 2025  
**Prepared by:** COMP229 Group 3
