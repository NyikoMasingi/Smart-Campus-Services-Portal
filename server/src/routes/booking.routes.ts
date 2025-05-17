import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);               // Create a booking
bookingRouter.get('/', getAllBookings);              // Get all bookings
bookingRouter.get('/:id', getBookingById);           // Get booking by ID
bookingRouter.put('/:id', updateBooking);            // Update booking details
bookingRouter.patch('/:id/status', updateBookingStatus); // Change status
bookingRouter.delete('/:id', deleteBooking);         // Delete a booking

export default bookingRouter;
