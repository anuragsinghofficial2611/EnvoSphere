import express from 'express';
import { calculationSchema } from '../validators/calculation.validator';
import { createCalculation } from '../controllers/calculation.controller';

const router = express.Router();

router.post('/create',calculationSchema,createCalculation);

export default router;