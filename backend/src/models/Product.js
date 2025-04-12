import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  tags: [String],
  description: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
