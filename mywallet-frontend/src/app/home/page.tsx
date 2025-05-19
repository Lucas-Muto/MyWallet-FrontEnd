"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-xs sm:max-w-md rounded-xl flex flex-col py-8 px-6 shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#8C11BE] text-2xl font-bold">Olá, Fulano</h2>
          <button title="Sair" className="text-[#8C11BE] text-2xl font-bold">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <span className="text-gray-400 text-center text-lg">Não há registros de entrada ou saída</span>
        </div>
      </div>
      <div className="flex gap-4 mt-6 w-full max-w-xs sm:max-w-md">
        <button className="flex-1 flex flex-col items-start justify-end bg-[#A259FF] rounded-lg p-4 text-white font-bold text-lg min-h-[90px]">
          <span className="text-2xl mb-2">＋</span>
          Nova entrada
        </button>
        <button className="flex-1 flex flex-col items-start justify-end bg-[#A259FF] rounded-lg p-4 text-white font-bold text-lg min-h-[90px]">
          <span className="text-2xl mb-2">－</span>
          Nova saída
        </button>
      </div>
    </div>
  );
} 