"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "../api";

export default function NovaSaida() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");
      await createTransaction({
        value: Number(valor),
        description: descricao,
        type: "withdraw",
        token
      });
      router.push("/home");
    } catch (err: any) {
      setError(err?.message || "Erro ao salvar saída");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-12 px-6 shadow-lg">
        <h2 className="text-[#A259FF] text-2xl font-bold mb-8">Nova saída</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {error && <div className="bg-red-100 text-red-700 rounded p-2 text-center text-sm mb-2">{error}</div>}
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
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#7c1fd1] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar saída"}
          </button>
        </form>
      </div>
    </div>
  );
} 