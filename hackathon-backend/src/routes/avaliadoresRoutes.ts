

import { Router } from "express";
import avaliadorController from "../controllers/avaliadoresController";
import { validateAvaliador } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAvaliador, avaliadorController.createAvaliador);
router.get("/", avaliadorController.getAvaliadores);
router.get("/:id", avaliadorController.getAvaliador);
router.put("/:id", avaliadorController.updateAvaliador);
router.delete("/:id", avaliadorController.deleteAvaliador);

export default router;
