

import { Avaliador, AvaliadorModel } from "../models/avaliadoresModel";

class AvaliadorService {
  constructor(private avaliadorModel: AvaliadorModel) {} // Injeção de dependência

  async createAvaliador(avaliadorData: Avaliador): Promise<Avaliador> {
    try {
      // Validação dos dados de entrada (adicione sua lógica aqui)
      if (!avaliadorData.nome || !avaliadorData.login || !avaliadorData.senha) {
        throw new Error("Campos nome, login e senha são obrigatórios");
      }

      return await this.avaliadorModel.create(avaliadorData);
    } catch (error: any) {
      // Tratamento de erros mais específico
      if (error.code === "23505") {
        throw new Error("Login já existe"); // Exemplo de erro de chave duplicada
      } else if (error instanceof Error) { // Verifica se o erro é do tipo Error
        throw new Error(`Erro ao criar avaliador: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar avaliador");
      }
    }
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

export default new AvaliadorService(new AvaliadorModel());
