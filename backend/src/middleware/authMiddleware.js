import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) throw new ApiError(401, 'Not authorized, no token');

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) throw new ApiError(401, 'User not found or inactive');

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return next(new ApiError(401, 'Invalid token'));
    if (error.name === 'TokenExpiredError') return next(new ApiError(401, 'Token expired'));
    next(error);
  }
};

export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission'));
  }
  next();
};