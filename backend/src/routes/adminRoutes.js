import express from 'express';
import { getDashboardSummary,
    getAllBuyers, suspendBuyer, deleteBuyer, getBuyerOrderHistory, getAllSellers, verifySeller, suspendSeller, deleteSeller, getSellerDetails,getPendingSellerRequests } from '../controllers/adminController.js';
import { protectAdmin,authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard',authenticate, protectAdmin, getDashboardSummary);//working
router.get('/buyers',authenticate, protectAdmin, getAllBuyers);//working
router.patch('/buyers/:id/suspend',authenticate, protectAdmin, suspendBuyer);//working
router.delete('/buyers/:id', authenticate,protectAdmin, deleteBuyer);//working
router.get('/buyers/:id/orders',authenticate, protectAdmin, getBuyerOrderHistory);//workoing
router.get('/sellers', authenticate,protectAdmin, getAllSellers);//working
router.patch('/sellers/:id/verify',authenticate, protectAdmin, verifySeller);//working
router.patch('/sellers/:id/suspend',authenticate, protectAdmin, suspendSeller);//working
router.delete('/sellers/:id',authenticate, protectAdmin, deleteSeller);//working
router.get('/sellers/:id',authenticate, protectAdmin, getSellerDetails);//working
router.get('/sellers/:id/orders',authenticate, protectAdmin, getBuyerOrderHistory); // Assuming this is for seller's orders //working
router.get('/requests',authenticate, protectAdmin, getPendingSellerRequests); // Get pending seller requests//working
export default router;
