import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  likedProductTags: [String],
  suspended: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Buyer', buyerSchema);
