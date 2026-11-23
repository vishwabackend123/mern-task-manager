import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Task.deleteMany({});

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  });

  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john1234',
  });

  await Task.insertMany([
    { title: 'Design landing page', status: 'in-progress', priority: 'high', user: user._id },
    { title: 'Write API docs', status: 'todo', priority: 'medium', user: user._id },
    { title: 'Setup CI/CD', status: 'done', priority: 'low', user: admin._id },
  ]);

  console.log('✅ Seeded. admin@example.com / admin123');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});