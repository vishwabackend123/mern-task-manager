import dotenv from "dotenv";
dotenv.config(); 

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

const required = ['mongoUri', 'jwtSecret'];
required.forEach((key) => {
  if (!config[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});