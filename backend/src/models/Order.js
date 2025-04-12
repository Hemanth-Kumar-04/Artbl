import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
