import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
// app.js or server.js
import './cornJobs/clearLikedTags.js';
// ...rest of your server initialization code

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stories', storyRoutes);

// Global error handler
app.use(errorHandler);

export default app;
