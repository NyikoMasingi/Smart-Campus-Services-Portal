import { ObjectId } from "mongodb";




export class Lesson{

    lecturer_email: string | null;
    lecturer_name: string | null;
    semester:number;
    year:number;
    building_id:ObjectId;
    location:string
    course_code:string;

    constructor(
        semester: number,
        year: number,
        building_id: ObjectId,
        location: string,
        course_code: string
    ) {
      
        this.semester = semester;
        this.year = year;
        this.building_id = building_id;
        this.location = location;
        this.course_code = course_code;
        this.lecturer_email=null;
        this.lecturer_name=null;
    }



}