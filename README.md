# DS1tbfinal

Este é o projeto final do curso DS1tb. O projeto consiste em um sistema web desenvolvido com Node.js no backend e um frontend em React. O banco de dados utilizado é o PostgreSQL.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Passo a Passo para Execução do Projeto

### 1. Clonando o Repositório

Primeiramente, clone o repositório do projeto:

```bash
git clone https://github.com/lazarolorenzi/DS1tbfinal.git
```

### 2.Configurando o Banco de Dados
Crie um banco de dados no PostgreSQL.

Execute os scripts SQL localizados na pasta hackathon-backend para configurar o banco de dados. Abra seu terminal e navegue até a pasta hackathon-backend:

```bash
cd DS1tbfinal/hackathon-backend
```
Execute os comandos listados no arquivo script.sql dentro da pasta hackathon-backend no seu banco de dados PostgreSQL.

### 3. Instalando Dependências
Navegue até a pasta do backend e instale as dependências:

```bash
cd DS1tbfinal/hackathon-backend
npm install
```
Em seguida, faça o mesmo para o frontend:

```bash
cd ../hackathon-frontend
npm install
```
### 4. Executando o Projeto
## Backend
Navegue até a pasta do backend:

```bash
cd DS1tbfinal/hackathon-backend
```
Execute o servidor backend com o comando:

```bash
nodemon
```
## Frontend
Abra um novo terminal e navegue até a pasta do frontend:

```bash
cd DS1tbfinal/hackathon-frontend
```
Execute o servidor frontend com o comando:

```bash
npm run dev
```
Agora, o projeto deve estar rodando localmente em seu ambiente de desenvolvimento.
