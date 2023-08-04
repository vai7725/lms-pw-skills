// packages
import express from 'express';

// modules
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

// variables
const router = express.Router();

// routes
router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', changePassword);
router.put('/update', isLoggedIn, upload.single('avatar'), updateUser);

export default router;
