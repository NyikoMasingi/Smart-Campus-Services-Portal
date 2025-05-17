// src/routes/user.routes.ts
import express from 'express';
import {
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/update/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
