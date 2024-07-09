"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IFormDataAvaliacao {
  avaliador_id: number;
  equipe_id: number;
  notas: Record<string, any>; 
}

export default function NewAvaliacao() {
  const router = useRouter();
  const [formDataAvaliacao, setFormDataAvaliacao] = useState<IFormDataAvaliacao>({
    avaliador_id: 0,
    equipe_id: 0,
    notas: {}, 
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormDataAvaliacao((prevFormData) => ({
      ...prevFormData,
      [name]: name === "avaliador_id" || name === "equipe_id" ? parseInt(value) : value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/avaliacoes", {
        avaliador_id: formDataAvaliacao.avaliador_id,
        equipe_id: formDataAvaliacao.equipe_id,
        notas: formDataAvaliacao.notas, 
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/"); 
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Avaliador ID</label>
          <input
            type="number"
            name="avaliador_id"
            value={formDataAvaliacao.avaliador_id}
            onChange={handleChange}
            placeholder="ID do avaliador"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Equipe ID</label>
          <input
            type="number"
            name="equipe_id"
            value={formDataAvaliacao.equipe_id}
            onChange={handleChange}
            placeholder="ID da equipe"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar Avaliação
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
