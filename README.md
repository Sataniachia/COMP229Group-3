# Rapid Tasks - Task Management Application

**Team:** COMP229 Group 3  
**Course:** COMP229 - Web Application Development  
**Project:** Task Management System with MERN Stack

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd COMP229-Project
   ```

2. **Backend Setup**
   ```bash
   cd mern_skeleton
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```

4. **Database Setup**
   - Ensure MongoDB is running locally on port 27017
   - Or update `config/config.js` with your MongoDB Atlas connection string

5. **Create Admin User**
   ```bash
   # From mern_skeleton directory
   node createAdmin.js
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd mern_skeleton
   npm run dev
   ```
   Server runs on: http://localhost:4000

2. **Start Frontend (in new terminal)**
   ```bash
   cd mern_skeleton/client
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

### Admin Login Credentials
- **Email:** admin@rapidtasks.com
- **Password:** admin123

### Test User Credentials
- **Email:** test@rapidtasks.com
- **Password:** test123

---

## � Project Features (Release 1)

### ✅ Completed Features
- [x] User registration and authentication
- [x] JWT-based secure login system
- [x] Task creation with title, description, priority, and due date
- [x] View all user tasks
- [x] Edit existing tasks
- [x] Delete tasks
- [x] Task status management (Pending, In Progress, Completed)
- [x] Responsive React frontend
- [x] RESTful API with Express.js
- [x] MongoDB database with Mongoose ODM

### 🚧 Upcoming Features (Release 2)
- [ ] Home/Landing page
- [ ] Enhanced navigation bar
- [ ] User profile management
- [ ] Task filtering and search
- [ ] Task statistics dashboard

---

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - User interface library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls

---

## 📁 Project Structure

```
COMP229-Project/
├── mern_skeleton/                 # Main application
│   ├── client/                    # React frontend
│   │   ├── src/
│   │   │   ├── pages/            # Page components
│   │   │   ├── components/       # Reusable components
│   │   │   ├── services/         # API service layer
│   │   │   └── App.jsx           # Main app component
│   │   └── package.json
│   ├── server/                    # Backend logic
│   │   ├── controllers/          # Request handlers
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   └── middleware/          # Custom middleware
│   ├── config/                   # Configuration files
│   ├── server.js                 # Server entry point
│   └── package.json
├── EXTERNAL_DESIGN_DOCUMENT.md   # Project design document
├── PRODUCT_BACKLOG_SIMPLE.md     # Project backlog
└── README.md                      # This file
```

---

## � API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

---

## 👥 Team Members

This project is designed for a 4-member team with the following roles:

- **Team Member 1:** Backend Architecture & Database
- **Team Member 2:** Task Management & API Development  
- **Team Member 3:** Authentication & Security
- **Team Member 4:** Frontend Development & UI/UX

---

## � Course Requirements Met

### Project Part 2 - Backend Development ✅
- [x] Created appropriate Task object for task management site
- [x] Set up MongoDB database with User and Task collections
- [x] Built backend using Express.js with MVC structure
- [x] Implemented user APIs and task CRUD operations
- [x] Added authentication and authorization with JWT
- [x] Full CRUD operations functional
- [x] Basic functional frontend (not focused on design)

### Project Part 3 - Frontend Integration (Next)
- [ ] Home/Landing page with team logo
- [ ] Navigation bar with user authentication status
- [ ] SignUp/SignIn integration
- [ ] Enhanced task management interface

### Project Part 4 - Final Release (Future)
- [ ] Visual design improvements
- [ ] Unit and E2E testing
- [ ] Cloud deployment
- [ ] CI/CD pipeline

---

## � Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in `config/config.js`

2. **Port Already in Use**
   - Backend: Change port in `config/config.js`
   - Frontend: Vite will suggest alternative port

3. **Admin User Not Created**
   - Run `node createAdmin.js` from mern_skeleton directory
   - Check MongoDB connection

---

## 📄 License

This project is for educational purposes as part of COMP229 coursework.

---

**Last Updated:** August 2025  
**Project Status:** Release 1 Complete ✅
