import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../config/db_config';

type BookingStatus = 'pending' | 'approved' | 'rejected';

// Create Booking
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { buildingId, userId, startTime, endTime, purpose } = req.body;

    if (!buildingId || !userId || !startTime || !endTime || !purpose) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Check for conflicts
    const conflict = await collections.bookings?.findOne({
      buildingId: new ObjectId(buildingId),
      $or: [
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } }
      ],
      status: { $in: ['pending', 'approved'] }
    });

    if (conflict) {
      res.status(409).json({ message: 'Time slot already booked for this venue.' });
      return;
    }

    const newBooking = {
      buildingId: new ObjectId(buildingId),
      userId: new ObjectId(userId),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      purpose,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collections.bookings?.insertOne(newBooking);

    if (result?.insertedId) {
      res.status(201).json({ message: 'Booking request submitted', bookingId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create booking' });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all Bookings
// Get all Bookings with building and user details
export const getAllBookings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await collections.bookings?.aggregate([
      {
        $lookup: {
          from: 'building', // Collection name for buildings
          localField: 'buildingId',
          foreignField: '_id',
          as: 'building'
        }
      },
      {
        $lookup: {
          from: 'users', // Collection name for users
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$building'
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          purpose: 1,
          startTime: 1,
          endTime: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          buildingName: '$building.name',
          requesterName: '$user.name',
        }
      }
    ]).toArray();

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get Booking by ID with building and user details
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = new ObjectId(req.params.id);

    const result = await collections.bookings?.aggregate([
      {
        $match: { _id: bookingId }
      },
      {
        $lookup: {
          from: 'building',
          localField: 'buildingId',
          foreignField: '_id',
          as: 'building'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$building' },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          purpose: 1,
          startTime: 1,
          endTime: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          buildingName: '$building.name',
          requesterName: '$user.name'
        }
      }
    ]).toArray();

    if (result && result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Update Booking
export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startTime, endTime, purpose } = req.body;

    const updatedData = {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      purpose,
      updatedAt: new Date(),
    };

    const result = await collections.bookings?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'Booking updated successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Status
export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const result = await collections.bookings?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: `Status updated to '${status}'` });
    } else {
      res.status(404).json({ message: 'Booking not found or status unchanged' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete Booking
export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collections.bookings?.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result?.deletedCount) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
