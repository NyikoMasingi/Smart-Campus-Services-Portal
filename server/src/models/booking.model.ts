import { ObjectId } from "mongodb";

export type BookingStatus = "pending" | "approved" | "rejected";

export default class Booking {
    _id!: ObjectId;
    buildingId: ObjectId;
    userId: ObjectId;
    startTime: Date;
    endTime: Date;
    purpose: string;
    status: BookingStatus;

    constructor(
        buildingId: ObjectId,
        userId: ObjectId,
        startTime: Date,
        endTime: Date,
        purpose: string,
        status: BookingStatus = "pending"
    ) {
        this.buildingId = buildingId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.status = status;
    }
}
