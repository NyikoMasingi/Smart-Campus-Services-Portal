import express, { Router } from 'express';
 
import * as AdminController from '../controllers/admin.controller';
const adminRouter: Router = express.Router();

/**
 * @route   POST /api/admin/create-course
 * @desc    Create a new course entry
 * @access  admin
 */
adminRouter.post('/create-course', AdminController.createcourse);

/**
 * @route   GET /api/admin/create-course
 * @desc    Fetch all course entries
 * @access  admin
 */
adminRouter.post('/get-course', AdminController.findAllcourse);


/**
 * @route   GET /api/admin/get-course
 * @desc    Fetch all course entries
 * @access  admin
 */
adminRouter.get('/get-course', AdminController.findAllcourse);

/**
 * @route GET /api/admin/get-course/:course_id
 * @desc Fetch a course entry by ID  
 * @access admin
 *     
 */
adminRouter.get('/get-course/:course_id', AdminController.findcourseById);

/**
 * @route GET /api/admin/get-course-year/:year
 * @desc Fetch course entries by year
 * @access admin
 */
adminRouter.get('/get-course-year/:year', AdminController.findcourseByYear);


/**
 * @route GET /api/admin/get-course-semester/:semester
 * @desc Fetch course entries by semester
 * @access admin
 */
adminRouter.get('/get-course-semester/:semester', AdminController.findcourseBySemester);


/**
 * @route  GET /api/admin/get-course-code/:course_code
 * @desc Fetch course entries by course code
 * @access admin 
 */
adminRouter.get('/get-course-code/:course_code', AdminController.findcourseByCode);


/**
 * @route   GET /api/admin/get-course-year/:year/semester/:semester
 * @desc    Fetch course entries by year and semester
 * @access  admin
 */
adminRouter.get('/get-course-year/:year/semester/:semester', AdminController.findcourseByYearAndSemester);

/**
 * @route   GET /api/admin/get-student/:student_id
 * @desc    Fetch a student entry by ID
 * @access  admin 
 */
adminRouter.get('/get-student/:student_id',AdminController.findStudentById)

/**
 * @route   GET /api/admin/get-lecturer/:lecturer_id
 * @desc    Fetch a lecturer entry by ID
 * @access  admin  
 */
adminRouter.get('/get-lecture/:lecturer_id',AdminController.findByLecturerId)




/**
 * @route  GET /api/admin/student/:student_id/enroll-course/:course_id
 * @desc   Enroll a student in a course
 * @access admin 
 */
adminRouter.get('/student/:student_id/enroll-course/:course_id',AdminController.addStudentcourse);

/**
 * @route   GET /api/admin/assign-lecture/:lecturer_id/assign-course/:course_id
 * @desc    Assign a course to a lecturer
 * @access  admin
 */
adminRouter.get('/assign-lecture/:lecturer_id/assign-course/:course_id',AdminController.addLecturercourse);

/**
 * @route   POST /api/admin/register/student
 * @desc    Register a new student
 * @access  admin
 * @body   {name, email, password_hash }
 */
adminRouter.post('/register/student', AdminController.createStudent);

/**
 * @route   POST /api/admin/register/lecturer
 * @desc    Register a new lecturer
 * @access  admin
 * @body   {name, email, password_hash }
 */
adminRouter.post('/register/lecturer', AdminController.createLecturer);

/**
 * @route   POST /api/admin/add-building
 * @desc    Add a new building
 * @access  admin
 * @body   {name, room, capacity }
 */
adminRouter.post('/add-building', AdminController.addBuilding);

/**
 * @route  GET /api/create-timetable/:semester
 * @desc   Create a new timetable entries for a semester
 * @access admin   
 */
adminRouter.get('/create-timetable/:semester', AdminController.createTimeTable);




/**
 * @route GET /api/admin/timetable-get-course-year/:year
 * @desc Fetch course timetable entries by year
 * @access admin
 */
adminRouter.get('/timetable-get-course-year/:year', AdminController.findInTimetableEntrycourseByYear);

/**
 * @route GET /api/admin/timetable-enties
 * @desc Fetch all timetable entries
 * @access admin 
 */
adminRouter.get('/timetable-enties', AdminController.findAllTimetaableEntries);

/**
 * @route GET /api/admin/timetable-get-course-semester/:semester
 * @desc Fetch course timetable entries by semester
 * @access admin
 */
adminRouter.get('/timetable-get-course-semester/:semester', AdminController.findInTimetableEntrycourseBySemester);

/**
 * @route  GET /api/admin/timetable-get-course-code/:course_code
 * @desc Fetch course timetable entries by course code
 * @access admin
 */
adminRouter.get('/timetable-get-course-code/:course_code', AdminController.findInTimetableEntrycourseByCode);


/**
 * @route  GET /api/admin/timetable-get-course-year/:year/semester/:semester
 * @desc Fetch course timetable entries by year and semester
 * @access admin
 */
adminRouter.get('/timetable-get-course-year/:year/semester/:semester', AdminController.findInTimetableEntrycourseByYearAndSemester);


/**
 * @route GET /api/student-auto-generate-timetable/:student_id
 * @desc Grenerate a timetable for a student 
 * @access admin
 */
adminRouter.get('/student-auto-generate-timetable/:student_id', AdminController.autoGenerateStudentTimetable);   

/**
 * @route  GET /api/lecturer-auto-generate-timetable/:lecturer_id
 * @desc Generate a timetable for a lecturer
 * @access admin
 */
adminRouter.get('/lecturer-auto-generate-timetable/:lecturer_id', AdminController.autoGenerateLectureTimetable);  

/**
 * @route   POST /api/admin/auto-generate-timetable/:student_id
 * @desc    Generate a timetable for a student using enroled course
 * @access  admin
 * @body   course_code : string[]
 * 
 * @body   ["course_code","course_code1", "course_code2"]
 */
adminRouter.post('/auto-generate-timetable/:student_id', AdminController.generateTimetable);  

/**
 * @route   POST /api/admin/save-timetable/:student_id
 * @desc    Save a timetable from timetable entries generated for a student or lecturer
 * @access  admin
 * @body  {personal_id:string,name:string,entries:TimetableEntry[]} 
 *        personal_id=student_id/lecturer_id
 *        name= unique name for the timetable
 */
adminRouter.post('/save-timetable/:personal_id', AdminController.saveTimetable);  

/**
 * @route patch /api/admin/update-timetable/timetable_id
 * @desc    Update a timetable 
 * @access  admin
 * @body   {personal_id:string,name:string,entries:TimetableEntry[]}
 * 
 * @desc    
 * @access  
 */
adminRouter.patch('/update-timetable/timetable_id', AdminController.updateTimetable); 










export default adminRouter;