import { Router } from "express";
import {
  createMaintenancePersonnel,
  getAllMaintenancePersonnel,
  getMaintenancePersonnelById,
  updateMaintenancePersonnel,
  deleteMaintenancePersonnel,
} from "../controllers/maintenance.controller";

const router = Router();

router.post("/", createMaintenancePersonnel);
router.get("/", getAllMaintenancePersonnel);
router.get("/:id", getMaintenancePersonnelById);
router.put("/:id", updateMaintenancePersonnel);
router.delete("/:id", deleteMaintenancePersonnel);

export default router;
