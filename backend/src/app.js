import express from 'express';
import authRoute from './routes/auth.routes.js';
import calculationRoute from './routes/calculation.routes.js';
import userRoute from './routes/user.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import cors from 'cors';


const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
))

app.use(express.json());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/calculation',calculationRoute);
app.use('/api/v1/user',userRoute);

app.use(errorHandler);

export default app;