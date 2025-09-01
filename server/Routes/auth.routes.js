import authController from '../controllers/auth.controllers.js';
import express from 'express';
const router = express.Router();

// POST http://localhost:5000/api/auth/signup
router.post('/signup', authController.register);

// POST http://localhost:5000/api/auth/signin
router.post('/signin', authController.login);

export default router;

