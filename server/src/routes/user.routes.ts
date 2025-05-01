import express, { Router } from 'express';
import { protectedRoute, deleteUser, getUserById, updateUser,getAllUsers,createUser } from '../controllers/user.controller';
const userRouter: Router = express.Router();
userRouter.use(express.json()); 

/**
 * @route   GET /api/users/protected
 * @desc    A protected route
 * @access  all
 */
userRouter.get('/protected', protectedRoute);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  all
 * 
 */

/**
 * @route   POST api/users/
 * @desc    Create a new user
 * @access  all (self)
 */

userRouter.route('/')
            .get(getAllUsers)
            .post(createUser);


/**
 * @route   GET /api/users/:id
 * @desc    Get a user by id
 * @access  all
 */


/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  all
 */

/**
 * @route   PATCH api/users/:id
 * @desc    Update user details
 * @access  all (self)
 */
userRouter.all('/:id', (req, res) => {
    if (req.method === 'GET') {
        getUserById(req, res);
    } else if (req.method === 'DELETE') {
        deleteUser(req, res);
    } else if (req.method === 'PATCH') {
        userRouter.patch('/:id', updateUser);           
    } else if (req.method === 'PUT') {
        userRouter.put('/:id', updateUser);
    }
});





export default userRouter;