

import { Router } from "express";
import equipeController from "../controllers/equipesController";
import { validateEquipe } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateEquipe, equipeController.createEquipe);
router.get("/", equipeController.getEquipes);
router.get("/:id", equipeController.getEquipe);
router.put("/:id", equipeController.updateEquipe);
router.delete("/:id", equipeController.deleteEquipe);

export default router;
