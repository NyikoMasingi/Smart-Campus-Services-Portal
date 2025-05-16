import { Request, Response } from 'express';
import { collections } from '../config/db_config'; // Adjust the import path as needed

// Create a new Student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, student_id, enrolledCourseList } = req.body;

    if (!user_id || !student_id) {
      res.status(400).json({ message: 'User ID and Student ID are required' });
      return;
    }

    const newStudent = {
      user_id,
      student_id,
      enrolledCourseList,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collections.stundent?.insertOne(newStudent);

    if (result?.insertedId) {
      res.status(201).json({ message: 'Student created successfully', studentId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create student' });
    }
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all Students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await collections.stundent?.find().toArray();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a Student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await collections.stundent?.findOne({ student_id: req.params.id });

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a Student by ID
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedStudent = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await collections.stundent?.updateOne(
      { student_id: req.params.id },
      { $set: updatedStudent }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'Student updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a Student by ID
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collections.stundent?.deleteOne({ student_id: req.params.id });

    if (result?.deletedCount) {
      res.status(200).json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
