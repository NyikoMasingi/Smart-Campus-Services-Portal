import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/db_config";
import Ticket from "../models/Ticket.model";

// Create ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, description, location, imageUrls } = req.body;

    if (!user_id || !description || !location) {
      res.status(400).json({ message: "user_id, description, and location are required" });
      return;
    }

    const userObjectId = new ObjectId(user_id);
    const user = await collections.users?.findOne({ _id: userObjectId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const ticket = new Ticket(userObjectId, description, location, imageUrls || []);
    const result = await collections.tickets?.insertOne(ticket);

    if (result?.insertedId) {
      res.status(201).json({ message: "Ticket created", id: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create ticket" });
    }
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all tickets
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await collections.tickets?.find().toArray();
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get ticket by ID
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await collections.tickets?.findOne({ _id: new ObjectId(req.params.id) });
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update ticket status
export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!["pending", "attended", "unattended"].includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const result = await collections.tickets?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: "Ticket status updated" });
    } else {
      res.status(404).json({ message: "Ticket not found or unchanged" });
    }
  } catch (err) {
    console.error("Error updating ticket status:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assign a ticket
export const assignTicket = async (req: Request, res: Response) => {
  try {
    const { maintenance_user_id } = req.body;
    const user = await collections.users?.findOne({ _id: new ObjectId(maintenance_user_id) });

    if (!user) {
      res.status(404).json({ message: "Maintenance personnel not found" });
      return;
    }

    const result = await collections.tickets?.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          assigned_to: new ObjectId(maintenance_user_id),
          updatedAt: new Date(),
        }
      }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: "Ticket assigned successfully" });
    } else {
      res.status(404).json({ message: "Ticket not found or assignment failed" });
    }
  } catch (err) {
    console.error("Error assigning ticket:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete ticket
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const result = await collections.tickets?.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result?.deletedCount) {
      res.status(200).json({ message: "Ticket deleted successfully" });
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
