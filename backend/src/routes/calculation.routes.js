import express from 'express';
import { calculationSchemaValidator } from '../validators/calculation.validator.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createCalculation } from '../controllers/calculation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create',calculationSchemaValidator,verifyJWT,createCalculation);

export default router;