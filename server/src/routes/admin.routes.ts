import express, { Router } from 'express';
 
import { addStudentCoures, createCoures, findAllCoures, findCouresByCode, findCouresById, findCouresByYearAndSemester, findStudentById } from '../controllers/admin.controller';
const adminRouter: Router = express.Router();

/**
 * @route   POST /api/admin/create-coures
 * @desc    Create a new coures entry
 * @access  admin
 */

adminRouter.post('/create-coures', createCoures);

/**
 * @route   GET /api/admin/create-coures
 * @desc    Fetch all coures entries
 * @access  admin
 */

adminRouter.post('/get-coures', findAllCoures);


/**
 * @route   GET /api/admin/get-coures
 * @desc    Fetch all coures entries
 * @access  admin
 */

adminRouter.get('/get-coures', findAllCoures);


adminRouter.get('/get-coures/:coures_id', findCouresById);


adminRouter.get('/get-coures-code/:course_code', findCouresByCode);

adminRouter.get('/get-coures-year/:year/semester/:semester', findCouresByYearAndSemester);


adminRouter.get('/get-student/:student_id',findStudentById)




adminRouter.get('/student/:student_id/add-coures/:coures_id',addStudentCoures)



export default adminRouter;