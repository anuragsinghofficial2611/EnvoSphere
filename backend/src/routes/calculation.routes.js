import express from 'express';
import { calculationSchemaValidator } from '../validators/calculation.validator.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createCalculation,getAllCalculation,getCalculation,deleteCalculation } from '../controllers/calculation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create',calculationSchemaValidator,verifyJWT,createCalculation);
router.get('/getall',verifyJWT,getAllCalculation);
router.get('/get/:id',verifyJWT,getCalculation);
router.delete('/delete/:id',verifyJWT,deleteCalculation);

export default router;