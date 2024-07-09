"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import { AxiosResponse } from "axios";

interface IAvaliador {
  id: number;
  nome: string;
  login: string;
  senha: string;
}

export default function Home() {
  const [avaliadores, setAvaliadores] = useState<IAvaliador[]>([]);

  useEffect(() => {
    fetchAvaliadores();
  }, []);

  const fetchAvaliadores = async () => {
    try {
      const response = await api.get("/avaliadores");
      setAvaliadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliadores:", error);
    }
  };

  const handleExcluirAvaliador = async (id: number) => {
    try {
      await api.delete(`/avaliadores/${id}`);
      fetchAvaliadores();
    } catch (error) {
      console.error("Erro ao excluir avaliador:", error);
      alert("Erro ao excluir avaliador. Por favor, tente novamente.");
    }
  };

  return (
      <main className=" mx-auto  px-4 bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Avaliadores</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {avaliadores.length > 0 ? (
              avaliadores.map((avaliador) => (
                  <div
                      key={avaliador.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
                  >
                    <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                      <h2 className="font-bold text-xl text-gray-800 text-center uppercase mb-2 h-auto overflow-hidden">
                        {avaliador.nome}
                      </h2>
                    </div>
                    <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
              <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                ID: {avaliador.id}
              </span>
                      <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Login: {avaliador.login}
              </span>
                    </div>
                    <div className="px-6 pt-4 pb-4 flex justify-center">
                      <button
                          onClick={() => handleExcluirAvaliador(avaliador.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <h1 className="text-center text-xl text-white">Sem avaliadores cadastrados.</h1>
          )}
        </section>
      </main>
  );
}
