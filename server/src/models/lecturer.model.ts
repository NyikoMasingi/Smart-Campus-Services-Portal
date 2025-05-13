import { generateIdNumber } from "../ulits/random.uilts";
import Course from "./coures.model";
import { ObjectId } from "mongodb";


export default class Lecturer {
       user_id:ObjectId; 
       lecturer_id:string;
       assignedCourseList: Course[];

        constructor(
        user_id:ObjectId
    ){
        this.user_id=user_id;
        this.assignedCourseList = [];
        this.lecturer_id=generateIdNumber();
    }
       

}