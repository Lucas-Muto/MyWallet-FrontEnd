"use client";

import { useState } from "react";

export default function NovaEntrada() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui futuramente será feita a requisição para salvar entrada
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-12 px-6 shadow-lg">
        <h2 className="text-[#A259FF] text-2xl font-bold mb-8">Nova entrada</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="number"
            placeholder="Valor"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <input
            type="text"
            placeholder="Descrição"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#A259FF]]"
          >
            Salvar entrada
          </button>
        </form>
      </div>
    </div>
  );
} 