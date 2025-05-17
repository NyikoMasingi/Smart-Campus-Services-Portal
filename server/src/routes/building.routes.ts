import express from "express";
import {
  createBuilding,
  getAllBuildings,
  getBuildingById,
  updateBuilding,
  deleteBuilding
} from "../controllers/building.controller";

const router = express.Router();

router.post("/", createBuilding);
router.get("/", getAllBuildings);
router.get("/:id", getBuildingById);
router.put("/:id", updateBuilding);
router.delete("/:id", deleteBuilding);

export default router;
