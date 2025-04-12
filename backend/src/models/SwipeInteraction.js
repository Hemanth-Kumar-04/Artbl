import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  action: { type: String, enum: ['like', 'addToCart', 'notInterested'], required: true },
  tags: [String],
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('SwipeInteraction', swipeSchema);
