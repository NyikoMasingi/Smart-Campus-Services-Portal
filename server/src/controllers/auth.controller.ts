import { Request, Response } from 'express';
import { collections } from '../config/db_config';
import User from '../models/user.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { role, name, email, password_hash } = req.body as User;

    const query = { email: email };
    const existingUser = await collections.users?.findOne(query);

    if (existingUser) {
      res.status(400).send(`User with email ${email} already exists`);
      return;
    }

    let passwordToStore = password_hash;
    if (!passwordToStore) {
      const randomPassword = generateRandomPassword(12);
      const saltRounds = 10;
      passwordToStore = await bcrypt.hash(randomPassword, saltRounds);
      console.log(`Generated password for ${email}: ${randomPassword}`);
    }

    const newUser = new User(role, name, email, passwordToStore);
    (newUser as any).isAcitve = true; // ✅ Explicitly set isAcitve to true

    const result = await collections.users?.insertOne(newUser);

    if (result) {
      res.status(201).send(`Successfully created a new user with id: ${result.insertedId}`);
    } else {
      res.status(500).send('Failed to create a new user');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
    } else {
      console.error('Error creating user:', error);
    }
    res.status(500).send('Error creating user');
  }
};
