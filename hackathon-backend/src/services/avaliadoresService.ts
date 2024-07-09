

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
    try {
      return await this.avaliadorModel.findAll();
    } catch (error: any) {
      throw new Error(`Erro ao buscar avaliadores: ${error.message}`);
    }
  }

  async getAvaliadorById(id: number): Promise<Avaliador | null> {
    try {
      const avaliador = await this.avaliadorModel.findById(id);
      if (!avaliador) {
        throw new Error("Avaliador não encontrado");
      }
      return avaliador;
    } catch (error: any) {
      console.error("Erro ao buscar avaliador por ID:", error);
      throw new Error(`Erro ao buscar avaliador: ${error.message}`);
    }
  }

  async updateAvaliador(id: number, updateData: Partial<Avaliador>): Promise<Avaliador | null> {
    try {
      const avaliador = await this.avaliadorModel.update(id, updateData);
      if (!avaliador) {
        throw new Error("Avaliador não encontrado");
      }
      return avaliador;
    } catch (error: any) {
      console.error("Erro ao atualizar avaliador:", error);
      if (error.code === '23505') { // Violação de unique constraint (login duplicado)
        throw new Error("Login já existe");
      } else {
        throw new Error(`Erro ao atualizar avaliador: ${error.message}`);
      }
    }
  }

  async deleteAvaliador(id: number): Promise<void> {
    try {
      await this.avaliadorModel.delete(id);
    } catch (error: any) {
      console.error("Erro ao deletar avaliador:", error);
      throw new Error(`Erro ao deletar avaliador: ${error.message}`);
    }
  }
}

export default new AvaliadorService(new AvaliadorModel());
