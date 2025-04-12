import express from 'express';
import { getDashboardSummary,
    getAllBuyers, suspendBuyer, deleteBuyer, getBuyerOrderHistory, getAllSellers, verifySeller, suspendSeller, deleteSeller, getSellerDetails,getPendingSellerRequests } from '../controllers/adminController.js';
import { protectAdmin,authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard',authenticate, protectAdmin, getDashboardSummary);
router .get('/buyers',authenticate, protectAdmin, getAllBuyers);
router.patch('/buyers/:id/suspend',authenticate, protectAdmin, suspendBuyer);
router.delete('/buyers/:id', authenticate,protectAdmin, deleteBuyer);
router.get('/buyers/:id/orders',authenticate, protectAdmin, getBuyerOrderHistory);
router.get('/sellers', authenticate,protectAdmin, getAllSellers);
router.patch('/sellers/:id/verify',authenticate, protectAdmin, verifySeller);
router.patch('/sellers/:id/suspend',authenticate, protectAdmin, suspendSeller);
router.delete('/sellers/:id',authenticate, protectAdmin, deleteSeller);
router.get('/sellers/:id',authenticate, protectAdmin, getSellerDetails);
router.get('/sellers/:id/orders',authenticate, protectAdmin, getBuyerOrderHistory); // Assuming this is for seller's orders
router.get('/pending-seller-requests',authenticate, protectAdmin, getPendingSellerRequests); // Get pending seller requests
export default router;
