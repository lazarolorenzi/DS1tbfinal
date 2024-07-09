

import { Equipe, EquipeModel } from "../models/equipesModel";

class EquipeService {
  private equipeModel: EquipeModel;

  constructor() {
    this.equipeModel = new EquipeModel();
  }

  async createEquipe(equipeData: Equipe): Promise<Equipe> {
    return this.equipeModel.create(equipeData);
  }

  async getAllEquipes(): Promise<Equipe[] | null> {
    return this.equipeModel.findAll();
  }

  async getEquipeById(id: number): Promise<Equipe | null> {
    return this.equipeModel.findById(id);
  }

  async updateEquipe(
    id: number,
    updateData: Partial<Equipe>
  ): Promise<Equipe | null> {
    return this.equipeModel.update(id, updateData);
  }

  async deleteEquipe(id: number): Promise<void> {
    return this.equipeModel.delete(id);
  }
}

export default new EquipeService();
