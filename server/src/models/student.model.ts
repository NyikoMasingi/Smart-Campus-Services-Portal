import Course from "./course.model";

import {generateIdNumber} from "../ulits/random.uilts";
import { ObjectId } from 'mongodb';


export default class Student {
    user_id:ObjectId;
    student_id: string ;
    enrolled_courses: Course[];

    constructor(
        user_id:ObjectId
    ){
        this.user_id=user_id;
        this.enrolled_courses = [];
        this.student_id=generateIdNumber();
    }
     
  
  


   

}