# Product Backlog - COMP229 Group 3
## Rapid Tasks Application

**Project:** Task Management Application  
**Team:** COMP229 Group 3  
**Sprint:** Part B - First Release  
**Date:** July 27, 2025

---

## 📋 Product Backlog Overview

### Project Vision
Create a comprehensive task management application that allows users to efficiently organize, track, and manage their daily tasks with a secure, user-friendly interface.

### Product Goals
- Provide intuitive task management capabilities
- Ensure secure user authentication and data protection
- Deliver responsive and accessible user experience
- Implement robust backend API with proper validation

---

## 🎯 Epic Breakdown

### Epic 1: User Management System
**Description:** Complete user authentication and profile management system

#### User Stories:
1. **User Registration**
   - As a new user, I want to create an account so that I can access the task management system
   - **Acceptance Criteria:**
     - User can register with first name, last name, email, and password
     - Email validation and uniqueness checking
     - Password hashing for security
     - Success/error feedback

2. **User Login**
   - As a registered user, I want to log into my account so that I can access my tasks
   - **Acceptance Criteria:**
     - User can login with email and password
     - JWT token generation and storage
     - Redirect to dashboard on success
     - Error handling for invalid credentials

3. **User Profile Management**
   - As a logged-in user, I want to view and update my profile information
   - **Acceptance Criteria:**
     - Display current user information
     - Edit first name, last name, and email
     - Change password functionality
     - Profile update validation

### Epic 2: Task Management System
**Description:** Core CRUD operations for task management

#### User Stories:
1. **Create Tasks**
   - As a user, I want to create new tasks so that I can track my work
   - **Acceptance Criteria:**
     - Form with title, description, status, and due date
     - Input validation and error handling
     - Task saved to user's account
     - Confirmation of successful creation

2. **View Tasks**
   - As a user, I want to see all my tasks so that I can review my workload
   - **Acceptance Criteria:**
     - Display list of user's tasks
     - Show task details (title, description, status, due date)
     - Proper error handling for empty states
     - Loading states during data fetch

3. **Update Tasks**
   - As a user, I want to edit my tasks so that I can keep information current
   - **Acceptance Criteria:**
     - Edit form pre-populated with current data
     - Validation for updated information
     - Save changes to database
     - Success confirmation

4. **Delete Tasks**
   - As a user, I want to remove completed or unwanted tasks
   - **Acceptance Criteria:**
     - Delete confirmation dialog
     - Remove task from database
     - Update UI immediately
     - Undo functionality (future enhancement)

### Epic 3: Backend API Development
**Description:** Robust Express.js API with proper MVC structure

#### Technical Stories:
1. **Authentication API**
   - Implement JWT-based authentication system
   - **Definition of Done:**
     - POST /api/register endpoint
     - POST /api/login endpoint
     - JWT middleware for protected routes
     - Password hashing with bcrypt

2. **Task CRUD API**
   - Create comprehensive task management endpoints
   - **Definition of Done:**
     - GET /api/tasks (with pagination and filtering)
     - POST /api/tasks (create new task)
     - PUT /api/tasks/:id (update task)
     - DELETE /api/tasks/:id (remove task)
     - Proper input validation and error handling

3. **Database Integration**
   - MongoDB integration with Mongoose ODM
   - **Definition of Done:**
     - User and Task models with validation
     - Database connection configuration
     - Proper indexing for performance
     - Error handling for database operations

---

## 📊 Sprint Backlog (Part B - Current Sprint)

### Sprint Goal
Deliver a functional task management application with user authentication and basic CRUD operations.

### Sprint Duration
**Start Date:** July 20, 2025  
**End Date:** July 30, 2025  
**Duration:** 2 weeks

### Sprint Backlog Items

#### High Priority (Must Have)
| Story ID | Story | Story Points | Status | Assignee |
|----------|-------|--------------|---------|----------|
| US-001 | User Registration API | 8 | ✅ Done | Marcel |
| US-002 | User Login API | 5 | ✅ Done | Marcel |
| US-003 | JWT Authentication Middleware | 3 | ✅ Done | Marcel |
| US-004 | MongoDB User Model | 5 | ✅ Done | Marcel |
| US-005 | MongoDB Task Model | 5 | ✅ Done | Marcel |
| US-006 | Create Task API | 8 | ✅ Done | Marcel |
| US-007 | Get Tasks API | 5 | ✅ Done | Marcel |
| US-008 | Update Task API | 5 | ✅ Done | Marcel |
| US-009 | Delete Task API | 3 | ✅ Done | Marcel |
| US-010 | React Frontend Setup | 8 | ✅ Done | Marcel |
| US-011 | Login/Register UI | 13 | ✅ Done | Marcel |
| US-012 | Task Dashboard UI | 8 | ✅ Done | Marcel |
| US-013 | Add Task Form UI | 5 | ✅ Done | Marcel |

#### Medium Priority (Should Have)
| Story ID | Story | Story Points | Status | Assignee |
|----------|-------|--------------|---------|----------|
| US-014 | Input Validation Frontend | 5 | ✅ Done | Marcel |
| US-015 | Error Handling UI | 3 | ✅ Done | Marcel |
| US-016 | API Integration | 8 | ✅ Done | Marcel |
| US-017 | Basic Styling | 5 | ✅ Done | Marcel |

#### Low Priority (Could Have)
| Story ID | Story | Story Points | Status | Assignee |
|----------|-------|--------------|---------|----------|
| US-018 | Task Statistics API | 5 | ✅ Done | Marcel |
| US-019 | User Profile API | 3 | ✅ Done | Marcel |
| US-020 | Admin User Management | 8 | ✅ Done | Marcel |

---

## 🏁 Definition of Done

### For User Stories:
- [ ] Acceptance criteria met and tested
- [ ] Code review completed
- [ ] Unit tests written (where applicable)
- [ ] Integration tested with existing features
- [ ] No critical bugs
- [ ] Documentation updated
- [ ] Deployed to development environment

### For Sprint:
- [ ] All high-priority stories completed
- [ ] Demo-ready application
- [ ] API endpoints tested and documented
- [ ] External Design Document created
- [ ] Video presentation recorded
- [ ] GitHub repository updated with latest code

---

## 📈 Sprint Progress

### Completed (✅)
**Total Story Points Completed:** 126 points

1. ✅ **Backend Infrastructure (45 points)**
   - Express server with MVC structure
   - MongoDB database connection
   - User and Task models
   - Authentication middleware

2. ✅ **API Development (34 points)**
   - Complete authentication system
   - Full CRUD operations for tasks
   - Input validation and error handling
   - JWT token management

3. ✅ **Frontend Development (39 points)**
   - React application setup
   - User registration and login pages
   - Task dashboard and creation form
   - API integration

4. ✅ **Additional Features (8 points)**
   - Task statistics
   - Admin functionality
   - Enhanced error handling

### In Progress (🚧)
- External Design Document (Final review)
- Video presentation preparation

### Blocked/Issues (🔴)
- No current blockers

---

## 🔄 Next Sprint Planning (Part 3)

### Upcoming Priorities
1. **Edit/Delete Task UI** - 13 points
2. **Home/Landing Page** - 8 points
3. **Enhanced Navigation** - 5 points
4. **Task Filtering** - 8 points
5. **Responsive Design** - 13 points

### Estimated Velocity
**Current Sprint Velocity:** 126 story points  
**Team Capacity:** 1 developer (expanding to 3)  
**Next Sprint Estimate:** 180-200 story points

---

## 📋 Product Backlog Metrics

### Total Backlog Items: 35
- **Done:** 20 items (57%)
- **In Progress:** 2 items (6%)
- **To Do:** 13 items (37%)

### Story Points Distribution:
- **Completed:** 126 points
- **Remaining:** 89 points
- **Total Project:** 215 points

### Priority Breakdown:
- **High Priority:** 13 items (8 completed)
- **Medium Priority:** 12 items (9 completed)
- **Low Priority:** 10 items (3 completed)

---

## 🎯 Release Planning

### Release 1 (Part B) - ✅ COMPLETED
**Target Date:** July 30, 2025  
**Features:** Basic task management with authentication

### Release 2 (Part 3) - 🎯 UPCOMING
**Target Date:** August 15, 2025  
**Features:** Complete CRUD UI, enhanced navigation, filtering

### Release 3 (Final) - 📅 PLANNED
**Target Date:** August 30, 2025  
**Features:** Polish, optimization, deployment

---

## 📞 Team Contact & Tools

### Team Communication:
- **Primary:** GitHub Issues and Pull Requests
- **Secondary:** Team meetings (weekly)

### Project Management:
- **Repository:** https://github.com/Sataniachia/COMP229Group-3
- **Documentation:** GitHub README and wiki
- **Issue Tracking:** GitHub Issues with labels

### Development Environment:
- **IDE:** Visual Studio Code
- **Version Control:** Git with GitHub
- **Testing:** Manual testing + Postman for APIs

---

**Document Version:** 1.0  
**Last Updated:** July 27, 2025  
**Next Review:** August 1, 2025
