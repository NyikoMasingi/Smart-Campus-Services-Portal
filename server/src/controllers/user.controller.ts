import { Request, Response } from 'express';
import { collections } from '../config/db_config';
import { ObjectId } from 'mongodb';
import User from '../models/user.model';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    
    try{
        const activeUsers: User[] = await collections.users?.find().toArray() as User[];
        res.status(200).send(JSON.stringify(activeUsers));
    }catch(error: unknown){
        if (error instanceof Error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).send({ message: 'Error retrieving users' });    
        }
    }
};


// Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await collections.users?.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await collections.users?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// "Soft delete" a user by ID (set isActive to false)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collections.users?.findOne(query);

    if (!user) {
       res.status(404).json({ message: 'User not found' });
    }

    // Soft delete: set isActive to false
    const result = await collections.users?.updateOne(query, { $set: { isActive: false, updatedAt: new Date() } });

    if (result?.modifiedCount) {
      res.status(200).json({ message: 'User deleted (soft delete) successfully' });
    } else {
      res.status(304).json({ message: 'User deletion failed or no changes made' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
