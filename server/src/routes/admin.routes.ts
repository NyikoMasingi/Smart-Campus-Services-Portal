import express, { Router } from 'express';
 
import { addStudentCoures, createCoures, findAllCoures, findCouresByCode, findCouresById, findCouresByYearAndSemester,createStudent, findStudentById, findByLecturerId, addLecturerCoures, createLecturer,addBuilding, findCouresByYear, findCouresBySemester, createTimeTable, findInTimetableEntryCouresByYear, findInTimetableEntryCouresBySemester, findInTimetableEntryCouresByCode, findInTimetableEntryCouresByYearAndSemester, findAllTimetaableEntries } from '../controllers/admin.controller';
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


adminRouter.get('/get-coures-year/:year', findCouresByYear);

adminRouter.get('/get-coures-semester/:semester', findCouresBySemester);



adminRouter.get('/get-coures-code/:course_code', findCouresByCode);

adminRouter.get('/get-coures-year/:year/semester/:semester', findCouresByYearAndSemester);


adminRouter.get('/get-student/:student_id',findStudentById)

adminRouter.get('/get-lecture/:lecturer_id',findByLecturerId)





adminRouter.get('/student/:student_id/enroll-coures/:coures_id',addStudentCoures);

adminRouter.get('/assign-lecture/:lecturer_id/assign-coures/:coures_id',addLecturerCoures);


adminRouter.post('/register/student', createStudent);

adminRouter.post('/register/lecturer', createLecturer);


adminRouter.post('/add-building', addBuilding);


adminRouter.get('/create-timetable/:semester', createTimeTable);





adminRouter.get('/timetable-get-coures-year/:year', findInTimetableEntryCouresByYear);

adminRouter.get('/timetable-enties', findAllTimetaableEntries);


adminRouter.get('/timetable-get-coures-semester/:semester', findInTimetableEntryCouresBySemester);

adminRouter.get('/timetable-get-coures-code/:course_code', findInTimetableEntryCouresByCode);

adminRouter.get('/timetable-get-coures-year/:year/semester/:semester', findInTimetableEntryCouresByYearAndSemester);








export default adminRouter;