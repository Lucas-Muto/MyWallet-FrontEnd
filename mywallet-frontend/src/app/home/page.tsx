"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-xs sm:max-w-md rounded-xl flex flex-col py-8 px-6 shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#A259FF] text-2xl font-bold">Olá, Fulano</h2>
          <button title="Sair" className="text-[#A259FF] text-2xl font-bold">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 min-h-[200px] bg-white rounded-lg p-2">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>30/11</span>
            <span className="flex-1 ml-2 text-black">Almoço mãe</span>
            <span className="text-red-500 font-medium ml-2">39,90</span>
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>27/11</span>
            <span className="flex-1 ml-2 text-black">Salário</span>
            <span className="text-green-500 font-medium ml-2">3000,00</span>
          </div>
          <div className="flex items-center justify-between font-bold mt-4 border-t pt-2">
            <span className="text-black">SALDO</span>
            <span className="text-green-500">2960,10</span>
          </div>
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