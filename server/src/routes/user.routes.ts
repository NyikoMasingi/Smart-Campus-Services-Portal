import express, { Router } from 'express';
import { deleteUser, getUserById, updateUser,getAllUsers } from '../controllers/user.controller';
const userRouter: Router = express.Router();
userRouter.use(express.json()); 



/**
 * @route   PATCH api/users/update/:id
 * @desc    updated user
 * @access  all (self)
 */

userRouter.patch('/update/:id',updateUser)

/**
 * @route   GET api/users/:id/update
 * @desc    Get user details to be updated
 * @access  all (self)
 */

userRouter.get('/:id/update',getUserById)


/**
 * @route   DELETE /api/users/delete
 * @desc    Delete a user
 * @access  all
 */
userRouter.delete('/delete/:id',deleteUser)


/**
 * @route   GET /api/users/
 * @desc    All a users 
 * @access  all
 */
userRouter.get('/',getAllUsers)


/**
 * @route   GET /api/users/:id
 * @desc    Get a user by id
 * @access  all
 */

userRouter.get('/:id',getUserById)









export default userRouter;