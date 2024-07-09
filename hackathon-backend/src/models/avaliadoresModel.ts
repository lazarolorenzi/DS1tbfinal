

import pool from "../database/dbConfig";

interface Avaliador {
  id?: number;
  nome: string;
  login: string;
  senha: string;
}

class AvaliadorModel {
   async create(avaliador: Avaliador): Promise<Avaliador> {
    const { nome, login, senha } = avaliador;
    const result = await pool.query(
      "INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, login, senha]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliador[] | null> {
    const result = await pool.query("SELECT * FROM avaliadores");
    return result.rows || null;
  }

  async findById(id: number): Promise<Avaliador | null> {
    const result = await pool.query("SELECT * FROM avaliadores WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  static async findByNome(nome: string): Promise<Avaliador | null> {
    const result = await pool.query("SELECT * FROM avaliadores WHERE id = $1", [nome]);
    return result.rows[0] || null;
  }

  static async findByLogin(login: string): Promise<Avaliador | null> {
    const result = await pool.query("SELECT * FROM avaliadores WHERE id = $1", [login]);
    return result.rows[0] || null;
  }

  async update(id: number, avaliador: Partial<Avaliador>): Promise<Avaliador | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let query = "UPDATE avaliadores SET ";

    Object.keys(avaliador).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push((avaliador as any)[key]);
    });

    query +=
      fields.join(", ") +
      " WHERE id = $" +
      (fields.length + 1) +
      " RETURNING *";
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM avaliadores WHERE id = $1", [id]);
  }
}

export { Avaliador, AvaliadorModel };
