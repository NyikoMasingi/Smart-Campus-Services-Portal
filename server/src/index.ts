import 'dotenv/config';
import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/db_config'; 
import cors from 'cors';
import userRouter from './routes/user.routes';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';
import lecturerRouter from './routes/lecturer.routes';
import studentRoutes from './routes/student.routes';
import courseRoutes from './routes/course.routes';
import maintenanceRoutes from './routes/maintenance.route';
import ticketRouter from './routes/ticket.route';
import buildingRouter from './routes/building.routes';
import bookingRouter from './routes/booking.routes';



const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

connectToDatabase().then(() => {
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello from TypeScript backend!');
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware to handle JSON requests
  app.use(express.json());

  // Define routes
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/lecturer', lecturerRouter);
  app.use('/api/students', studentRoutes);
  app.use('/api/courses', courseRoutes);
  app.use("/api/maintenance", maintenanceRoutes);
  app.use('/api/tickets', ticketRouter);
  app.use('/api/building', buildingRouter);
  app.use('/api/booking', bookingRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((error) => { 
  console.error('Error connecting to the database:', error);
  process.exit(1); // Exit the process with failure
});
