import { ApiError } from '../utils/ApiError.js';

const emailRegex = /^\S+@\S+\.\S+$/;

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !emailRegex.test(email)) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  if (errors.length) return next(new ApiError(400, 'Validation failed', errors));
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !emailRegex.test(email)) errors.push('Valid email is required');
  if (!password) errors.push('Password is required');
  if (errors.length) return next(new ApiError(400, 'Validation failed', errors));
  next();
};