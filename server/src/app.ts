import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import { PORT } from './config/config';

const app = express();


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.get('/',(req,res) => {
    res.send('Request Managment System API');
});


//Connect to database and start server
const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  
  startServer();
  
  export default app;