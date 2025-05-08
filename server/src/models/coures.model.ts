
import { ObjectId } from "mongodb";



export default class Course {
    course_id!: ObjectId ;
    name: string;
    year: number;
    semester:number;
    coures_code:string;
    constructor(
        name: string,
        year: number,
        semester:number,
        coures_code:string,
    ){
        this.coures_code=coures_code;
        this.name=name;
        this.semester=semester;
        this.year= year;
    }
}