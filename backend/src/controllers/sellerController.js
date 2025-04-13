import Seller from '../models/Seller.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Story from '../models/Story.js';


// Seller Signup (stub)
export const sellerSignup = async (req, res) => {
  try {
    // Placeholder logic: implement proper signup logic here.
    const newSeller = await Seller.create(req.body);
    res.status(201).json({ data: newSeller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Login (stub)
export const sellerLogin = async (req, res) => {
  try {
    // Placeholder logic: implement authentication logic here.
    // For now, return a dummy response.
    res.status(200).json({ message: "Seller login successful", token: "dummy-token" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *      DASHBOARD
 * ===========================
 */

// Seller Dashboard (stub)
export const getSellerDashboard = async (req, res) => {
  try {
    // Placeholder dashboard info. Replace with actual data.
    res.status(200).json({
      totalProducts: 0,
      totalOrders: 0,
      totalSales: 0,
      message: "Dashboard data goes here"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *    PRODUCT MANAGEMENT
 * ===========================
 */

// ➕ ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { name, description, price, images, tags } = req.body;
    const product = await Product.create({ name, description, price, images, tags, seller: sellerId });
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🧺 GET MY PRODUCTS
export const getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller: sellerId });
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// BULK DELETE PRODUCTS
export const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body; // Array of product IDs
    await Product.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Products deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOGGLE PRODUCT STOCK STATUS (stub)
// Example: This might mark a product as in or out of stock.
export const toggleProductStockStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Toggle stock status logic (e.g., product.inStock = !product.inStock)
    product.inStock = !product.inStock;
    await product.save();
    res.json({ message: 'Product stock status toggled', data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *       ORDER MANAGEMENT
 * ===========================
 */

// Utility: Get seller's product IDs
const getSellerProductIds = async (sellerId) => {
  const products = await Product.find({ seller: sellerId });
  return products.map(p => p._id);
};

// GET PENDING ORDERS
export const getPendingOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    // Assuming pending orders have status 'pending'
    const orders = await Order.find({ 
      'products.product': { $in: await getSellerProductIds(sellerId) },
      status: 'pending'
    }).populate('buyer');
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REJECT ORDER
export const rejectOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // Update order status to 'rejected'
    const updatedOrder = await Order.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    res.json({ data: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MARK ORDER AS SHIPPED
export const markOrderShipped = async (req, res) => {
  try {
    const { id } = req.params;
    // Update order status to 'shipped'
    const updatedOrder = await Order.findByIdAndUpdate(id, { status: 'shipped' }, { new: true });
    res.json({ data: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET COMPLETED ORDERS
export const getCompletedOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    // Assuming completed orders have status 'completed'
    const orders = await Order.find({ 
      'products.product': { $in: await getSellerProductIds(sellerId) },
      status: 'completed'
    }).populate('buyer');
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *       SELLER PROFILE
 * ===========================
 */

// GET SELLER PROFILE
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id);
    res.json({ data: seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE SELLER PROFILE
export const updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json({ data: seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *         STORIES
 * ===========================
 */

// ADD STORY
export const addStory = async (req, res) => {
  try {
    const { product } = req.body;
    const story = await Story.create({ seller: req.user._id, product });
    res.status(201).json({ data: story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY STORIES
export const getMyStories = async (req, res) => {
  try {
    const stories = await Story.find({ seller: req.user._id });
    res.json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE STORY
export const deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *        ANALYTICS
 * ===========================
 */

export const getAnalytics = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller: sellerId });
    const totalSales = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { 'products.product': { $in: products.map(p => p._id) } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    res.json({
      totalSales: totalSales[0]?.total || 0,
      productCount: products.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *      NOTIFICATIONS
 * ===========================
 */

// GET NOTIFICATIONS (stub)
export const getNotifications = async (req, res) => {
  try {
    // Placeholder implementation for notifications
    res.json({ data: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MARK NOTIFICATION AS READ (stub)
export const markNotificationRead = async (req, res) => {
  try {
    // Placeholder logic for marking a notification as read
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CLEAR NOTIFICATIONS (stub)
export const clearNotifications = async (req, res) => {
  try {
    // Placeholder logic for clearing notifications
    res.json({ message: 'Notifications cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ===========================
 *         SETTINGS
 * ===========================
 */

// UPDATE SELLER SETTINGS (stub)
export const updateSellerSettings = async (req, res) => {
  try {
    // Placeholder: update seller settings logic here
    res.json({ message: 'Seller settings updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PRODUCTS ORDERS
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'products.seller': req.user._id })
      .populate('buyer', 'username email')
      .populate('products.product', 'name price images');

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id:orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Check if seller is part of the order
    const isSellerInvolved = order.products.some(p => p.seller.toString() === req.user._id.toString());
    if (!isSellerInvolved) {
      return res.status(403).json({ error: 'Unauthorized: Seller not part of this order' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: `Order status updated to '${status}'`, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
