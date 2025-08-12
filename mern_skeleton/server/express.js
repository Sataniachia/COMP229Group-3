import express from "express";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200
};

// Security and performance middleware
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(compress());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Welcome route with API documentation
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Welcome to Rapid Tasks API",
    version: "2.0.0",
    status: "active",
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: "POST /api/register",
        login: "POST /api/login",
        logout: "POST /api/logout"
      },
      users: {
        profile: "GET /api/users/profile",
        update: "PUT /api/users/:id",
        delete: "DELETE /api/users/:id"
      }
    },
    documentation: "Visit /api/docs for detailed API documentation"
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  });
});

// Lightweight ping (used by frontend status badge)
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

// Mount routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// API documentation route (basic)
app.get("/api/docs", (req, res) => {
  res.json({
    title: "Rapid Tasks API Documentation",
    version: "2.0.0",
    description: "Task management system API",
    baseUrl: "http://localhost:3000/api",
    authentication: "JWT Bearer token required for protected routes",
    endpoints: {
      "POST /api/register": {
        description: "Register a new user",
        body: {
          firstName: "string (required)",
          lastName: "string (required)", 
          email: "string (required, valid email)",
          password: "string (required, min 6 characters)"
        },
        response: {
          success: "User object with JWT token",
          error: "Error message with details"
        }
      },
      "POST /api/login": {
        description: "Login user",
        body: {
          email: "string (required)",
          password: "string (required)"
        },
        response: {
          success: "User object with JWT token",
          error: "Error message"
        }
      },
      "GET /api/users/profile": {
        description: "Get user profile (protected)",
        headers: {
          Authorization: "Bearer <jwt_token>"
        },
        response: "User profile object"
      }
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: '/api/docs'
  });
});

// General 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
    suggestion: 'Visit / for API information'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  console.error('Stack trace:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid input data',
      details: errors
    });
  }
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      error: 'Duplicate Error',
      message: `${field} already exists`,
      field: field
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Authentication Error',
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Authentication Error', 
      message: 'Token expired'
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;
