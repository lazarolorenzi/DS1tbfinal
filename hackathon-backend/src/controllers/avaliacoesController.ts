import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacoesService";
import { Avaliacao } from "../models/avaliacoesModel";

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoData: Avaliacao = req.body;

      if (!avaliacaoData.avaliador_id || !avaliacaoData.equipe_id || !avaliacaoData.notas) {
        return res.status(400).json({ error: 'Dados da avaliação inválidos ou incompletos.' });
      }

      const avaliacao = await avaliacaoService.createAvaliacao(avaliacaoData);
      return res.status(201).json(avaliacao);
    } catch (error: any) {
      console.error("Erro ao criar avaliação:", error);
      if (error.message === 'Avaliador ou equipe não encontrados.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({
        error: "Erro interno do servidor ao criar avaliação",
        details: error.message,
      });
    }
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.getAllAvaliacoes();
      return res.status(200).json(avaliacoes); // Retorna 200 mesmo se não houver avaliações
    } catch (error: any) {
      console.error("Erro ao buscar avaliações:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar avaliações" });
    }
  }

  async getAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const avaliacao = await avaliacaoService.getAvaliacaoById(avaliacaoId);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      } else {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }
    } catch (error: any) {
      console.error("Erro ao buscar avaliação:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar avaliação" });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const updateData: Partial<Avaliacao> = req.body;

      if (!avaliacaoId || !updateData) {
        return res.status(400).json({ error: 'Dados da avaliação inválidos ou incompletos.' });
      }

      const avaliacao = await avaliacaoService.updateAvaliacao(avaliacaoId, updateData);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      } else {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar avaliação:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao atualizar avaliação" });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      await avaliacaoService.deleteAvaliacao(avaliacaoId);
      return res.status(204).json({});
    } catch (error: any) {
      console.error("Erro ao deletar avaliação:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao deletar avaliação" });
    }
  }
}

export default new AvaliacaoController();

