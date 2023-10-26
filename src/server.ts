import dotenv from 'dotenv';
dotenv.config();

import {NextFunction, Request, Response} from 'express';

import express from 'express';
import cors from 'cors';

//Components
import userRoutes from './routes/userRoutes';
import {errorHandler} from './middleware/errorHandler';
import {auth0Check} from './middleware/myAuth';
import {createUser} from './controllers/userController';

const app = express();
const port = process.env.PORT || 3000;

//AUTH

//Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());

// Custom middleware to log requests
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  console.log('Request body:', req.body);
  next();
};

// Other middleware
app.use(logMiddleware);

//Auth0 Register users using an unprotected route as M2M rules on Auth0 is expensive
app.post('/newAuth0User/', createUser);

//All other routes authenticated
app.use(auth0Check);

//Routes
app.use('/users/', userRoutes);

//Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
