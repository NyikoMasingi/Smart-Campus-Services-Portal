import { ObjectId } from "mongodb";




export class Lesson{

    lecturer_email: string | null;
    lecturer_name: string | null;
    semester:number;
    lesson:number
    year:number;
    building_id:ObjectId;
    location:string
    coures_code:string;

    constructor(
        semester: number,
        lesson: number,
        year: number,
        building_id: ObjectId,
        location: string,
        coures_code: string
    ) {
      
        this.semester = semester;
        this.lesson = lesson;
        this.year = year;
        this.building_id = building_id;
        this.location = location;
        this.coures_code = coures_code;
        this.lecturer_email=null;
        this.lecturer_name=null;
    }



}