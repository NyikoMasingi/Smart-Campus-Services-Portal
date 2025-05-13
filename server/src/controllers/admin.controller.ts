import { Request, Response } from 'express';
import Course from '../models/coures.model';
import { saveCoures, getAllCoures , getCouresById, getCouresByCode, getCouresByYearAndSemester, saveStudent, getStudentById, updateStudent, saveLecturer, getLecturerById, updateLecturer, saveBuilding, getCouresByYear, getCouresBySemester, generateTimeTable, getCouresByCodeInTimetableEntry, getCouresByYearAndSemesterInTimetableEntry, getCouresByYearInTimetableEntry, getCouresBySemesterInTimetableEntry, getAllTimetaableEntries, updateTimetableEntry,  } from '../service/timetable.service';
import { ObjectId } from 'mongodb';
import User from '../models/user.model';
import Student from '../models/student.model';
import Lecturer from '../models/lecturer.model';
import Bulding from '../models/bulding.model';
import TimetableEntry from '../models/timetable_entry.model';

export const createCoures = async (req: Request, res: Response) => {

    const {name,year,semester,coures_code} = req.body as Course;

    const result = await saveCoures(name,year,semester,coures_code);

    res.status(result.code).send(result.message)
}


export const createStudent = async (req: Request, res: Response) => {

    const {name,email,password_hash,role} = req.body as User;

    const result = await saveStudent(name,email,password_hash,role);

    res.status(result.code).send(result.message)
}
export const addStudentCoures = async (req: Request, res: Response) => {

    const course_id = req.params.course_id as unknown as ObjectId;
    const student_id = req.params.student_id
try{
    const course:Course = await getCouresById(course_id);
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

export const findAllCoures = async (req: Request, res: Response) => {
    
    const result = await getAllCoures();

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


export const findCouresById = async (req: Request, res: Response) => {

    const course_id = req.params.course_id as unknown as ObjectId;

    const result = await getCouresById(course_id);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch coures with id: ${course_id}`)
    }
}


export const findCouresByCode = async (req: Request, res: Response) => {

    const coures_code = req.params.course_code;

    const result = await getCouresByCode(coures_code);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch  with code: ${coures_code}`)
    }
}

export const findCouresByYearAndSemester = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);
    const semester:number = parseInt(req.params.semester, 10);

    const result = await getCouresByYearAndSemester(year, semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with year: ${year} and semester: ${semester}`)
    }
}


export const findCouresByYear = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);

    const result = await getCouresByYear(year);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with year: ${year}}`)
    }
}

export const findCouresBySemester = async (req: Request, res: Response) => {

    const semester:number = parseInt(req.params.semester, 10);

    const result = await getCouresBySemester( semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with semester: ${semester}`)
    }
}


export const findInTimetableEntryCouresByCode = async (req: Request, res: Response) => {

    const coures_code = req.params.course_code;

    const result = await getCouresByCodeInTimetableEntry(coures_code);

    if(result){
        res.status(200).send(result)
        }else{
         res.status(401).send( `Failed to fetch  with code: ${coures_code}`)
    }
}

export const findInTimetableEntryCouresByYearAndSemester = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);
    const semester:number = parseInt(req.params.semester, 10);

    const result = await getCouresByYearAndSemesterInTimetableEntry(year, semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with year: ${year} and semester: ${semester}`)
    }
}


export const findInTimetableEntryCouresByYear = async (req: Request, res: Response) => {

    const year:number = parseInt(req.params.year, 10);

    const result = await getCouresByYearInTimetableEntry(year);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with year: ${year}}`)
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

export const findInTimetableEntryCouresBySemester = async (req: Request, res: Response) => {

    const semester:number = parseInt(req.params.semester, 10);

    const result = await getCouresBySemesterInTimetableEntry( semester);

    if(result){
        res.status(200).send(JSON.stringify(result))
        }else{
         res.status(401).send( `Failed to fetch coures with semester: ${semester}`)
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
export const addLecturerCoures = async (req: Request, res: Response) => {
        const course_id = req.params.course_id as unknown as ObjectId;
        const lecturer_id = req.params.lecturer_id
try{
    const course:Course = await getCouresById(course_id);
    if(course == null){
       res.status(401).send(`course with id  ${course_id} not found`)
    }
    const timetableEntry: TimetableEntry[] = await getCouresByCodeInTimetableEntry(course.coures_code); 

    const lecturer:Lecturer = await getLecturerById(lecturer_id);

    
    lecturer.assignedCourseList.push(course);
     await updateTimetableEntry(lecturer.user_id,timetableEntry);
    const result = await updateLecturer(lecturer_id,lecturer);
    res.status(result.code).send(result.message)
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



