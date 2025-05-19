"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui futuramente será feita a requisição para login
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#8C1AFF] w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-16 px-6 shadow-lg">
        <h2 className="text-white text-4xl font-bold mb-10 font-mono tracking-wider select-none">
          MyWallet
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#7c1fd1]"
          >
            Entrar
          </button>
        </form>
        <p className="text-white mt-8 text-center text-sm font-semibold">
          Primeira vez?{' '}
          <Link href="/sign-up" className="underline hover:text-gray-200 transition">Cadastre-se!</Link>
        </p>
      </div>
    </div>
  );
}
