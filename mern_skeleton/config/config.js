const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:oY8VGDjbmHDXlhvT@cluster0.vjeqfa4.mongodb.net/rapidtasks?retryWrites=true&w=majority&appName=Cluster0",
};

export default config;

