import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Story from '../models/Story.js';


// 1. Dashboard Summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await Buyer.countDocuments() + await Seller.countDocuments();
    const activeOrders = await Order.countDocuments({ status: 'active' });
    const revenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]);
    const totalRevenue = revenueAgg[0]?.total || 0;
    res.json({ totalOrders, totalRevenue, totalUsers, activeOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Buyer Management
export const getAllBuyers = async (req, res) => {
  const buyers = await Buyer.find({}, 'username email createdAt');
  res.json(buyers);
};

export const suspendBuyer = async (req, res) => {
  const { id } = req.params;
  await Buyer.findByIdAndUpdate(id, { suspended: true });
  res.json({ message: 'Buyer suspended' });
};

export const deleteBuyer = async (req, res) => {
  const { id } = req.params;
  await Buyer.findByIdAndDelete(id);
  res.json({ message: 'Buyer deleted' });
};

export const getBuyerOrderHistory = async (req, res) => {
  const orders = await Order.find({ buyer: req.params.id }).populate('products.product');
  res.json(orders);
};

// 3. Seller Management
export const getAllSellers = async (req, res) => {
  const sellers = await Seller.find({}, 'storeName email approved createdAt');
  res.json(sellers);
};

export const verifySeller = async (req, res) => {
  await Seller.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: 'Seller verified' });
};

export const suspendSeller = async (req, res) => {
  await Seller.findByIdAndUpdate(req.params.id, { suspended: true });
  res.json({ message: 'Seller suspended' });
};

export const deleteSeller = async (req, res) => {
  await Seller.findByIdAndDelete(req.params.id);
  res.json({ message: 'Seller deleted' });
};

export const getSellerDetails = async (req, res) => {
  const seller = await Seller.findById(req.params.id)
    .select('-password')
    .populate('followers', 'username')
    .populate({ path: 'products', model: 'Product' });

  const stories = await Story.find({ seller: req.params.id }).populate('product');

  const totalSold = await Order.aggregate([
    { $unwind: '$products' },
    { $match: { 'products.seller': seller._id } },
    { $group: { _id: null, total: { $sum: '$products.quantity' } } }
  ]);

  res.json({ seller, stories, totalSold: totalSold[0]?.total || 0 });
};

// 4. Story Management
export const getAllStories = async (req, res) => {
  const stories = await Story.find().populate('seller').populate('product');
  res.json(stories);
};

export const deleteStory = async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.json({ message: 'Story deleted' });
};


export const searchStories = async (req, res) => {
  const keyword = req.query.q;
  const stories = await Story.find({ caption: { $regex: keyword, $options: 'i' } });
  res.json(stories);
};

// 5. Product Management
export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('seller');
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product removed' });
};

// 6. Order Management
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('buyer seller products.product');
  res.json(orders);
};

export const resolveDispute = async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndUpdate(id, { disputeResolved: true });
  res.json({ message: 'Dispute resolved' });
};

export const exportOrders = async (req, res) => {
  const orders = await Order.find();
  res.setHeader('Content-Type', 'application/json');
  res.attachment('orders.json');
  res.send(JSON.stringify(orders));
};

export const getPendingSellerRequests = async (req, res) => {
  try {
    const pendingSellers = await Seller.find({ approved: false }).select('storeName email createdAt');
    res.status(200).json(pendingSellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};