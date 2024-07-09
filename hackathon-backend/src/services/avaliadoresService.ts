

import { Avaliador, AvaliadorModel } from "../models/avaliadoresModel";

class AvaliadorService {
  private avaliadorModel: AvaliadorModel;

  constructor() {
    this.avaliadorModel = new AvaliadorModel();
  }

  async createAvaliador(avaliadorData: Avaliador): Promise<Avaliador> {
    return this.avaliadorModel.create(avaliadorData);
  }

  async getAllAvaliadores(): Promise<Avaliador[] | null> {
    return this.avaliadorModel.findAll();
  }

  async getAvaliadorById(id: number): Promise<Avaliador | null> {
    return this.avaliadorModel.findById(id);
  }

  async updateAvaliador(
    id: number,
    updateData: Partial<Avaliador>
  ): Promise<Avaliador | null> {
    return this.avaliadorModel.update(id, updateData);
  }

  async deleteAvaliador(id: number): Promise<void> {
    return this.avaliadorModel.delete(id);
  }
}

export default new AvaliadorService();
