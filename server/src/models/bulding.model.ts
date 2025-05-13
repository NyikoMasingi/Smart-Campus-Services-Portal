import { ObjectId } from "mongodb";


export default class Bulding{
    _id!:ObjectId;
    name:string;
    room_number:number;
    capacity:number;
    constructor(
        name:string,
        room_number:number,
        capacity:number
    ){
        this.name=name;
        this.room_number=room_number;
        this.capacity=capacity;
    }


}