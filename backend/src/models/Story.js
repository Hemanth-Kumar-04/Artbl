import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  product: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 } ,// 24 hours in seconds
  featured: { type: Boolean, default: true }
});

export default mongoose.model('Story', storySchema);
