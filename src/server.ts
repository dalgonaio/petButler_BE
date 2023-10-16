import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'

const app = express();
const port = process.env.PORT || 3000;

app.use('/users/', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
