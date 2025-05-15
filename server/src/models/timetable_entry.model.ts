

import { ObjectId } from "mongodb";
import TimeSlot  from "./time_slot.model"
import {Lesson } from './lesson.model';


export default class TimetableEntry{
    _id!:ObjectId;
    name:string;
    lesson:Lesson;
    timeSlot:TimeSlot;
    constructor(
        name:string,
        lesson:Lesson,
        timeSlot:TimeSlot
    ){
        this.name=name;
        this.lesson=lesson;
        this.timeSlot=timeSlot;
    }

 
   
    
}
