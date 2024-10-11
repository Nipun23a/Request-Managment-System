import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import router from './routes/requestRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Test route
app.get('/', (req, res) => {
  res.send('hello');
});

// Routes
app.use('/api/requests', router);

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB().catch(err => console.error('Failed to connect to database:', err));

// Only start the server if we're not in a Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;