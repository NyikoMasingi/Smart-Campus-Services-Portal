import { Request, Response } from 'express';
import { collections} from '../config/db_config';
import User from '../models/user.model';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try{
       const newUser = req.body as User;
       const query = { email: newUser.email };
       const existingUser = await collections.users?.findOne(query);
   
        // Check if the user already exists
       if (existingUser) {
           res.status(400).send(`User with email ${newUser.email} already exists`);
       }else{
           // Create a new user
           const result = await collections.users?.insertOne(newUser);
   
   
           if(result){
            res.status(201).send(`Successfully created a new user with id: ${result.insertedId}`);
           }else{
              res.status(500).send('Failed to create a new user');
           }
       }        
       }catch (error:unknown) {
       if (error instanceof Error) {
           console.error('Error creating user:', error.message);
       } else {
           console.error('Error creating user:', error);
       }
       res.status(500).send('Error creating user' );
       }
   }
   
   