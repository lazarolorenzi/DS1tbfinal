
import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacoesService";
import { Avaliacao } from "../models/avaliacoesModel";

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoData: Avaliacao = req.body;
      const avaliacao = await avaliacaoService.createAvaliacao(avaliacaoData);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: "Erro criando avaliação" });
    }
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoService.getAllAvaliacoes();
      if (avaliacoes) {
        return res.status(200).json(avaliacoes);
      }
      return res.status(404).json({ error: "Erro criando avaliacao" });
    } catch (error) {
      return res.status(500).json({ error: "Erro pegando avaliacoes" });
    }
  }

  async getAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const avaliacao = await avaliacaoService.getAvaliacaoById(avaliacaoId);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao nao foi encontrada" });
    } catch (error) {
      return res.status(500).json({ error: "Erro pegando avaliacoes" });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      const updateData: Partial<Avaliacao> = req.body;
      const avaliacao = await avaliacaoService.updateAvaliacao(avaliacaoId, updateData);
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao nao foi encontrada" });
    } catch (error) {
      return res.status(500).json({ error: "Erro modificando avaliacao" });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaoId = Number(req.params.id);
      await avaliacaoService.deleteAvaliacao(avaliacaoId);
      return res.status(200).json({ message: "Avaliacao excluida com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro deletando avaliacao" });
    }
  }
}

export default new AvaliacaoController();
