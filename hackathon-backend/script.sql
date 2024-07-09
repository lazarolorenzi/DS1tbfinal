-- Passo 1: Conecte-se ao servidor PostgreSQL
-- No terminal, execute:
-- psql -U your_superuser

-- Passo 2: Crie o banco de dados
CREATE DATABASE projeto;

-- Passo 3: Conecte-se ao banco de dados 'projeto'
-- No terminal, execute:
-- \c projeto

-- Passo 4: Crie a tabela 'users'
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  login VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile VARCHAR(255) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  birthdate DATE NOT NULL,
  status BOOLEAN NOT NULL
);

-- Passo 5: Crie a tabela 'enderecos'
CREATE TABLE enderecos (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  country VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
