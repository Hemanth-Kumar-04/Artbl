import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Seller', sellerSchema);
