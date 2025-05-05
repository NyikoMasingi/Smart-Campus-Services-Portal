import { ObjectId } from "mongodb";
import { ResourceType } from "./resource.model";

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export default class Booking {
    public booking_id?: ObjectId;
    public user_id: ObjectId;
    public resource_id: ObjectId;
    public resource_type: ResourceType;
    public check_in_date: Date;
    public check_out_date: Date;
    public status: BookingStatus;
    public booking_date: Date;

    constructor(
        user_id: ObjectId,      
        resource_id: ObjectId,
        resource_type: ResourceType,
        check_in_date: Date,
        check_out_date: Date,
    ) { 
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.resource_type = resource_type;
        this.check_in_date = check_in_date;
        this.check_out_date = check_out_date;
        this.status = "pending"; // Set the initial status to 'pending'
        this.booking_date = new Date(); // Set the booking date to the current date
    }

}