import { ObjectId } from "mongodb";
import * as crypto from 'crypto';


export type UserRole = 'student' | 'lecture' | 'maintaince-staff' | 'admin';

export default class User {
    public role: UserRole;
    public name: string;
    public email: string;
    public password_hash: string;
    public _id?: ObjectId;
    public createdAt: Date;
    public updatedAt?: Date;
    public isAcitve: boolean;

    constructor(
        role: UserRole,
        name: string,
        email: string,
        password_hash: string,
    ) {
        this.role = role;
        this.name = name;
        this.email = email;
        this.password_hash = crypto.createHash("sha256").update(password_hash).digest('hex');
        this.isAcitve = true;
        this.createdAt = new Date();
    }
  
}
