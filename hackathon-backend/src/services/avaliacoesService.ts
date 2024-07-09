
import { Avaliacao, AvaliacaoModel } from "../models/avaliacoesModel";

class AvaliacaoService {
  private avaliacaoModel: AvaliacaoModel;

  constructor() {
    this.avaliacaoModel = new AvaliacaoModel();
  }

  async createAvaliacao(avaliacaoData: Avaliacao): Promise<Avaliacao> {
    if (!avaliacaoData.avaliador_id || !avaliacaoData.equipe_id) {
      throw new Error("Avaliador ID e Equipe ID são obrigatórios.");
    }

    for (const criterio in avaliacaoData.notas) {
      const nota = avaliacaoData.notas[criterio];
      if (isNaN(nota) || nota < 0 || nota > 10) {
        throw new Error(`A nota para ${criterio} deve ser um número entre 0 e 10.`);
      }
    }

    return this.avaliacaoModel.create(avaliacaoData);
  }

  async getAllAvaliacoes(): Promise<Avaliacao[] | null> {
    return this.avaliacaoModel.findAll();
  }

  async getAvaliacaoById(id: number): Promise<Avaliacao | null> {
    return this.avaliacaoModel.findById(id);
  }

  async updateAvaliacao(
    id: number,
    updateData: Partial<Avaliacao>
  ): Promise<Avaliacao | null> {
    return this.avaliacaoModel.update(id, updateData);
  }

  async deleteAvaliacao(id: number): Promise<void> {
    return this.avaliacaoModel.delete(id);
  }
}

export default new AvaliacaoService();
