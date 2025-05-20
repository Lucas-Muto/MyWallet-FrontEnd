"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTransactions, deleteTransaction } from "../api";
import { IoTrashOutline, IoExitOutline } from "react-icons/io5";

interface Transaction {
  _id: string;
  value: number;
  description: string;
  type: "deposit" | "withdraw";
  createdAt: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saldo, setSaldo] = useState(0);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

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
        setTransactions(txs);
        setSaldo(
          txs.reduce(
            (acc: number, t: Transaction) =>
              t.type === "deposit"
                ? acc + t.value
                : acc - t.value,
            0
          )
        );
      })
      .catch((err) => setError(err?.message || "Erro ao buscar transações"))
      .finally(() => setLoading(false));
  }, [router]);

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const data = new Date(dateString);
    if (isNaN(data.getTime())) return "";
    // Corrige fuso horário para exibir corretamente no Brasil
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Tem certeza que deseja deletar esta transação?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    try {
      await deleteTransaction(id, token);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      setError(err?.message || "Erro ao deletar transação");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/");
  }

  if (!checkedAuth) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-xs sm:max-w-md rounded-xl flex flex-col py-8 px-6 shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#8C11BE] text-2xl font-bold">Olá, Fulano</h2>
          <button title="Sair" className="text-[#8C11BE] text-2xl font-bold" onClick={handleLogout}>
            <IoExitOutline size={28} />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 min-h-[200px] bg-white rounded-lg p-2">
          {loading && <span className="text-gray-400 text-center text-lg">Carregando...</span>}
          {error && <span className="text-red-500 text-center text-sm">{error}</span>}
          {!loading && !error && transactions.length === 0 && (
            <span className="text-gray-400 text-center text-lg">Não há registros de entrada ou saída</span>
          )}
          {!loading && !error && transactions.map((t) => (
            <div key={t._id} className="flex items-center justify-between text-gray-400 text-sm group">
              <span>{formatDate(t.createdAt)}</span>
              <Link href={`/editar/${t._id}`} className="flex-1 ml-2 text-black hover:underline cursor-pointer">
                {t.description}
              </Link>
              <span className={
                t.type === "deposit"
                  ? "text-green-500 font-medium ml-2"
                  : "text-red-500 font-medium ml-2"
              }>
                {t.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
              <button
                title="Deletar transação"
                className="ml-2 text-gray-400 hover:text-red-600 transition"
                onClick={() => handleDelete(t._id)}
              >
                <IoTrashOutline size={20} />
              </button>
            </div>
          ))}
          {!loading && !error && transactions.length > 0 && (
            <div className="flex items-center justify-between font-bold mt-4 border-t pt-2">
              <span className="text-black">SALDO</span>
              <span className={saldo >= 0 ? "text-green-500" : "text-red-500"}>
                {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-6 w-full max-w-xs sm:max-w-md">
        <Link href="/nova-entrada" className="flex-1 flex flex-col items-start justify-end bg-[#A259FF] rounded-lg p-4 text-white font-bold text-lg min-h-[90px] transition hover:bg-[#7c1fd1]">
          <span className="text-2xl mb-2">＋</span>
          Nova entrada
        </Link>
        <Link href="/nova-saida" className="flex-1 flex flex-col items-start justify-end bg-[#A259FF] rounded-lg p-4 text-white font-bold text-lg min-h-[90px] transition hover:bg-[#7c1fd1]">
          <span className="text-2xl mb-2">－</span>
          Nova saída
        </Link>
      </div>
    </div>
  );
} 