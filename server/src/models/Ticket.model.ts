import { ObjectId } from "mongodb";

export type TicketStatus = "pending" | "attended" | "unattended";

export default class Ticket {
  user_id: ObjectId;
  ticket_id: string;
  description: string;
  location: string;
  imageUrls: string[]; // Store URLs or base64 (depending on your design)
  status: TicketStatus;
  assigned_to?: ObjectId; // Maintenance personnel user_id
  createdAt: Date;
  updatedAt: Date;

  constructor(
    user_id: ObjectId,
    description: string,
    location: string,
    imageUrls: string[]
  ) {
    this.user_id = user_id;
    this.ticket_id = `TICKET-${Date.now().toString(36)}`;
    this.description = description;
    this.location = location;
    this.imageUrls = imageUrls;
    this.status = "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
