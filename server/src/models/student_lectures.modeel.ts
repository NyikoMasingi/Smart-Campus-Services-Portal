import { ObjectId } from 'mongodb';


export default class StudentLectures{
       _id!:ObjectId;
       student_id:string;
       lecture_id:string;
       coures_code:string;
       constructor(
         lecture_id:string,
         student_id:string,                
         coures_code:string
       ){
         this.lecture_id=lecture_id;
         this.student_id=student_id;
         this.coures_code=coures_code;
       }

}