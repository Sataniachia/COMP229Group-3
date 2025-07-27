# Team Setup Guide for COMP229 Group 3

## 🚀 Quick Start for Team Members

### Prerequisites
Before you start, make sure you have:
- **Git** installed on your computer
- **Node.js** (v14 or higher) installed
- **MongoDB** (local installation or MongoDB Atlas account)
- **VS Code** (recommended) or your preferred code editor

### 1. Clone the Repository

```bash
git clone https://github.com/Sataniachia/COMP229Group-3.git
cd COMP229Group-3
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd rapid-tasks-server

# Install dependencies
npm install

# Create environment file
copy .env.example .env   # Windows
# OR
cp .env.example .env     # Mac/Linux

# Update .env file with your MongoDB connection string
```

**Edit the `.env` file:**
```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/rapidtasks
JWT_SECRET=rapid-tasks-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Start the backend server:**
```bash
npm run dev
```
*Server will run on http://localhost:4000*

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
# Navigate to client directory (from project root)
cd rapid-tasks-client

# Install dependencies
npm install

# Start the frontend server
npm start
```
*Frontend will run on http://localhost:3000*

### 4. MongoDB Setup Options

#### Option A: Local MongoDB
1. Download and install MongoDB Community Server
2. Start MongoDB service
3. Use the default connection string in `.env`

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get connection string and update `.env` file
4. Replace `MONGODB_URI` with your Atlas connection string

### 5. Testing the Application

1. Open browser to http://localhost:3000
2. Click "Sign Up" to create a new account
3. Login with your credentials
4. Start creating tasks!

## 👥 Team Collaboration Workflow

### Daily Workflow

1. **Always pull latest changes first:**
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature:**
   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/edit-task-functionality
   ```

3. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "Add meaningful commit message"
   ```

4. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request on GitHub:**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Add description of changes
   - Request review from team members

### Branch Naming Convention

- `feature/task-name` - For new features
- `bugfix/issue-description` - For bug fixes
- `docs/update-readme` - For documentation updates

**Examples:**
- `feature/edit-delete-tasks`
- `feature/user-profile-page`
- `bugfix/login-error-handling`
- `feature/task-search-filter`

### Commit Message Guidelines

Write clear, descriptive commit messages:

**Good examples:**
```
Add edit and delete functionality for tasks
Fix login error handling for invalid credentials
Update README with deployment instructions
Implement task filtering by status
```

**Avoid:**
```
fix bug
update stuff
changes
```

## 🏗️ Project Structure Overview

```
COMP229Group-3/
├── rapid-tasks-client/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   └── Navbar.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── AddTask.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── rapid-tasks-server/          # Express Backend
    ├── config/
    │   └── database.js
    ├── controllers/             # Business logic
    │   ├── authController.js
    │   ├── taskController.js
    │   └── userController.js
    ├── middleware/
    │   └── auth.js
    ├── models/                  # Database schemas
    │   ├── User.js
    │   └── Task.js
    ├── routes/                  # API endpoints
    │   ├── authRoutes.js
    │   ├── taskRoutes.js
    │   └── userRoutes.js
    ├── .env
    ├── server.js
    └── package.json
```

## 📋 Current Features (Part B Complete)

### ✅ Completed
- User registration and authentication
- JWT-based security
- Task CRUD operations (Create, Read)
- MongoDB database integration
- Express backend with MVC structure
- React frontend with routing

### 🚧 To Do (Part 3)
- Edit/Update task functionality
- Delete task functionality
- Home/Landing page
- Enhanced navigation
- Task filtering and search
- User profile management
- Better error handling
- Responsive design improvements

## 🛠️ Development Tasks for Team Members

### Frontend Tasks
1. **Edit Task Functionality**
   - Create EditTask component
   - Add edit button to task list
   - Form validation

2. **Delete Task Functionality**
   - Add delete button to tasks
   - Confirmation dialog
   - Update task list after deletion

3. **Home/Landing Page**
   - Welcome page design
   - Task statistics dashboard
   - Quick actions

4. **Enhanced Navigation**
   - Better navbar design
   - Breadcrumbs
   - User menu dropdown

### Backend Tasks
1. **Enhanced Task APIs**
   - Task filtering endpoints
   - Search functionality
   - Task statistics

2. **User Profile APIs**
   - Update profile endpoint
   - Change password
   - User preferences

3. **Data Validation**
   - Enhanced input validation
   - Better error messages
   - Rate limiting

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network connectivity for Atlas

**Port Already in Use:**
- Frontend (3000): Change port in package.json
- Backend (4000): Change PORT in `.env`

**npm install fails:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**Git merge conflicts:**
- Always pull before making changes
- Communicate with team before editing same files
- Use VS Code merge conflict resolver

## 📞 Contact

For questions or issues:
1. Create an issue on GitHub
2. Ask in team group chat
3. Schedule team meeting

## 🎯 Next Steps

1. All team members clone and set up the project
2. Test the current functionality
3. Assign tasks from the To Do list
4. Start working on Part 3 requirements
5. Regular team check-ins and code reviews

---

**Remember:** Always test your changes locally before pushing and create meaningful commit messages!
