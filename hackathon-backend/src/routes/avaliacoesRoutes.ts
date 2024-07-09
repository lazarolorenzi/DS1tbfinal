

import { Router } from "express";
import avaliacaoController from "../controllers/avaliacoesController";
import { validateAvaliacao } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAvaliacao, avaliacaoController.createAvaliacao);
router.get("/", avaliacaoController.getAvaliacoes);
router.get("/:id", avaliacaoController.getAvaliacao);
router.put("/:id", avaliacaoController.updateAvaliacao);
router.delete("/:id", avaliacaoController.deleteAvaliacao);

export default router;
