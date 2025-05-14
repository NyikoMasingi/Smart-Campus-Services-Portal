import { ObjectId } from 'mongodb';
import TimetableEntry from './timetable_entry.model';


export default class Timetable{
       _id!:ObjectId;
       personal_id:string;
       name:string;
       entries:TimetableEntry[];
    
       constructor(
            personal_id:string,
            name:string,
            entries:TimetableEntry[],
        ) {
            this.personal_id = personal_id;
            this.name = name;
            this.entries = entries;
        }   


}