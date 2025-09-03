import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

const DB_URI = process.env.DB_URI;
if (!DB_URI) {
  console.warn('Warning: DB_URI is not set. Please add it to backend/.env');
}
mongoose.connect(DB_URI, { dbName: process.env.DB_NAME || undefined })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => { console.error('MongoDB connection error', err); process.exit(1); });

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));
app.use(cors({
  origin: [
    'https://gropat-1.onrender.com',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    ...(process.env.CORS_ORIGIN?.split(',') || [])
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

// Routes
app.use('/api', bookingRoutes);

// Health/warmup endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
