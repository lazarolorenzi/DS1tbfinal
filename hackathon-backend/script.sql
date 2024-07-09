CREATE TABLE avaliacoes (
  id SERIAL PRIMARY KEY,
  avaliador_id INTEGER REFERENCES avaliadores(id) NOT NULL,
  equipe_id INTEGER REFERENCES equipes(id) NOT NULL,
  notas JSONB NOT NULL,
  UNIQUE(avaliador_id, equipe_id)
);
CREATE TABLE equipes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE avaliadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  login VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);
