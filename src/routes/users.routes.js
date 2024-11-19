import { Router } from "express";
import {
  createColaboracion,
  deleteColaboracion,
  getAllColaboraciones,
  getColaboracionById,
  updateColaboracion,
} from "../controllers/colaboracion.controllers.js"; //Nombre del controler

const router = Router();

router.get("/colaboraciones", getAllColaboraciones);
router.get("/colaboraciones/:id", getColaboracionById);
router.post("/colaboraciones", createColaboracion);
router.delete("/colaboraciones/:id", deleteColaboracion);
router.put("/colaboraciones/:id", updateColaboracion);

export default router;
