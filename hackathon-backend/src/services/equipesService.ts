import { Equipe, EquipeModel } from "../models/equipesModel";

class EquipeService {
  constructor(private equipeModel: EquipeModel) {}

  async createEquipe(equipeData: Equipe): Promise<Equipe> {
    try {
      this.validateEquipeData(equipeData);
      return await this.equipeModel.create(equipeData);
    } catch (error: any) {
      throw new Error(`Erro ao criar equipe: ${error.message}`);
    }
  }

  private validateEquipeData(equipeData: Equipe) {
    if (!equipeData.nome) {
      throw new Error("O nome da equipe é obrigatório.");
    }
  }

  async getAllEquipes(): Promise<Equipe[]> {
    try {
      const equipes = await this.equipeModel.findAll();
      return equipes || [];
    } catch (error: any) {
      throw new Error(`Erro ao buscar equipes: ${error.message}`);
    }
  }

  async getEquipeById(id: number): Promise<Equipe | null> {
    try {
      const equipe = await this.equipeModel.findById(id);
      if (!equipe) {
        throw new Error("Equipe não encontrada.");
      }
      return equipe;
    } catch (error: any) {
      throw new Error(`Erro ao buscar equipe por ID: ${error.message}`);
    }
  }

  async updateEquipe(id: number, updateData: Partial<Equipe>): Promise<Equipe | null> {
    try {
      if (updateData.nome === "" || updateData.nome === undefined) {
        throw new Error("O nome da equipe é obrigatório.");
      }

      const equipe = await this.equipeModel.update(id, updateData);
      if (!equipe) {
        throw new Error("Equipe não encontrada.");
      }
      return equipe;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar equipe: ${error.message}`);
    }
  }

  async deleteEquipe(id: number): Promise<void> {
    try {
      await this.equipeModel.delete(id);
    } catch (error: any) {
      throw new Error(`Erro ao deletar equipe: ${error.message}`);
    }
  }
}

export default new EquipeService(new EquipeModel());
