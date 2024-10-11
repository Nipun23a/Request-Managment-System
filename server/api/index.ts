import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import router from './routes/requestRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://request-managment-system.vercel.app' 
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

// Routes
app.use('/api/requests', router);

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB().catch(err => console.error('Failed to connect to database:', err));

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the Express app
module.exports = app;