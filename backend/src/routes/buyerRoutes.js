import express from 'express';
import { protectBuyer,authenticate } from '../middlewares/authMiddleware.js';
import {
  getProductDetails,
  followSeller,
  unfollowSeller,
  getRecommendations,
  addToCart,
  getCartItems,
  removeFromCart,
  addToLikes,
  getLikedProducts,
  removeFromLikes,
  moveLikeToCart,
  moveCartToLike,
  searchProducts,
  getAllProducts,
  getFollowingStories
} from '../controllers/buyerController.js';

const router = express.Router();

router.get('/products', authenticate, protectBuyer, getAllProducts);//working
router.get('/products/search', authenticate, protectBuyer, searchProducts); // working 
router.get('/product/:id',authenticate, protectBuyer, getProductDetails);//working
router.post('/seller/follow',authenticate, protectBuyer, followSeller);//working
router.delete('/seller/unfollow',authenticate, protectBuyer, unfollowSeller);//working
router.get('/stories/following',authenticate, protectBuyer, getFollowingStories);//working

router.get('/products/recommendations',authenticate, protectBuyer, getRecommendations);

router.post('/cart/add',authenticate, protectBuyer, addToCart);
router.get('/cart',authenticate, protectBuyer, getCartItems);
router.delete('/cart/remove/:productId',authenticate, protectBuyer, removeFromCart);

router.post('/likes/add',authenticate, protectBuyer, addToLikes);
router.get('/likes',authenticate, protectBuyer, getLikedProducts);
router.delete('/likes/remove/:productId',authenticate, protectBuyer, removeFromLikes);

router.post('/likes/move-to-cart',authenticate, protectBuyer, moveLikeToCart);
router.post('/cart/move-to-likes',authenticate, protectBuyer, moveCartToLike);

export default router;


