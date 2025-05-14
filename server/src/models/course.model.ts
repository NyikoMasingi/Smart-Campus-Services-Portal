
import { ObjectId } from "mongodb";



export default class Course {
    course_id!: ObjectId ;
    name: string;
    year: number;
    semester:number;
    course_code:string;
    constructor(
        name: string,
        year: number,
        semester:number,
        course_code:string,
    ){
        this.course_code=course_code;
        this.name=name;
        this.semester=semester;
        this.year= year;
    }
}