import dotenv from 'dotenv';
dotenv.config();

import {NextFunction, Request, Response} from 'express';

import express from 'express';
import cors from 'cors';
const {auth} = require('express-oauth2-jwt-bearer');

//Components
import userRoutes from './routes/userRoutes';
import {errorHandler} from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

//AUTH
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN,
});

//Lupin
app.use(jwtCheck);

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

//Routes
app.use('/users/', userRoutes);

//Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
