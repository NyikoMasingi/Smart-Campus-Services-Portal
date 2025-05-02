import express, { Router } from 'express';
import { createUser } from '../controllers/auth.controller';

const authRouter: Router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Create a new user
 * @access  (Public)
 */
authRouter.post('/register', createUser);


export default authRouter;