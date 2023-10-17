import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
app.use('/users/', userRoutes);

//Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
