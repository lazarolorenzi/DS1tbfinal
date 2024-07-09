"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import { AxiosResponse } from "axios";

interface IEquipe {
  id: number;
  nome: string;
}

export default function Home() {
  const [equipes, setEquipes] = useState<IEquipe[]>([]);

  useEffect(() => {
    fetchEquipes();
  }, []);

  const fetchEquipes = async () => {
    try {
      const response = await api.get("/equipes");
      setEquipes(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
    }
  };

  const handleExcluirEquipe = async (id: number) => {
    try {
      await api.delete(`/equipes/${id}`);
      fetchEquipes();
    } catch (error) {
      console.error("Erro ao excluir equipe:", error);
    }
  };

  return (
      <main className=" mx-auto  px-4 bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Equipes</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {equipes.length > 0 ? (
              equipes.map((equipe) => (
                  <div
                      key={equipe.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
                  >
                    <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                      <h2 className="font-bold text-xl text-gray-800 text-center uppercase mb-2 h-auto overflow-hidden">
                        {equipe.nome}
                      </h2>
                    </div>

                    <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
              <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                ID: {equipe.id}
              </span>
                    </div>

                    <div className="px-6 pt-4 pb-4 flex justify-center">
                      <button
                          onClick={() => handleExcluirEquipe(equipe.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <h1 className="text-center text-xl text-white">Sem equipes cadastradas.</h1>
          )}
        </section>
      </main>
  );
}
