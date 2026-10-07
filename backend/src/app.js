import express from 'express';
import authRoute from './routes/auth.routes';
import calculationRoute from './routes/calculation.routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/calculation',calculationRoute);

app.use(errorHandler);

export default app;