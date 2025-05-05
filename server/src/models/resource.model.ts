import { ObjectId } from "mongodb";
 

export type ResourceType =  'room' | 'equipment' | 'vehicle' | 'other';
export type ResourceStatus = 'available' | 'booked' | 'maintenance' | 'inactive';

export default class Resource {
    public _id?: ObjectId;
    public name: string;
    public type: ResourceType;
    public status: ResourceStatus;
    public location: string;

    constructor(
        name: string,
        type: ResourceType,
        status: ResourceStatus,
        location: string
    ){
        this.name = name;
        this.type = type;
        this.status = status;
        this.location = location;
    }
}
