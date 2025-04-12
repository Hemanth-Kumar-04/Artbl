import express from 'express';
import { buyerSignup, buyerLogin, sellerSignup, sellerLogin, adminLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/buyer/signup', buyerSignup);
router.post('/buyer/login', buyerLogin);
router.post('/seller/signup', sellerSignup);
router.post('/seller/login', sellerLogin);
router.post('/admin/login', adminLogin);

export default router;
