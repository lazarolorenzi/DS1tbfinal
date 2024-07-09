"use client";
import React, { useEffect, useState } from "react";
import api from "../services/api";

interface IAvaliador {
  id: number;
  nome: string;
  login: string;
  senha: string;
}

interface IEquipe {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
}

interface IAvaliacao {
  id: number;
  data: string;
  pontuacao: number;
  observacoes: string;
}

async function fetchAvaliadores(): Promise<IAvaliador[]> {
  try {
    const response = await api.get("/avaliadores");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter avaliadores:", error);
    return []; 
  }
}

async function fetchEquipes(): Promise<IEquipe[]> {
  try {
    const response = await api.get("/equipes");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter equipes:", error);
    return []; 
  }
}

async function fetchAvaliacoes(): Promise<IAvaliacao[]> {
  try {
    const response = await api.get("/avaliacoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter avaliações:", error);
    return []; 
  }
}

export default function Home() {
  const [avaliadores, setAvaliadores] = useState<IAvaliador[]>([]);
  const [equipes, setEquipes] = useState<IEquipe[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<IAvaliacao[]>([]);

  useEffect(() => {
    async function fetchData() {
      const avaliadoresData = await fetchAvaliadores();
      setAvaliadores(avaliadoresData);

      const equipesData = await fetchEquipes();
      setEquipes(equipesData);

      const avaliacoesData = await fetchAvaliacoes();
      setAvaliacoes(avaliacoesData);
    }

    fetchData();
  }, []);

  const numAvaliadores = avaliadores.length;
  const numEquipes = equipes.length;
  const numAvaliacoes = avaliacoes.length;

  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Resumo</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
        >
          <div className="px-6 py-4 flex-grow flex flex-col justify-between">
            <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
              Número de Avaliadores
            </h2>
            <p className="text-center text-gray-700 text-4xl font-bold mb-4">{numAvaliadores}</p>
          </div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
        >
          <div className="px-6 py-4 flex-grow flex flex-col justify-between">
            <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
              Número de Equipes
            </h2>
            <p className="text-center text-gray-700 text-4xl font-bold mb-4">{numEquipes}</p>
          </div>
        </div>

        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
        >
          <div className="px-6 py-4 flex-grow flex flex-col justify-between">
            <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
              Número de Avaliações
            </h2>
            <p className="text-center text-gray-700 text-4xl font-bold mb-4">{numAvaliacoes}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
