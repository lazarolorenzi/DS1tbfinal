"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IFormDataAvaliacao {
  avaliador_id: number;
  equipe_id: number;
  notas: {
    originalidade: number;
    impacto: number;
    execucao: number;
    apresentacao: number;
    viabilidade: number;
  };
}

const criteriosAvaliacao: [keyof IFormDataAvaliacao["notas"], string][] = [
  ["originalidade", "Originalidade do Projeto"],
  ["impacto", "Impacto Potencial"],
  ["execucao", "Execução Técnica"],
  ["apresentacao", "Apresentação e Demonstração"],
  ["viabilidade", "Viabilidade e Sustentabilidade"],
];

export default function NewAvaliacao() {
  const router = useRouter();
  const [formDataAvaliacao, setFormDataAvaliacao] = useState<
      IFormDataAvaliacao
  >({
    avaliador_id: 0,
    equipe_id: 0,
    notas: {
      originalidade: 0,
      impacto: 0,
      execucao: 0,
      apresentacao: 0,
      viabilidade: 0,
    },
  });

  const handleChange = (
      e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormDataAvaliacao((prevFormData) => {
      if (name === "avaliador_id" || name === "equipe_id") {
        return {
          ...prevFormData,
          [name]: parseInt(value, 10),
        };
      } else if (name in prevFormData.notas) {
        return {
          ...prevFormData,
          notas: {
            ...prevFormData.notas,
            [name]: parseInt(value, 10),
          },
        };
      } else {
        return prevFormData;
      }
    });
  };


  const makePostRequest = async () => {
    try {
      const response = await api.post("/avaliacoes", formDataAvaliacao);
      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/");
    }catch (error: any) {
      if (error.response) {
        // Erro do servidor com resposta
        alert(`Erro do servidor: ${error.response.data.error}`);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        alert("Erro de rede: Não foi possível conectar ao servidor.");
      } else {
        // Algo deu errado ao configurar a requisição
        alert("Erro: " + error.message);
      }
    }
  };

  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
        <form className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Cadastrar Avaliação
          </h2>

          <div className="mb-4">
            <label
                htmlFor="avaliador_id"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
              Avaliador ID (No caso se tivesse um login, pegaria o ID a partir do login)
            </label>
            <input
                type="number"
                id="avaliador_id"
                name="avaliador_id"
                value={formDataAvaliacao.avaliador_id}
                onChange={handleChange}
                placeholder="ID do avaliador"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
                htmlFor="equipe_id"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
              Equipe ID
            </label>
            <input
                type="number"
                id="equipe_id"
                name="equipe_id"
                value={formDataAvaliacao.equipe_id}
                onChange={handleChange}
                placeholder="ID da equipe"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Campos de Notas */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Notas:</h3>
            {criteriosAvaliacao.map(([criterio, label]) => (
                <div key={criterio} className="flex items-center mb-2">
                  <label
                      htmlFor={criterio}
                      className="block text-gray-700 text-sm font-bold mr-2 w-48"
                  >
                    {label} (0-10):
                  </label>
                  <select
                      id={criterio}
                      name={criterio}
                      value={formDataAvaliacao.notas[criterio]}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {[...Array(11).keys()].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                    ))}
                  </select>
                </div>
            ))}
          </div>

          {/* Botões Cadastrar e Cancelar */}
          <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={makePostRequest}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar Avaliação
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
      </main>
  );
}
