import { Router } from 'express';
import { createBooking, listBookings, getBookingById, getBookingsByEmail } from '../controllers/bookingController.js';
import { body, query, validationResult } from 'express-validator';

const router = Router();

const validate = (validations) => [
  ...validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }
    next();
  },
];

router.post(
  '/bookings',
  validate([
    body('name').isString().trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('date').isString().matches(/^\d{4}-\d{2}-\d{2}$/),
  body('time').isString().matches(/^\d{2}:\d{2}–\d{2}:\d{2}$/),
  ]),
  createBooking
);

router.get(
  '/bookings',
  validate([
  query('date').optional().matches(/^\d{4}-\d{2}-\d{2}$/),
  query('email').optional().isString(),
  query('sort').optional().isString(),
  ]),
  listBookings
);

router.get(
  '/bookings/search',
  validate([
    query('email').notEmpty().withMessage('Email is required'),
    query('sort').optional().isString(),
  ]),
  getBookingsByEmail
);

router.get(
  '/bookings/:id',
  getBookingById
);

export default router;
