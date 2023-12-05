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

const IP = 'http://localhost'
var allowlist = [IP + ':3000', IP + ':3001', IP + ':3002', IP + ':3003']
var corsOptionsDelegate = function (req:any, callback:any) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', "true");
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cors(corsOptionsDelegate));

app.use(express.json());

// Custom middleware to log requests
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  console.log('Request body:', req.body);
  next();
};

// Other middleware
app.use(logMiddleware);
app.get('/', (req, res) => res.status(200).send("hello from server2"))
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
