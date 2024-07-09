import { Request, Response } from "express";
import equipeService from "../services/equipesService";
import { Equipe } from "../models/equipesModel";

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeData: Equipe = req.body;

      if (!equipeData.nome) {
        return res.status(400).json({ error: "O nome da equipe é obrigatório." });
      }

      const equipe = await equipeService.createEquipe(equipeData);
      return res.status(201).json(equipe);
    } catch (error: any) {
      console.error("Erro ao criar equipe:", error);
      return res.status(500).json({
        error: "Erro do servidor ao criar equipe",
        details: error.message
      });
    }
  }

  async getEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await equipeService.getAllEquipes();
      return res.status(200).json(equipes);
    } catch (error: any) {
      console.error("Erro ao buscar equipes:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar equipes" });
    }
  }

  async getEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      const equipe = await equipeService.getEquipeById(equipeId);

      if (!equipe) {
        return res.status(404).json({ error: "Equipe não encontrada." });
      }

      return res.status(200).json(equipe);
    } catch (error: any) {
      console.error("Erro ao buscar equipe:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar equipe" });
    }
  }

  async updateEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      const updateData: Partial<Equipe> = req.body;

      if (!equipeId || !updateData.nome) {
        return res.status(400).json({ error: "Dados da equipe inválidos ou incompletos." });
      }

      const equipe = await equipeService.updateEquipe(equipeId, updateData);

      if (!equipe) {
        return res.status(404).json({ error: "Equipe não encontrada." });
      }

      return res.status(200).json(equipe);
    } catch (error: any) {
      console.error("Erro ao atualizar equipe:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao atualizar equipe" });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipeId = Number(req.params.id);
      await equipeService.deleteEquipe(equipeId);
      return res.status(204).json({});
    } catch (error: any) {
      console.error("Erro ao deletar equipe:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao deletar equipe" });
    }
  }
}

export default new EquipeController();
