# Rapid Tasks Server

Backend API server for the Rapid Tasks application - a task management system built with Express.js and MongoDB.

## Features

- **User Authentication**: JWT-based authentication and authorization
- **Task Management**: Full CRUD operations for tasks
- **User Management**: Admin user management capabilities
- **RESTful API**: Well-structured API endpoints
- **Input Validation**: Comprehensive request validation
- **Security**: Password hashing, JWT tokens, CORS protection
- **MVC Architecture**: Clean separation of concerns

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the server directory:
   ```bash
   cd rapid-tasks-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed

4. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats` - Get system statistics

## Project Structure

```
rapid-tasks-server/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── taskController.js    # Task management logic
│   └── userController.js    # User management logic
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User data model
│   └── Task.js              # Task data model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── taskRoutes.js        # Task routes
│   └── userRoutes.js        # User routes
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── server.js                # Main server file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 4000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/rapidtasks |
| `JWT_SECRET` | JWT signing secret | rapid-tasks-secret-key |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Protected routes with role-based access

## Development

For development, the server uses nodemon for automatic restarts when files change.

## Testing

API testing can be done using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)

## Contributing

1. Follow the MVC pattern
2. Add proper validation for new endpoints
3. Include error handling
4. Update this README for new features
