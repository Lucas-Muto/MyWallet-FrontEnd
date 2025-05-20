"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTransactions, updateTransaction } from "../../api";

export default function EditarTransacao() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"deposit" | "withdraw">("deposit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    setCheckedAuth(true);
    setLoading(true);
    getTransactions(token)
      .then((data) => {
        const txs = Array.isArray(data) ? data : data.transactions || [];
        const tx = txs.find((t: any) => t._id === id);
        if (tx) {
          setValor(String(tx.value));
          setDescricao(tx.description);
          setTipo(tx.type);
        } else {
          setError("Transação não encontrada");
        }
      })
      .catch((err) => setError(err?.message || "Erro ao buscar transação"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (!checkedAuth) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");
      await updateTransaction(id!, {
        value: Number(valor),
        description: descricao,
        type: tipo,
        token
      });
      router.push("/home");
    } catch (err: any) {
      setError(err?.message || "Erro ao atualizar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#8C1AFF] w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-12 px-6 shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-8">
          {tipo === "deposit" ? "Editar entrada" : "Editar saída"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {error && <div className="bg-red-100 text-red-700 rounded p-2 text-center text-sm mb-2">{error}</div>}
          <input
            type="number"
            placeholder="Valor"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none bg-[#A259FF]"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <input
            type="text"
            placeholder="Descrição"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none bg-[#A259FF]"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#7c1fd1] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Atualizando..." : tipo === "deposit" ? "Atualizar entrada" : "Atualizar saída"}
          </button>
        </form>
      </div>
    </div>
  );
} 