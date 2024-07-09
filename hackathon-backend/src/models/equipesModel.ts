

import pool from "../database/dbConfig";

interface Equipe {
  id?: number;
  nome: string;
}

class EquipeModel {
  async create(equipe: Equipe): Promise<Equipe> {
    const { nome } = equipe;
    const result = await pool.query(
      "INSERT INTO equipes (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Equipe[] | null> {
    const result = await pool.query("SELECT * FROM equipes");
    return result.rows || null;
  }

  async findById(id: number): Promise<Equipe | null> {
    const result = await pool.query("SELECT * FROM equipes WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  static async findOne(nome: string): Promise<Equipe | null> {
    const result = await pool.query("SELECT * FROM equipes WHERE id = $1", [nome]);
    return result.rows[0] || null;
  }


  async update(id: number, equipe: Partial<Equipe>): Promise<Equipe | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let query = "UPDATE equipes SET ";

    Object.keys(equipe).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push((equipe as any)[key]);
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
    await pool.query("DELETE FROM equipes WHERE id = $1", [id]);
  }
}

export { Equipe, EquipeModel };
