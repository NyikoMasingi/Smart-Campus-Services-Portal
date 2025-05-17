import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../config/db_config";
import Bulding from "../models/bulding.model";

// Create a building
export const createBuilding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, room_number, capacity } = req.body;

    if (!name || room_number === undefined || capacity === undefined) {
      res.status(400).json({ message: "name, room_number, and capacity are required" });
      return;
    }

    const building = new Bulding(name, room_number, capacity);
    const result = await collections.building?.insertOne(building);

    if (result?.insertedId) {
      res.status(201).json({ message: "Building created", id: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create building" });
    }
  } catch (err) {
    console.error("Error creating building:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all buildings
export const getAllBuildings = async (_req: Request, res: Response) => {
  try {
    const buildings = await collections.building?.find().toArray();
    res.status(200).json(buildings);
  } catch (err) {
    console.error("Error fetching buildings:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get building by ID
export const getBuildingById = async (req: Request, res: Response) => {
  try {
    const building = await collections.building?.findOne({ _id: new ObjectId(req.params.id) });
    if (!building) {
      res.status(404).json({ message: "Building not found" });
      return;
    }
    res.status(200).json(building);
  } catch (err) {
    console.error("Error fetching building:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update building
export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { name, room_number, capacity } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (room_number !== undefined) updateData.room_number = room_number;
    if (capacity !== undefined) updateData.capacity = capacity;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No fields provided for update" });
      return;
    }

    const result = await collections.building?.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: "Building updated successfully" });
    } else {
      res.status(404).json({ message: "Building not found or unchanged" });
    }
  } catch (err) {
    console.error("Error updating building:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete building
export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const result = await collections.building?.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result?.deletedCount) {
      res.status(200).json({ message: "Building deleted successfully" });
    } else {
      res.status(404).json({ message: "Building not found" });
    }
  } catch (err) {
    console.error("Error deleting building:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
