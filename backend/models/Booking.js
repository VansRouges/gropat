import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  date: { type: String, required: true }, // store as YYYY-MM-DD string for simplicity
  time: { type: String, required: true }, // e.g., "08:00–12:00"
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

BookingSchema.index({ date: 1, time: 1 }, { unique: false });

export default mongoose.model('Booking', BookingSchema);
