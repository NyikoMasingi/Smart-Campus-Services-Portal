import { Request, Response } from 'express';
import Course from '../models/course.model'
import { savecourse, getAllcourse, getcourseById, getcourseByCode, getcourseByYearAndSemester, saveStudent, getStudentById, updateStudent, saveLecturer, getLecturerById, updateLecturer, saveBuilding, getcourseByYear, getcourseBySemester, generateTimeTable, getcourseByCodeInTimetableEntry, getcourseByYearAndSemesterInTimetableEntry, getcourseByYearInTimetableEntry, getcourseBySemesterInTimetableEntry, getAllTimetaableEntries, updateTimetableEntry, getTimetableEntry, alterTimetable,createTimetable } from '../service/timetable.service';
import { ObjectId } from 'mongodb';
import User from '../models/user.model';
import Student from '../models/student.model';
import Lecturer from '../models/lecturer.model';
import Bulding from '../models/bulding.model';
import TimetableEntry from '../models/timetable_entry.model';
import Timetable from '../models/timetable.model';

export const createcourse = async (req: Request, res: Response) => {

    const {name,year,semester,course_code} = req.body as Course;

    const result = await savecourse(name,year,semester,course_code);

    res.status(result.code).send(result.message)
}


export const createStudent = async (req: Request, res: Response) => {

    const {name,email,password_hash,role} = req.body as User;

    const result = await saveStudent(name,email,password_hash,role);

    res.status(result.code).send(result.message)
}
export const addStudentcourse = async (req: Request, res: Response) => {

    const course_id = req.params.course_id as string;
    const student_id = req.params.student_id
try{
    const course:Course = await getcourseById(new ObjectId(course_id));
    if(course == null){
       res.status(401).send(`course with id  ${course_id} not found`)
    }
    const student:Student = await getStudentById(student_id);
    if(student == null){
        res.status(401).send(`student with student_id  ${student_id} not found`)
    }
    student.enrolled_courses.push(course);
    const result = await updateStudent(student_id,student);
    res.status(result.code).send(result.message)
}catch(error){
    console.log(error)

}
    
}

export const findAllcourse = async (req: Request, res: Response) => {
    
    const result = await getAllcourse();

    res.status(200).send(JSON.stringify(result));
}



export const findStudentById = async (req: Request, res: Response) => {

    const student_id = req.params.student_id as string;

    const result = await getStudentById(student_id);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch student with id: ${student_id}`)
    }
}


export const findcourseById = async (req: Request, res: Response) => {

    const course_id = req.params.course_id as string;
    const result = await getcourseById(new ObjectId( course_id));

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch course with id: ${course_id}`)
    }
}


export const findcourseByCode = async (req: Request, res: Response) => {

    const course_code = req.params.course_code;

    const result = await getcourseByCode(course_code);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch  with code: ${course_code}`)
    }
}

export const findcourseByYearAndSemester = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);
    const semester:number = parseInt(req.params.semester, 10);

    const result = await getcourseByYearAndSemester(year, semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with year: ${year} and semester: ${semester}`)
    }
}


export const findcourseByYear = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);

    const result = await getcourseByYear(year);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with year: ${year}}`)
    }
}

export const findcourseBySemester = async (req: Request, res: Response) => {

    const semester:number = parseInt(req.params.semester, 10);

    const result = await getcourseBySemester( semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with semester: ${semester}`)
    }
}


export const findInTimetableEntrycourseByCode = async (req: Request, res: Response) => {

    const course_code = req.params.course_code;

    const result = await getcourseByCodeInTimetableEntry(course_code);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch  with code: ${course_code}`)
    }
}

export const findInTimetableEntrycourseByYearAndSemester = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);
    const semester:number = parseInt(req.params.semester, 10);

    const result = await getcourseByYearAndSemesterInTimetableEntry(year, semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with year: ${year} and semester: ${semester}`)
    }
}


export const findInTimetableEntrycourseByYear = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);

    const result = await getcourseByYearInTimetableEntry(year);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with year: ${year}}`)
    }
}

export const findAllTimetaableEntries = async (req: Request, res: Response) => {


    const result = await getAllTimetaableEntries();

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch timable entries`)
    }
}

export const findInTimetableEntrycourseBySemester = async (req: Request, res: Response) => {

    const semester:number = parseInt(req.params.semester, 10);

    const result = await getcourseBySemesterInTimetableEntry( semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch course with semester: ${semester}`)
    }
}

export const createLecturer = async (req: Request, res: Response) => {

    const {name,email,password_hash,role} = req.body as User;

    const result = await saveLecturer(name,email,password_hash,role);

    res.status(result.code).send(result.message)


}
export const findByLecturerId = async (req: Request, res: Response) => {
    const lecturer_id = req.params.lecturer_id as string;

    const result = await getLecturerById(lecturer_id);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch lecture with id: ${lecturer_id}`)
    }


}
export const addLecturercourse = async (req: Request, res: Response) => {
        const lecturer_id = req.params.lecturer_id

         const course_id = req.params.course_id as string;
         const course = await getcourseById(new ObjectId( course_id));
try{
    if(course == null){
       res.status(401).send(`course with id  ${course_id} not found`)
    }
    const timetableEntry: TimetableEntry[] = await getcourseByCodeInTimetableEntry(course.course_code); 

    const lecturer:Lecturer = await getLecturerById(lecturer_id);
    
    lecturer.assignedCourseList.push(course);
     const result1 =await updateTimetableEntry(lecturer.user_id,timetableEntry);
    const result = await updateLecturer(lecturer_id,lecturer);
    res.status(result.code).send(result.message+" and "+result1.message)
}catch(error){
    console.log(error)

}

}
 export const addBuilding = async  (req: Request, res: Response) => {

  const {  name, room_number,capacity} = req.body as Bulding;

   const result = await saveBuilding(name,room_number,capacity);

    res.status(result.code).send(result.message)

 }

  export const createTimeTable = async  (req: Request, res: Response) => {

    const semester:number = parseInt(req.params.semester, 10);

   const result = await generateTimeTable(semester);

    res.status(200).send(result?.message)

 }

 export const autoGenerateStudentTimetable = async (req: Request, res: Response) => {
    const student_id = req.params.student_id as string;
    const student: Student = await getStudentById(student_id);
    if (student == null) {
        res.status(401).send(`student with student_id  ${student_id} not found`)
    }
    const courses: Course[] = student.enrolled_courses;
    const timetableEntry: TimetableEntry[] = await getTimetableEntry(courses) as unknown as TimetableEntry[];
        res.status(200).send(timetableEntry);
    }

     export const autoGenerateLectureTimetable = async (req: Request, res: Response) => {
    const lecturer_id = req.params.lecturer_id as string;
    const lecture: Lecturer = await getLecturerById(lecturer_id);
    if (lecture == null) {
        res.status(401).send(`lecture with lecture_id  ${lecturer_id} not found`)
    }

    const course_codes: Course[] = lecture.assignedCourseList;
    const timetableEntry: TimetableEntry[] = await getTimetableEntry(course_codes) as unknown as TimetableEntry[];
        res.status(200).send(timetableEntry);
    }

    export const generateTimetable = async (req: Request, res: Response) => {
    const course_codes: Course[] = req.body;
    const timetableEntry: TimetableEntry[] = await getTimetableEntry(course_codes) as unknown as TimetableEntry[];
        res.status(200).send(timetableEntry);
    }

    export const updateTimetable = async (req: Request, res: Response) => {
    const updatedTimetable: Timetable = req.body;
    const timetable_id = req.params.timetable_id as unknown as ObjectId
    const result  = await alterTimetable(timetable_id ,updatedTimetable) 
        res.status(result.code).send(result.message);
    }

     export const saveTimetable = async (req: Request, res: Response) => {
     const timetable: Timetable = req.body;
    const result  = await createTimetable(timetable) 
        res.status(result.code).send(result.message);
    }

    





