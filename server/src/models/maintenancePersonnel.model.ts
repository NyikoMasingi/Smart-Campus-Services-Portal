import { ObjectId } from "mongodb";
import { generateIdNumber } from "../ulits/random.uilts";

export default class MaintenancePersonnel {
  user_id: ObjectId;
  maintenance_id: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user_id: ObjectId, department: string) {
    this.user_id = user_id;
    this.maintenance_id = generateIdNumber();
    this.department = department;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
