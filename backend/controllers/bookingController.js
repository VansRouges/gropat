import Booking from '../models/Booking.js';

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

function toMinutes(hhmm) {
  const [hh, mm] = hhmm.split(':').map(Number);
  return hh * 60 + mm;
}
function rangesEqual(t1, t2) {
  // Expect format HH:MM–HH:MM
  return t1 === t2;
}

export const createBooking = async (req, res) => {
  try {
  const { name, email, date, time } = req.body || {};

  if (!name || !email || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    // Enforce slot exclusivity: same date + identical time range cannot be double-booked
    const existing = await Booking.findOne({ date, time }).lean();
    const conflict = !!existing;
    if (conflict) {
      return res.status(409).json({ message: 'This shift time on this date is already booked.' });
    }

    const doc = await Booking.create({ name, email, date, time });
    return res.status(201).json({ id: doc._id, message: 'Booking created' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const listBookings = async (req, res) => {
  try {
    const { date, sort, email } = req.query;
    console.log('Query params:', { date, sort, email }); // Debug log
    
    const query = {};
    if (date) query.date = date;
    if (email) query.email = { $regex: email, $options: 'i' }; // Case-insensitive search
    
    console.log('MongoDB query:', query); // Debug log
    
    // Determine sort order
    let sortOptions = { created_at: -1 }; // Default: newest first
    
    if (sort === 'email') {
      sortOptions = { email: 1 }; // A-Z
    } else if (sort === 'name') {
      sortOptions = { name: 1 }; // A-Z
    } else if (sort === 'date') {
      sortOptions = { date: 1 }; // Earliest first
    } else if (sort === 'created_at') {
      sortOptions = { created_at: -1 }; // Newest first
    }
    
    const rows = await Booking.find(query).sort(sortOptions).limit(100).lean();
    console.log('Found rows:', rows.length); // Debug log
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).lean();
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    return res.json(booking);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const { email, sort } = req.query;
    
    console.log('Searching bookings for email:', email); // Debug log
    
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    // Exact email match (case-insensitive)
    const query = { email: { $regex: `^${email}$`, $options: 'i' } };
    console.log('MongoDB query:', query); // Debug log
    
    // Determine sort order
    let sortOptions = { created_at: -1 }; // Default: newest first
    
    if (sort === 'email') {
      sortOptions = { email: 1 }; // A-Z
    } else if (sort === 'name') {
      sortOptions = { name: 1 }; // A-Z
    } else if (sort === 'date') {
      sortOptions = { date: 1 }; // Earliest first
    } else if (sort === 'created_at') {
      sortOptions = { created_at: -1 }; // Newest first
    }
    
    const bookings = await Booking.find(query).sort(sortOptions).lean();
    console.log('Found bookings:', bookings.length); // Debug log
    
    return res.json(bookings);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};
