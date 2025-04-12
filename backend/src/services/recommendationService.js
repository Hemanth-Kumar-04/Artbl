import Product from '../models/Product.js';
import SwipeInteraction from '../models/SwipeInteraction.js';

export const recordSwipeInteraction = async (productId, actionType, userId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    const interaction = await SwipeInteraction.create({
      product: productId,
      user: userId,
      action: actionType,
      tags: product.tags,
    });
    return interaction;
  } catch (error) {
    console.error('Swipe recording failed:', error.message);
    throw error;
  }
};
