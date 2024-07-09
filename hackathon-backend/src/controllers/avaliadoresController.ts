

import { Request, Response } from "express";
import avaliadorService from "../services/avaliadoresService";
import { Avaliador } from "../models/avaliadoresModel";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorData: Avaliador = req.body;
      const avaliador = await avaliadorService.createAvaliador(avaliadorData);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: "Error" });
    }
  }

  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorService.getAllAvaliadores();
      if (avaliadores) {
        return res.status(200).json(avaliadores);
      }
      return res.status(404).json({ error: "Avaliador nao encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro procurando avaliador" });
    }
  }

  async getAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      const avaliador = await avaliadorService.getAvaliadorById(avaliadorId);
      if (avaliador) {
        return res.status(200).json(avaliador);
      }
      return res.status(404).json({ error: "Avaliador nao encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro pegando avaliador" });
    }
  }

  async updateAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      const updateData: Partial<Avaliador> = req.body;
      const avaliador = await avaliadorService.updateAvaliador(
        avaliadorId,
        updateData
      );
      if (avaliador) {
        return res.status(200).json(avaliador);
      }
      return res.status(404).json({ error: "Avaliador nao encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro modificando avaliador" });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadorId = Number(req.params.id);
      await avaliadorService.deleteAvaliador(avaliadorId);
      return res.status(200).json({ message: "Avaliador deletado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro apagando avaliador" });
    }
  }
}

export default new AvaliadorController();
