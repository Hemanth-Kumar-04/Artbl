import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import Product from '../models/Product.js';
import Story from '../models/Story.js';

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'storeName email');
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//Add to likes incl product and tags too.
export const addToLikes = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyer = req.user;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (!buyer.likes.includes(productId)) {
      buyer.likes.push(productId);   
      product.tags.forEach(tag => {
        if (!buyer.likedProductTags.includes(tag)) {
          buyer.likedProductTags.push(tag);
        }
      });
      await buyer.save();
    }
    res.status(200).json({ message: 'Product added to likes', likes: buyer.likes, likedProductTags: buyer.likedProductTags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    const buyer = req.user; // Assumes buyer is attached in auth middleware
    if (!buyer.following.includes(sellerId)) {
      buyer.following.push(sellerId);
      await buyer.save();
    }
    res.status(200).json({ message: 'Seller followed', following: buyer.following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a seller
export const unfollowSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const buyer = req.user;
    buyer.following = buyer.following.filter(id => id.toString() !== sellerId);
    await buyer.save();
    res.status(200).json({ message: 'Seller unfollowed', following: buyer.following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Profile of a seller.
export const getSellerProfile = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const seller = await Seller.findById(sellerId).select('storeName email contactInfo');
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    const products = await Product.find({ seller: sellerId }).select('name price images tags');
    const stories = await Story.find({ seller: sellerId })
      .populate('product', 'name price images')
      .sort({ createdAt: -1 });

    res.status(200).json({ seller, products, stories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getFollowingSellersStories = async (req, res) => {
  try {
    // Find the logged-in buyer and populate their following list
    const buyer = await Buyer.findById(req.user._id).populate('following');

    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    // Fetch stories from sellers the buyer is following
    const stories = await Story.find({ seller: { $in: buyer.following } })
                               .populate('seller', 'storeName') // optional: populate seller info
                               .sort({ createdAt: -1 });

    res.json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getStoriesBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const sellerExists = await Seller.findById(sellerId);
    if (!sellerExists) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const stories = await Story.find({ seller: sellerId })
                               .sort({ createdAt: -1 });

    res.json({ data: stories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//CART AND LIKE FUNCTIONALITIES

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyer = req.user;

    const cartItemIndex = buyer.cart.findIndex(item => item.product.toString() === productId);
    if (cartItemIndex > -1) {
     
      buyer.cart[cartItemIndex].quantity += quantity || 1;
    } else {
      buyer.cart.push({ product: productId, quantity: quantity || 1 });
    }
    await buyer.save();
    res.status(200).json({ message: 'Product added to cart', cart: buyer.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const buyer = await req.user.populate('cart.product', 'name price images tags');
    res.status(200).json({ cart: buyer.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const buyer = req.user;
    buyer.cart = buyer.cart.filter(item => item.product.toString() !== productId);
    await buyer.save();
    res.status(200).json({ message: 'Product removed from cart', cart: buyer.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get liked products
export const getLikedProducts = async (req, res) => {
  try {
    const buyer = await req.user.populate('likes', 'name price images tags');
    res.status(200).json({ likes: buyer.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove product from likes
export const removeFromLikes = async (req, res) => {
  try {
    const { productId } = req.params;
    const buyer = req.user;
    buyer.likes = buyer.likes.filter(id => id.toString() !== productId);
    await buyer.save();
    res.status(200).json({ message: 'Product removed from likes', likes: buyer.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Move product from likes to cart
export const moveLikeToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyer = req.user;
    // Remove from likes
    buyer.likes = buyer.likes.filter(id => id.toString() !== productId);
    // Add to cart (using the addToCart logic)
    const cartItemIndex = buyer.cart.findIndex(item => item.product.toString() === productId);
    if (cartItemIndex > -1) {
      buyer.cart[cartItemIndex].quantity += quantity || 1;
    } else {
      buyer.cart.push({ product: productId, quantity: quantity || 1 });
    }
    await buyer.save();
    res.status(200).json({ message: 'Moved product from likes to cart', cart: buyer.cart, likes: buyer.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Move product from cart to likes
export const moveCartToLike = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyer = req.user;
    buyer.cart = buyer.cart.filter(item => item.product.toString() !== productId);
    if (!buyer.likes.includes(productId)) {
      buyer.likes.push(productId);
    }
    await buyer.save();
    res.status(200).json({ message: 'Moved product from cart to likes', cart: buyer.cart, likes: buyer.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const buyer = req.user;

    // Retrieve the buyer's liked product tags
    const { likedProductTags } = buyer;

    if (!likedProductTags || likedProductTags.length === 0) {
      return res.status(200).json({ data: [], message: 'No liked product tags found for recommendations.' });
    }

    // Recommend products matching these tags, sorted by creation date newest first
    const recommendedProducts = await Product.find({ tags: { $in: likedProductTags } })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10);

    res.status(200).json({ data: recommendedProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

