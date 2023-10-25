import dotenv from 'dotenv';
dotenv.config();

import {NextFunction, Request, Response} from 'express';

import express from 'express';
import cors from 'cors';

//Components
import userRoutes from './routes/userRoutes';
import {errorHandler} from './middleware/errorHandler';
import {auth0Check} from './middleware/myAuth';

const app = express();
const port = process.env.PORT || 3000;

//AUTH

//Middleware
app.use(cors());
app.use(express.json());

// Custom middleware to log requests
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  console.log('Request body:', req.body);
  console.log('Lupin', res);
  next();
};

// Other middleware
app.use(logMiddleware);

const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user) {
    // Valid user
    next();
  } else {
    res.status(403).json({error: 'Unauthorized'});
  }
};

//Routes
app.use('/users/', userRoutes, isUserLoggedIn);

//Error handler
app.use(errorHandler);

//Authenticate routes
app.use(auth0Check);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
