import { Request, Response } from "express";
import avaliadorService from "../services/avaliadoresService";
import { Avaliador } from "../models/avaliadoresModel";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorData: Avaliador = req.body;

      if (!avaliadorData.nome || !avaliadorData.login || !avaliadorData.senha) {
        return res.status(400).json({ error: "Dados do avaliador inválidos ou incompletos." });
      }

      const avaliador = await avaliadorService.createAvaliador(avaliadorData);
      return res.status(201).json(avaliador);
    } catch (error: any) {
      console.error("Erro ao criar avaliador:", error); // Log de erro detalhado
      if (error.message === 'Login já existe') {
        return res.status(409).json({ error: error.message }); // Erro 409 para conflito (login duplicado)
      }
      return res.status(500).json({
        error: "Erro interno do servidor ao criar avaliador",
        details: error.message,
      });
    }
  }
  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorService.getAllAvaliadores();
      return res.status(200).json(avaliadores); // Retorna 200 mesmo se não houver avaliadores
    } catch (error: any) {
      console.error("Erro ao buscar avaliadores:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar avaliadores" });
    }
  }

  async getAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      const avaliador = await avaliadorService.getAvaliadorById(avaliadorId);
      if (avaliador) {
        return res.status(200).json(avaliador);
      } else {
        return res.status(404).json({ error: "Avaliador não encontrado" });
      }
    } catch (error: any) {
      console.error("Erro ao buscar avaliador:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar avaliador" });
    }
  }

  async updateAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      const updateData: Partial<Avaliador> = req.body;

      if (!avaliadorId || !updateData) {
        return res.status(400).json({ error: 'Dados do avaliador inválidos ou incompletos.' });
      }

      const avaliador = await avaliadorService.updateAvaliador(
          avaliadorId,
          updateData
      );
      if (avaliador) {
        return res.status(200).json(avaliador);
      } else {
        return res.status(404).json({ error: "Avaliador não encontrado" });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar avaliador:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao atualizar avaliador" });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      await avaliadorService.deleteAvaliador(avaliadorId);
      return res.status(204).json({}); // 204 No Content após exclusão bem-sucedida
    } catch (error: any) {
      console.error("Erro ao deletar avaliador:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao deletar avaliador" });
    }
  }
}

export default new AvaliadorController();
