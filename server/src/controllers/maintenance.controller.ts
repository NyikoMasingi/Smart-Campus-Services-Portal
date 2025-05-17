import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/db_config";
import MaintenancePersonnel from "../models/maintenancePersonnel.model";

// Create Maintenance Personnel
export const createMaintenancePersonnel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, department } = req.body;

    if (!user_id || !department) {
      res.status(400).json({ message: "user_id and department are required" });
      return;
    }

    const userObjectId = new ObjectId(user_id);

    // Check if user exists
    const existingUser = await collections.users?.findOne({ _id: userObjectId });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // check if this user is already a maintenancePersonnel
    const alreadyAssigned = await collections.maintenancePersonnel?.findOne({ user_id: userObjectId });
    if (alreadyAssigned) {
      res.status(409).json({ message: "User is already assigned as maintenance personnel" });
      return;
    }

    const maintenance = new MaintenancePersonnel(userObjectId, department);

    const result = await collections.maintenancePersonnel?.insertOne(maintenance);
    if (result?.insertedId) {
      res.status(201).json({ message: "Maintenance personnel created", id: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create maintenance personnel" });
    }
  } catch (error) {
    console.error("Error creating maintenance personnel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get all Maintenance Personnel
export const getAllMaintenancePersonnel = async (_req: Request, res: Response): Promise<void> => {
  try {
    const personnel = await collections.maintenancePersonnel?.find().toArray();
    res.status(200).json(personnel);
  } catch (error) {
    console.error("Error fetching maintenance personnel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Maintenance Personnel by ID
export const getMaintenancePersonnelById = async (req: Request, res: Response): Promise<void> => {
  try {
    const person = await collections.maintenancePersonnel?.findOne({ _id: new ObjectId(req.params.id) });
    if (!person) {
      res.status(404).json({ message: "Maintenance personnel not found" });
    } else {
      res.status(200).json(person);
    }
  } catch (error) {
    console.error("Error fetching maintenance personnel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Maintenance Personnel
export const updateMaintenancePersonnel = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPerson = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await collections.maintenancePersonnel?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedPerson }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: "Maintenance personnel updated successfully" });
    } else {
      res.status(404).json({ message: "Personnel not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating maintenance personnel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Maintenance Personnel
export const deleteMaintenancePersonnel = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await collections.maintenancePersonnel?.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result?.deletedCount) {
      res.status(200).json({ message: "Maintenance personnel deleted successfully" });
    } else {
      res.status(404).json({ message: "Maintenance personnel not found" });
    }
  } catch (error) {
    console.error("Error deleting maintenance personnel:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
