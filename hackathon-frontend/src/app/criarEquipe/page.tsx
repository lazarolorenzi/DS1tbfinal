"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IFormDataEquipe {
  nome: string;
}

export default function NewEquipe() {
  const router = useRouter();
  const [formDataEquipe, setFormDataEquipe] = useState<IFormDataEquipe>({
    nome: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataEquipe((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/equipes", {
        nome: formDataEquipe.nome,
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
        <form className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Cadastrar Equipe</h2>

          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome da Equipe</label>
            <input
                type="text"
                id="nome"
                name="nome"
                value={formDataEquipe.nome}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={makePostRequest}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar Equipe
            </button>
            <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
  );
}
