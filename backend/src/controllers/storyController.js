import Story from '../models/Story.js';

export const createStory = async (req, res) => {
  try {
    const { productId } = req.body;
    const sellerId = req.user._id;
    const story = await Story.create({ seller: sellerId, product: productId });
    res.status(201).json({ message: 'Story created', story });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story', details: error.message });
  }
};
export const getStories = async (req, res) => {
  try {
    const { sellerId } = req.query;
    // Build a filter: if sellerId is provided, filter stories for that seller
    const filter = sellerId ? { seller: sellerId } : {};
    // Find stories based on the filter and populate required fields.
    const stories = await Story.find(filter)
      .populate('seller', 'storeName')
      .populate('product', 'name price');
    res.status(200).json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
  }
};
