import app from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/env.js';

const start = async () => {
  await connectDB();
  const server = app.listen(config.port, () =>
    console.log(`🚀 Server on http://localhost:${config.port}/api`)
  );

  const shutdown = (sig) => {
    console.log(`\n${sig} — shutting down`);
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start();