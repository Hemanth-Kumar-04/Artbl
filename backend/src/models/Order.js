import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true } // For vendor control
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['placed', 'accepted', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  orderedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
