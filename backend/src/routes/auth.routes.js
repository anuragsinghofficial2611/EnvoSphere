import express from 'express';
import { registerSchemaValidator,loginSchemaValidator } from '../validators/auth.validator.js';
import {loginUser, registerUser} from '../controllers/auth.controller.js' ;
const router = express.Router();

router.post('/register',registerSchemaValidator,registerUser);
router.post('/login',loginUser);

export default router;