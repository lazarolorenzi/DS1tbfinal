"use client";

import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Importe seu arquivo de configuração do Axios/API aqui

interface IEquipe {
  id: number;
  nome: string;
}

interface IAvaliacao {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: any; // Defina um tipo adequado para o JSONB de notas
}

export default function Home() {
  const [equipes, setEquipes] = useState<IEquipe[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<IAvaliacao[]>([]);
  const [filtroId, setFiltroId] = useState<number | null>(null);
  const [filtroDigitado, setFiltroDigitado] = useState<string>('');

  useEffect(() => {
    fetchEquipes();
    fetchAvaliacoes();
  }, []);

  const fetchEquipes = async () => {
    try {
      const response = await api.get('/equipes');
      setEquipes(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipes:', error);
    }
  };

  const fetchAvaliacoes = async () => {
    try {
      let url = '/avaliacoes';

      
      if (filtroId !== null) {
        url += `?id=${filtroId}`;
      }

      const response = await api.get(url);
      setAvaliacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  const handleFiltrar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filtroDigitado.trim() === '') {
      setFiltroId(null);
    } else {
      const id = parseInt(filtroDigitado);
      if (!isNaN(id)) {
        setFiltroId(id);
      }
    }
  };

  return (
      <main className=" mx-auto  px-4 bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Avaliações</h1>

        <form onSubmit={handleFiltrar} className="flex justify-center space-x-4 mb-4">
          <input
              type="number"
              value={filtroDigitado}
              onChange={(e) => setFiltroDigitado(e.target.value)}
              placeholder="Filtrar por Avaliador ou Equipe ID..."
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Filtrar
          </button>
        </form>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {avaliacoes.length > 0 ? (
              avaliacoes.map((avaliacao) => (
                  <div
                      key={avaliacao.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
                  >
                    <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                      <h2 className="font-bold text-xl text-gray-800 text-center uppercase mb-2 h-auto overflow-hidden">
                        Avaliador ID: {avaliacao.avaliador_id}
                      </h2>
                      <h2 className="font-bold text-xl text-gray-800 text-center uppercase mb-2 h-auto overflow-hidden">
                        Equipe ID: {avaliacao.equipe_id}
                      </h2>
                      <div className="py-4 flex justify-center">
                <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Notas: {JSON.stringify(avaliacao.notas)}
                </span>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <h1 className="text-center text-xl text-white">Sem avaliações cadastradas.</h1>
          )}
        </section>
      </main>
  );
}
