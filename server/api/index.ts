import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import router from './routes/requestRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
const allowedOrigins = [
  'https://request-managment-system.vercel.app',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, origin);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
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