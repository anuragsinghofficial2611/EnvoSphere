import express from 'express';
import { registerSchemaValidator,loginSchemaValidator } from '../validators/auth.validator';
import {loginUser, registerUser} from '../controllers/auth.controller' ;
const router = express.Router();

router.post('/register',registerSchemaValidator,registerUser);
router.post('/login',loginSchemaValidator,loginUser);

export default router;