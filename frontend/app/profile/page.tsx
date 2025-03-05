"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  score?: number;
  profilePic?: string; // caminho/URL da foto de perfil
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 1) Recupera o usuário do localStorage (ou você pode fazer um GET ao back-end)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Nenhuma imagem selecionada!");
      return;
    }
    if (!user) {
      setMessage("Você precisa estar logado para enviar a foto.");
      return;
    }

    try {
      const formData = new FormData();
      // Campo "avatar" deve coincidir com o nome esperado pelo back-end (Multer)
      formData.append("avatar", selectedFile);

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Token ausente. Faça login novamente.");
        return;
      }

      // Envia a foto para a rota de upload no back-end
      const res = await axios.patch(
        "http://localhost:5000/api/users/profile-pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Foto de perfil atualizada com sucesso!");

      // O back-end deve retornar o caminho ou URL da imagem no campo "profilePic"
      const updatedPic = res.data.profilePic;
      const updatedUser = { ...user, profilePic: updatedPic };

      // Atualiza o estado local e o localStorage para exibir imediatamente a nova foto
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.error || "Erro ao atualizar foto");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Você não está logado ou não há usuário no localStorage.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Meu Perfil</h1>

      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        {/* Dados do usuário */}
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold">Nome: {user.name}</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
        </div>

        {/* Foto de perfil atual */}
        <div className="flex justify-center mb-4">
          {user.profilePic ? (
            <img
              src={`http://localhost:5000/${user.profilePic}`}
              alt="Foto de Perfil"
              className="w-32 h-32 object-cover rounded-full border"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full">
              <span className="text-gray-500">Sem foto</span>
            </div>
          )}
        </div>

        {/* Seletor de arquivo com <label> */}
        <div className="mb-4">
          <label htmlFor="avatarFile" className="block font-medium mb-1">
            Selecione uma nova foto:
          </label>
          <input
            id="avatarFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-1 w-full"
          />
        </div>

        {/* Botão de upload */}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>

        {/* Mensagem de status */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
