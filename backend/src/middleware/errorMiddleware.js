import { config } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message, statusCode: err.statusCode || 500 };

  if (err.name === 'CastError') error = new ApiError(400, 'Resource not found');
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(400, `${field} already exists`);
  }
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, 'Validation failed', details);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    ...(error.details && { details: error.details }),
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};