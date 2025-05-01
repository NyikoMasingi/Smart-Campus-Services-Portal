import { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { collections} from '../config/db_config';
import User from '../models/user.model';



// Protected
 export const protectedRoute = async (req: Request, res: Response) => {
    res.status(200).send( 'Successfully access the protected route');
}
//find all users
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
    


//find user by id
export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id ;
    try{
        const query = { _id: new ObjectId(id) };
        const user: User | null = await collections.users?.findOne(query) as User;
        if(user === null){
            res.status(404).send(`Unable to find matching document with id: ${req?.params?.id}`);   
        }else{
             res.status(200).send(user);
        }
    }catch(error){
        if (error instanceof Error) {
        console.error('Error retrieving user:', error.message);
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }
    }   
};
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


   

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.findOne(query);

        if (result) {
            result.isActive = false;
            const updateResult = await collections.users?.updateOne(query, { $set: result });
            if (updateResult && updateResult.modifiedCount) {
                res.status(200).send(`Successfully deleted user with id ${id}`);
            } else {
                res.status(304).send(`Failed to delete user with id ${id}`);
            }
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);

        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }

};
   
//Update user details
export const updateUser = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const updatedUser: User = req.body as User;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.users?.updateOne(query, { $set: updatedUser });

        if(result){
            res.status(200).send(`Successfully updated user with id ${id}`);
        }else{
            res.status(304).send(`User with id: ${id} not updated`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    } 
} 


