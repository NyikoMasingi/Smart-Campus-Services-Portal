import { Request, Response } from 'express';
import { collections } from '../config/db_config';
import { ObjectId } from 'mongodb';

// Generate unique course_id 
const generateCourseId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `C-${timestamp}-${randomPart}`;
};

// Create a new Course
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, year, semester, course_code } = req.body;

    if (!name || !year || !semester || !course_code) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const newCourse = {
      name,
      year,
      semester,
      course_code,
      course_id: generateCourseId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collections.course?.insertOne(newCourse);
    if (result?.insertedId) {
      res.status(201).json({ message: 'Course created successfully', courseId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create course' });
    }
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all Courses
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await collections.course?.find().toArray();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a Course by ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await collections.course?.findOne({ _id: new ObjectId(req.params.id) });
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a Course by ID
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCourse = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await collections.course?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedCourse }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a Course by ID
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collections.course?.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result?.deletedCount) {
      res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
