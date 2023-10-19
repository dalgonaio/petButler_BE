import dotenv from 'dotenv';
dotenv.config();

import {NextFunction, Request, Response} from 'express';

import express from 'express';
import userRoutes from './routes/userRoutes';
import {errorHandler} from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Jungmee for dev only
// Custom middleware to log requests
// const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`Received a ${req.method} request at ${req.url}`);
//   console.log('Request body:', req.body); // Assuming you're using body-parser or similar middleware
//   next();
// };

// Use the logging middleware for all routes
// app.use(logMiddleware);

//Routes
app.use('/users/', userRoutes);

//Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
