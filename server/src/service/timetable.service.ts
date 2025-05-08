import { collections} from '../config/db_config';
import Course from '../models/coures.model';
import { ObjectId } from 'mongodb';
import Student from '../models/student.model';
import User, { UserRole } from '../models/user.model';




    export const saveCoures = async (name: string, year: number, semester: number, coures_code: string) =>{
      const result = collections.coures?.insertOne(new Course(name,year,semester,coures_code));

        if(result){
           return {code:200,message:`Successfully created a new course with id: ${(await result).insertedId}` ,}
           }else{
            return{ code: 500, message:'Failed to create a new Coures'};
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

        export const updateStudent = async (student_id:string, updatedStudent:Student) =>{

          const query ={student_id:student_id}
          const result = collections.stundent?.findOneAndUpdate(query,  { $set: updatedStudent });
    
            if(result){
               return {code:200,message:`Successfully added coures to student` ,}
               }else{
                return{ code: 500, message:'Failed to added coures to student'};
               }
          }

      export const getAllCoures = async () =>{        
        const coures : Course[] = await collections.coures?.find().toArray() as unknown as Course[];
        return coures
         
        }

        export const getCouresById = async (course_id:ObjectId) =>{ 
          const query = {course_id:course_id }       
          const coures : Course= await collections.coures?.findOne(query) as unknown as Course;
           return coures;
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

          
      
          export const getCouresByCode = async (coures_code:string) =>{ 
            const query = {coures_code:coures_code};    
            const coures : Course= await collections.coures?.findOne(query) as unknown as Course;
            return coures;
      
            }

            export const getCouresByYearAndSemester = async (year:number,semester:number) =>{ 
              const query = {year: year, semester:semester}       
              const coures : Course[]= await collections.coures?.find(query).toArray() as unknown as Course[];
              return coures;
        
              }

              export const getCouresByYear = async (year:number) =>{ 
                const query = {year: year}       
                const coures : Course[]= await collections.coures?.find(query) as unknown as Course[];
          
                  if(coures){
                     return {code:200,coures,}
                     }else{
                      return{ code: 401, message: `Failed to fetch coures with year: ${year} `};
                     }
                }
                export const getCouresBySemester = async (semester:number) =>{ 
                  const query = {semester:semester}       
                  const coures : Course[]= await collections.coures?.find(query) as unknown as Course[];
            
                    if(coures){
                       return {code:200,coures,}
                       }else{
                        return{ code: 401, message: `Failed to fetch coures with semester: ${semester}`};
                       }
                  }

                  export const getCouresByName = async (name:string) =>{ 
                    const query = {name:name}       
                    const coures : Course[]= await collections.coures?.findOne(query) as unknown as Course[];
              
                      if(coures){
                         return {code:200,coures,}
                         }else{
                          return{ code: 401, message: `Failed to fetch coures with name: ${name}`};
                         }
                    }


    
