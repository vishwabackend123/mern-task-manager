import { ApiError } from '../utils/ApiError.js';

export const validateTask = (req, res, next) => {
  const { title, status, priority } = req.body;
  const errors = [];

  if (!title || title.trim().length < 1) errors.push('Title is required');
  if (title && title.length > 120) errors.push('Title max 120 characters');
  if (status && !['todo', 'in-progress', 'done'].includes(status))
    errors.push('Invalid status');
  if (priority && !['low', 'medium', 'high'].includes(priority))
    errors.push('Invalid priority');

  if (errors.length) return next(new ApiError(400, 'Validation failed', errors));
  next();
};