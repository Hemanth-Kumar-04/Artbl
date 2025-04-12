import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};

export const protectBuyer = (req, res, next) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({ error: "Access denied. Buyer only." });
  }
  next();
};

export const protectSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access denied. Seller only." });
  }
  next();
};

export const protectAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }
  next();
};
