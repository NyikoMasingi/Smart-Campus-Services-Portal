import { collections} from '../config/db_config';
import Course from  '../models/course.model';
import { ObjectId } from 'mongodb';
import Student from '../models/student.model';
import User, { UserRole } from '../models/user.model';
import Lecturer from '../models/lecturer.model';
import Bulding from '../models/bulding.model';
import TimeSlot, { Day } from '../models/time_slot.model';
import { Lesson } from '../models/lesson.model';
import TimetableEntry from '../models/timetable_entry.model';
import Timetable from '../models/timetable.model';





    export const savecourse = async (name: string, year: number, semester: number, course_code: string) =>{
      const result = collections.course?.insertOne(new Course(name,year,semester,course_code));

        if(result){
           return {code:200,message:`Successfully created a new course with id: ${(await result).insertedId}` ,}
           }else{
            return{ code: 500, message:'Failed to create a new course'};
           }
      }

      export const saveBuilding = async (name: string, room_number: number, capacity:number) =>{
      const result = collections.building?.insertOne(new Bulding(name,room_number,capacity));

        if(result){
           return {code:200,message:`Successfully created a new buiilding with id: ${(await result).insertedId}` ,}
           }else{
            return{ code: 500, message:'Failed to create a new buiilding'};
           }
      }
      export const saveStudent = async (name: string, email: string, password_hash: string,role:UserRole) =>{


        const result = await collections.users?.insertOne(new User(role,name,email,password_hash));
        if (result) {
            const result2 = collections.stundent?.insertOne(new Student(result.insertedId));
            if(result2){
              return {code:200,message:`Successfully created a new student with id: ${(await result2).insertedId} user_id ref: ${result.insertedId}` ,}
              }else{
               return{ code: 500, message:'Failed to create a new Student'};
              }
        } else {
            return { code: 500, message: 'Failed to create a new Student' };
        }

        
        
  
         
        }

      export const saveLecturer = async (name: string, email: string, password_hash: string,role:UserRole) =>{


        const result = await collections.users?.insertOne(new User(role,name,email,password_hash));
        if (result) {
            const result2 = collections.lecturer?.insertOne(new Lecturer(result.insertedId));
            if(result2){
              return {code:200,message:`Successfully created a new lecturer with id: ${(await result2).insertedId} user_id ref: ${result.insertedId}` ,}
              }else{
               return{ code: 500, message:'Failed to create a new Lecturer'};
              }
        } else {
            return { code: 500, message: 'Failed to create a new Lecturer' };
        }

        
        
  
         
        }
        export const updateLecturer = async (lecturer_id:string, updatedLecturer:Lecturer) =>{

          const query ={lecturer_id:lecturer_id}
          const result = collections.lecturer?.findOneAndUpdate(query,  { $set: updatedLecturer });
    
            if(result){
               return {code:200,message:`Successfully added course to lecturer` ,}
               }else{
                return{ code: 500, message:'Failed to added course to lecturer'};
               }
          }
         export const updateTimetableEntry = async (user_id:ObjectId, entries:TimetableEntry[]) =>{

          const query ={_id:user_id}
          const lecturer = await collections.users?.findOne(query) as User | null;
          if (!lecturer) {
            throw new Error('Lecturer User not found');
          }
          
          for(let i =0;i<entries.length;i++){
           entries[i].lesson.lecturer_email=lecturer.email;
           entries[i].lesson.lecturer_name=lecturer.name;
             const query ={_id: entries[i]._id}
          const result  = await collections.timetableEntry?.updateMany(query,{ $set: entries[i] } )
          if(!result){
            return{ code: 500, message:'Failed to added  to lecturer to timetble entry'};
          }
          }
               return {code:200,message:`Successfully added lecture to timetable entry ` ,}   
          }
         export const updateStudent = async (student_id:string, updatedStudent:Student) =>{

          const query ={student_id:student_id}
          const result = collections.stundent?.findOneAndUpdate(query,  { $set: updatedStudent });
    
            if(result){
               return {code:200,message:`Successfully added course to student` ,}
               }else{
                return{ code: 500, message:'Failed to added course to student'};
               }
          }

      export const getAllcourse = async () =>{        
        const course : Course[] = await collections.course?.find().toArray() as unknown as Course[];
        return course
         
        }

        export const getcourseById = async (course_id:ObjectId) =>{ 
          const query = {_id:course_id }       
          const course : Course= await collections.course?.findOne(query) as unknown as Course;
           return course;
          }
          export const getStudentById = async (student_id:string) =>{ 
            const query = {student_id:student_id }       
            const student:Student = await collections.stundent?.findOne(query) as unknown as Student
            // .then(async studentDetail => {
            //   studentDetail!.user_id=await collections.users?.findOne({_id:studentDetail?.user_id});
            //   return studentDetail;
            // })
            
           
             return student;
            }
           export const getLecturerById = async (lecturer_id:string) =>{ 
            const query = {lecturer_id:lecturer_id }       
            const lecturer:Lecturer = await collections.lecturer?.findOne(query) as unknown as Lecturer
            
           
             return lecturer;
            }

          
      
          export const getcourseByCode = async (course_code:string) =>{ 
            const query = {course_code:course_code};    
            const course : Course= await collections.course?.findOne(query) as unknown as Course;
            return course;
      
            }

            export const getcourseByYearAndSemester = async (year:number,semester:number) =>{ 
              const query = {year: year, semester:semester}       
              const course : Course[]= await collections.course?.find(query).toArray() as unknown as Course[];
              return course;
        
              }

              export const getcourseByYear = async (year:number) =>{ 
                const query = {year: year}       
                const course : Course[]= await collections.course?.find(query).toArray() as unknown as Course[];
          
               return course;

                }
                export const getcourseBySemester = async (semester:number) =>{ 
                  const query = {semester:semester}       
                  const course : Course[]= await collections.course?.find(query).toArray() as unknown as Course[];
            
                  return course;
                  }


                  export const getcourseByName = async (name:string) =>{ 
                    const query = {name:name}       
                    const course : Course[]= await collections.course?.findOne(query) as unknown as Course[];
              
                      if(course){
                         return {code:200,course,}
                         }else{
                          return{ code: 401, message: `Failed to fetch course with name: ${name}`};
                         }
                    }

                export const generateTimeTable = async (semester:number) =>{ 
                    const builings: Bulding[] = await collections.building?.find().toArray() as unknown as Bulding[];
                    const query= { semester: semester}
                    const semester_course: Course[] = await collections.course?.find(query).toArray() as unknown as Course[];
                    const weekdays:Day[]=["MONDAY", "TUESDAY","WEDNESDAY", "THURSDAY" , "FRIDAY"];
                    const hours:number[]= [8,10,12,14];

                    const usedSlot: Set<string> = new Set<string>;

                    for(const current_course of semester_course){
                      for(let i=0; i<3 ;i++){
                            let startHour:number;
                            let dayOfWeek:Day;
                            let current_building:Bulding;
                            let key:string;

                            do{
                              dayOfWeek=getRandom<Day>(weekdays);
                              startHour=getRandom<number>(hours)
                              current_building=getRandom<Bulding>(builings);
                              key = `${current_building._id}-${startHour}-${dayOfWeek}`

                            }while(usedSlot.has(key))
                            usedSlot.add(key);
                            const lesson: Lesson = new Lesson(current_course.semester,current_course.year,current_building._id,current_building.name+" room: "+current_building.room_number,current_course.course_code);
                            const starTime:string= startHour+":00";
                            const endHour: number=startHour+2;
                            const endTime:string=endHour+":00";
                            const timeslot: TimeSlot = new TimeSlot(dayOfWeek,starTime,endTime);                         

                             await collections.timetableEntry?.insertOne(new TimetableEntry(
                                   "semester: "+semester,
                                      lesson,
                                      timeslot
                            )
                            )
                              

                      }

                    }
                    return {code:200 ,message:`created timetable entries for semester: ${semester}`}

                    }
                    function getRandom<T>(array:T[]){
                      return array[Math.floor(Math.random()*array.length)]
                    } 

                     export const getcourseByCodeInTimetableEntry = async (course_code:string) =>{ 
                       const timetableEntry : TimetableEntry[] = (await collections.timetableEntry?.find().toArray())?.filter(
                    entry => entry.lesson.course_code === course_code 
                  ) as unknown as TimetableEntry[];
            
                  return timetableEntry;
      
            }

            export const getcourseByYearAndSemesterInTimetableEntry = async (year:number,semester:number) =>{ 
              const timetableEntry : TimetableEntry[] = (await collections.timetableEntry?.find().toArray())?.filter(
                    entry => entry.lesson.semester === semester && entry.lesson.year === year
                  ) as unknown as TimetableEntry[];
            
                  return timetableEntry;
        
              }

            export const getAllTimetaableEntries = async () =>{ 
              const timetableEntry : TimetableEntry[]= await collections.timetableEntry?.find().toArray() as unknown as TimetableEntry[];
              return timetableEntry;
        
              }
            

              export const getcourseByYearInTimetableEntry = async (year:number) =>{ 
                   const timetableEntry : TimetableEntry[] = (await collections.timetableEntry?.find().toArray())?.filter(
                    entry => entry.lesson.year === year
                  ) as unknown as TimetableEntry[];
            
                  return timetableEntry;

                }
                export const getcourseBySemesterInTimetableEntry = async (semester:number) =>{ 
                  
                  const timetableEntry : TimetableEntry[] = (await collections.timetableEntry?.find().toArray())?.filter(
                    entry => entry.lesson.semester === semester
                  ) as unknown as TimetableEntry[];
            
                  return timetableEntry;
                  }
                  export const getTimetableEntry = async (courses:Course[]) =>{ 
                   // const query = {"lesson.course_code": { $in: courses.map(course => course.course_code) }};
                    const timetableEntry : TimetableEntry[] = await collections.timetableEntry?.find().toArray() as unknown as TimetableEntry[];
                   const temp : string[]= await courses.map(course => course.course_code);
                    
                    const response :TimetableEntry[]=timetableEntry.filter(
                       entry =>{ return (temp.some(t => t === entry.lesson.course_code ));
                  });
                
                     
              
                    return response;
                    }
                  export const createTimetable = async ( timetable: Timetable) =>{
                      const result =  await collections.timetable?.insertOne(timetable);

                      if(result?.acknowledged){
                             return {code:200 ,message: `created new timetable with id: ${result.insertedId}`};
                       }else{
                             return {code:500 , message:`failed to created new timetable`};

                      }

                  }

                   export const alterTimetable = async (timetable_id:ObjectId, timetable: Timetable) =>{
                          const query = {_id : timetable_id};
                          const result = await collections.timetable?.updateOne(query,{ $set: timetable }) 

                          if(result?.modifiedCount){
                             return {code:200 ,message: `updated new timetable with id: ${result.upsertedId}`};

                          }else{
                             return {code:500 ,message: `failed to updated timetable`};

                          }
                    
                  }




    
