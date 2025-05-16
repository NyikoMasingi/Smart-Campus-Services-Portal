// src/routes/lecturer.routes.ts
import {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
} from '../controllers/lecturer.controller';
import express, { Router } from 'express';
const lecturerRouter = express.Router();

lecturerRouter.post('/', createLecturer);
lecturerRouter.get('/', getAllLecturers);
lecturerRouter.get('/:id', getLecturerById);
lecturerRouter.put('/:id', updateLecturer);
lecturerRouter.delete('/:id', deleteLecturer);

export default  lecturerRouter;
