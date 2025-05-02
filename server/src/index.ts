import 'dotenv/config'
import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/db_config'; 
import userRouter from './routes/user.routes';
import bodyParser  from 'body-parser';
import authRouter from './routes/auth.routes';
const app = express();
const port = 3000;




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
 


  
  
  app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
}).catch((error) => { 
  console.error('Error connecting to the database:', error);
  process.exit(1); // Exit the process with failure
});










