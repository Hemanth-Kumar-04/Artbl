import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String },
  approved: { type: Boolean, default: false },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' }]
}, { timestamps: true });

// Create a virtual field "products" to reference products created by this seller
sellerSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'seller'
});

// Enable virtuals to be included when converting to JSON or object
sellerSchema.set('toObject', { virtuals: true });
sellerSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Seller', sellerSchema);
