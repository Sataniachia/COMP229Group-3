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
   git clone https://github.com/Sataniachia/COMP229Group-3.git
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
   - MongoDB should be running locally on port 27017
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
   Server runs on: http://localhost:3000

2. **Start Frontend (in new terminal)**
   ```bash
   cd mern_skeleton/client
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

### Admin Login Credentials
- **Email:** admin@rapidtasks.com
- **Password:** admin123

### Test User (create via registration form if missing)
- **Suggested:** test@rapidtasks.com / test123

---

## ✅ Project Features (Release 1)

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

### 🚧 Part 3 Features (Release 2)
- [x] Home/Landing page with team logo
- [x] Enhanced navigation bar with authentication status
- [x] Task filtering by status (All, Pending, In Progress, Completed)
- [x] Keyword search across task titles and descriptions
- [x] Task statistics dashboard (totals, status counts, overdue tasks)
- [x] Inline task editing capabilities
- [x] API health monitoring badge

### 📅 Upcoming Features (Part 4)
- [ ] Unit and E2E testing implementation
- [ ] Cloud deployment (Render/Railway/Vercel)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Performance optimization
- [ ] Enhanced visual design and accessibility

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
├── PRODUCT_BACKLOG.md             # Project backlog
└── README.md                      # This file
```

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Health & Monitoring
- `GET /api/ping` - API health check

---

## 👥 Team Members

| Name | Role | Focus |
|------|------|-------|
| Marcel Borkowski | Backend Lead / Full-Stack | API design, auth, models, integration |
| Yiwei Li | Frontend Lead / UI | Core React pages, layout, logo |
| Rohit Luitel | Testing & Deployment | Unit/E2E tests, deployment, performance |
| Yuchen Jiang | Documentation & CI/CD | Videos, backlog hygiene, CI pipeline, accessibility |

---

## 📋 Course Requirements Met

### Project Part 2 - Backend Development ✅
- [x] Created appropriate Task object for task management site
- [x] Set up MongoDB database with User and Task collections
- [x] Built backend using Express.js with MVC structure
- [x] Implemented user APIs and task CRUD operations
- [x] Added authentication and authorization with JWT
- [x] Full CRUD operations functional
- [x] Basic functional frontend (not focused on design)

### Project Part 3 - Frontend Integration ✅
- [x] Home/Landing page with team logo
- [x] Navigation bar with user authentication status
- [x] SignUp/SignIn integration (login persistence working)
- [x] Task management interface with filtering and search
- [x] Task statistics display
- [x] Frontend-backend integration complete

### Project Part 4 - Final Release (In Progress)
- [ ] Visual design improvements
- [ ] Unit and E2E testing
- [ ] Cloud deployment
- [ ] CI/CD pipeline
- [ ] Performance optimization

---

## 🚨 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - MongoDB should be running locally
   - Check connection string in `config/config.js`

2. **Port Already in Use**
   - Backend: Change port in `config/config.js`
   - Frontend: Vite will suggest alternative port

3. **Admin User Not Created**
   - Run `node createAdmin.js` from mern_skeleton directory
   - Check MongoDB connection

4. **API Not Responding**
   - Verify both servers are running
   - Check API status badge in navigation
   - Ports 3000 (backend) and 5173 (frontend) should be free

---

## 📄 License

This project is for educational purposes as part of COMP229 coursework.

---

**Last Updated:** August 12, 2025  
**Project Status:** Part 3 Complete ✅ | Part 4 In Progress 🚧
