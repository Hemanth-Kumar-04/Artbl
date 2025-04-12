import express from 'express';
import {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  toggleProductStockStatus,
  getSellerDashboard,
  getPendingOrders,
  rejectOrder,
  markOrderShipped,
  getCompletedOrders,
  getSellerProfile,
  updateSellerProfile,
  addStory,
  getMyStories,
  deleteStory,
  getAnalytics,
  getNotifications,
  markNotificationRead,
  clearNotifications,
  updateSellerSettings
} from '../controllers/sellerController.js';
import { authenticate, protectSeller } from '../middlewares/authMiddleware.js';

const router = express.Router();



// Dashboard Summary
router.get('/dashboard', authenticate,protectSeller, getSellerDashboard); //working

// Products
router.post('/product',authenticate, protectSeller, addProduct);//working
router.get('/products', authenticate,protectSeller, getMyProducts);//working
router.put('/product/:id',authenticate, protectSeller, updateProduct);//working
router.delete('/product/:id',authenticate, protectSeller, deleteProduct);//working
router.post('/products/bulk-delete',authenticate, protectSeller, bulkDeleteProducts);//working
router.patch('/product/:id/toggle-stock',authenticate, protectSeller, toggleProductStockStatus);

// Orders
router.get('/orders/pending', authenticate,protectSeller, getPendingOrders);
router.patch('/orders/:id/reject',authenticate, protectSeller, rejectOrder);
router.patch('/orders/:id/ship',authenticate, protectSeller, markOrderShipped);
router.get('/orders/completed',authenticate, protectSeller, getCompletedOrders);

//Profile
router.get('/profile',authenticate, protectSeller, getSellerProfile);//working
router.put('/profile',authenticate, protectSeller, updateSellerProfile);//working


router.post('/story', authenticate,protectSeller, addStory);//working
router.get('/stories', authenticate,protectSeller, getMyStories);//working
router.delete('/story/:id',authenticate, protectSeller, deleteStory);//working


router.get('/analytics',authenticate, protectSeller, getAnalytics);


router.get('/notifications',authenticate, protectSeller, getNotifications);
router.patch('/notifications/:id/read',authenticate, protectSeller, markNotificationRead);
router.delete('/notifications/clear',authenticate, protectSeller, clearNotifications);


router.put('/settings',authenticate, protectSeller, updateSellerSettings);

export default router;
