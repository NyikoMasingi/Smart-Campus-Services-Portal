import { Request, Response } from 'express';
import { collections } from '../config/db_config';
import { ObjectId } from 'mongodb';

// Utility function to generate a unique lecturer ID
const generateIdNumber = (): string => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
  const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random string
  return `${timestamp}-${randomPart}`;
};

// Create a new Lecturer
export const createLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, assignedCourseList } = req.body;
    const lecturer_id = generateIdNumber(); // Generate a unique lecturer ID

    const newLecturer = {
      user_id: new ObjectId(user_id),
      lecturer_id,
      assignedCourseList: assignedCourseList.map((courseId: string) => new ObjectId(courseId)),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collections.lecturer?.insertOne(newLecturer);
    if (result?.insertedId) {
      res.status(201).json({ message: 'Lecturer created successfully', lecturerId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create lecturer' });
    }
  } catch (error) {
    console.error('Error creating lecturer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all Lecturers
export const getAllLecturers = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturers = await collections.lecturer?.find().toArray();
    res.status(200).json(lecturers);
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a Lecturer by ID
export const getLecturerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturer = await collections.lecturer?.findOne({ _id: new ObjectId(req.params.id) });
    if (!lecturer) {
      res.status(404).json({ message: 'Lecturer not found' });
    } else {
      res.status(200).json(lecturer);
    }
  } catch (error) {
    console.error('Error fetching lecturer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a Lecturer by ID
export const updateLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLecturer = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await collections.lecturer?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedLecturer }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'Lecturer updated successfully' });
    } else {
      res.status(404).json({ message: 'Lecturer not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating lecturer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a Lecturer by ID
export const deleteLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collections.lecturer?.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result?.deletedCount) {
      res.status(200).json({ message: 'Lecturer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Lecturer not found' });
    }
  } catch (error) {
    console.error('Error deleting lecturer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
