# Rapid Tasks - Task Management Application

A full-stack task management application built by **COMP229 Group 3** as part of our Web Application Development course.

## 🎯 Project Overview

Rapid Tasks is a comprehensive task management system that allows users to:
- Create, read, update, and delete tasks
- User authentication and authorization
- Task status tracking (Pending, In Progress, Completed)
- Due date management
- User profile management

## 👥 Team Members

**COMP229 Group 3:**
- [Add team member names and student IDs here]
- [Add team member names and student IDs here]
- [Add team member names and student IDs here]

## 🚀 Tech Stack

### Frontend (React)
- **React 19** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS-in-JS** - Styling

### Backend (Node.js/Express)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
COMP229-Project/
├── rapid-tasks-client/          # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/              # Page components
│   │   └── ...
│   └── package.json
└── rapid-tasks-server/          # Express backend
    ├── controllers/             # Business logic
    ├── models/                  # Database models
    ├── routes/                  # API routes
    ├── middleware/              # Custom middleware
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd rapid-tasks-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd rapid-tasks-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔗 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Task statistics

### Users (Admin)
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 📋 Features Completed

### Part B (First Release) ✅
- [x] Express backend with MVC structure
- [x] MongoDB database setup
- [x] User authentication and authorization
- [x] Complete CRUD operations for tasks
- [x] API testing ready
- [x] JWT-based security

### Part 3 (Frontend-Backend Integration) 🚧
- [x] React frontend with routing
- [x] User registration and login
- [x] Task management interface
- [x] API integration
- [ ] Home/Landing page
- [ ] Complete CRUD UI for tasks
- [ ] Enhanced navigation

## 🎥 Demo

[Link to video presentation will be added here]

## 📝 Documentation

- [Backend API Documentation](./rapid-tasks-server/README.md)
- [Frontend Documentation](./rapid-tasks-client/README.md)

## 🚀 Deployment

Instructions for deployment will be added as the project progresses.

## 🤝 Contributing

This is a group project for COMP229. All team members should:

1. Clone the repository
2. Create feature branches for new work
3. Make regular commits with clear messages
4. Submit pull requests for review
5. Follow the coding standards established

## 📄 License

This project is for educational purposes as part of COMP229 coursework.

## 📞 Contact

For questions about this project, please contact any of the team members or refer to the course materials.

---

**Course:** COMP229 - Web Application Development  
**Institution:** [Your Institution Name]  
**Semester:** [Current Semester]
