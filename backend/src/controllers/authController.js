import jwt from 'jsonwebtoken';
import Buyer from '../models/Buyer.js';
import Seller from '../models/Seller.js';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const buyerSignup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const buyer = await Buyer.create({ username, email, password });
    const token = generateToken(buyer._id, "buyer");

    res.status(201).json({ token, data: buyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buyerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email });

    if (!buyer || buyer.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(buyer._id, "buyer");
    res.json({ token, data: buyer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Signup
export const sellerSignup = async (req, res) => {
  try {
    const { storeName, email, password, contactInfo } = req.body;

    const seller = await Seller.create({
      storeName,
      email,
      password,
      contactInfo,
      approved: false,
    });

    res.status(201).json({
      data: seller,
      message: "Seller account request submitted for approval",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller || seller.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!seller.approved) {
      return res.status(403).json({ error: "Seller account pending approval" });
    }

    const token = generateToken(seller._id, "seller");
    res.json({ token, data: seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(admin._id, "admin");
    res.json({ token, data: admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
