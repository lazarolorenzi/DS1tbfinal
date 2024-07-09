"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IFormDataUser {
  nome: string;
  login: string;
  senha: string;
}

export default function NewAvaliador() {
  const router = useRouter();
  const [formDataUser, setFormDataUser] = useState<IFormDataUser>({
    nome: "",
    login: "",
    senha: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/avaliadores", {
        nome: formDataUser.nome,
        login: formDataUser.login,
        senha: formDataUser.senha,
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
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Cadastrar Avaliador</h2>

          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
            <input
                type="text"
                id="nome"
                name="nome"
                value={formDataUser.nome}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="login" className="block text-gray-700 text-sm font-bold mb-2">Login</label>
            <input
                type="text"
                id="login"
                name="login"
                value={formDataUser.login}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <input
                type="password"
                id="senha"
                name="senha"
                value={formDataUser.senha}
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
              Cadastrar
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
  );}
