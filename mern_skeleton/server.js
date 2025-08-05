import dotenv from "dotenv";
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception! Shutting down...');
  console.error('Error:', err.name, err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

// MongoDB connection setup
mongoose.Promise = global.Promise;

// Database connection with retry logic
const connectToDatabase = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        bufferCommands: false
      });
      
      console.log("🍃 Connected to MongoDB Atlas!");
      console.log(`📊 Database: ${mongoose.connection.name}`);
      console.log(`🔗 Host: ${mongoose.connection.host}`);
      return;
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) {
        console.error('💥 Unable to connect to database after', retries, 'attempts');
        throw error;
      }
      console.log(`⏳ Retrying in 5 seconds... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Database event listeners
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Graceful shutdown initiated...`);
  
  mongoose.connection.close(false, () => {
    console.log('🍃 MongoDB connection closed');
    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectToDatabase();
    
    // Start the server
    const server = app.listen(config.port, (err) => {
      if (err) {
        console.error('❌ Server startup error:', err);
        process.exit(1);
      }
      
      console.log('\n🚀 ====================================');
      console.log('🎉 Rapid Tasks Server is LIVE!');
      console.log('🚀 ====================================');
      console.log(`📍 Server: http://localhost:${config.port}`);
      console.log(`📚 API Docs: http://localhost:${config.port}/api/docs`);
      console.log(`💚 Health Check: http://localhost:${config.port}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`⚡ Node.js: ${process.version}`);
      console.log('� ====================================\n');
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${config.port} is already in use`);
        console.log('💡 Try stopping other processes or use a different port');
      } else {
        console.error('❌ Server error:', err);
      }
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('💥 Unhandled Promise Rejection! Shutting down...');
      console.error('Error:', err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
  }
};

// Initialize the application
startServer();
