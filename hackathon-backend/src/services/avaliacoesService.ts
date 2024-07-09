import { Avaliacao, AvaliacaoModel } from "../models/avaliacoesModel";

class AvaliacaoService {
  constructor(private avaliacaoModel: AvaliacaoModel) {}

  async createAvaliacao(avaliacaoData: Avaliacao): Promise<Avaliacao> {
    try {

      this.validateAvaliacaoData(avaliacaoData);

      return await this.avaliacaoModel.create(avaliacaoData);
    } catch (error: any) {

      if (error.message.includes("duplicate key value violates unique constraint")) {
        throw new Error("Já existe uma avaliação para este avaliador e equipe.");
      } else if (error.message.includes("violates foreign key constraint")) {
        throw new Error("Avaliador ou equipe não encontrados.");
      } else {
        throw new Error(`Erro ao criar avaliação: ${error.message}`); // Erro genérico
      }
    }
  }

  private validateAvaliacaoData(avaliacaoData: Avaliacao) {
    if (!avaliacaoData.avaliador_id || !avaliacaoData.equipe_id) {
      throw new Error("Avaliador ID e Equipe ID são obrigatórios.");
    }

    for (const criterio in avaliacaoData.notas) {
      const nota = avaliacaoData.notas[criterio];
      if (isNaN(nota) || nota < 0 || nota > 10) {
        throw new Error(`A nota para ${criterio} deve ser um número entre 0 e 10.`);
      }
    }
  }

  async getAllAvaliacoes(): Promise<Avaliacao[] | null> {
    try {
      return await this.avaliacaoModel.findAll();
    } catch (error: any) {
      throw new Error(`Erro ao buscar avaliações: ${error.message}`);
    }
  }
  async getAvaliacaoById(id: number): Promise<Avaliacao | null> {
    try {
      return await this.avaliacaoModel.findById(id);
    } catch (error: any) {
      throw new Error(`Erro ao buscar avaliação: ${error.message}`);
    }
  }

  async updateAvaliacao(
      id: number,
      updateData: Partial<Avaliacao>
  ): Promise<Avaliacao | null> {
    try {

      this.validateAvaliacaoData(updateData as Avaliacao);
      return await this.avaliacaoModel.update(id, updateData);
    } catch (error: any) {
      throw new Error(`Erro ao atualizar avaliação: ${error.message}`);
    }
  }

  async deleteAvaliacao(id: number): Promise<void> {
    try {
      return await this.avaliacaoModel.delete(id);
    } catch (error: any) {
      throw new Error(`Erro ao deletar avaliação: ${error.message}`);
    }
  }
}

export default new AvaliacaoService(new AvaliacaoModel());
