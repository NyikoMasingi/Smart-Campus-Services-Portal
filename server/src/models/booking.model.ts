import { ObjectId } from 'mongodb';

export default class Booking {
    _id!: ObjectId;
    buildingId: ObjectId;
    userId: ObjectId;
    startTime: Date;
    endTime: Date;
    purpose: string;
    status: 'pending' | 'approved' | 'rejected';

    constructor(
        buildingId: ObjectId,
        userId: ObjectId,
        startTime: Date,
        endTime: Date,
        purpose: string,
        status: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {
        this.buildingId = buildingId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.status = status;
    }
}
