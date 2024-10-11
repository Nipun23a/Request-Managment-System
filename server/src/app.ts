import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import router from './routes/requestRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
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

// Remove the explicit server start
// const startServer = async () => { ... };
// startServer();

export default app;