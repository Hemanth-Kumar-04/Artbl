import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    options: {
      size: String,
      color: String,
    },
  }],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
