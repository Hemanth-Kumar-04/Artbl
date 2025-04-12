import cron from 'node-cron';
import Buyer from '../models/Buyer.js';

cron.schedule('0 0 */5 * *', async () => {
  try {
    const buyers = await Buyer.find({});
    for (const buyer of buyers) {
      if (buyer.likedProductTags && buyer.likedProductTags.length > 5) {       
        buyer.likedProductTags = buyer.likedProductTags.slice(-5);
        await buyer.save();
      }
    }
    console.log('Updated liked product tags for all buyers, keeping only the last 5 tags.');
  } catch (error) {
    console.error('Error updating liked product tags:', error.message);
  }
});
