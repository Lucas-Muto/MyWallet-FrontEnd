"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui futuramente será feita a requisição para cadastro
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-8 mb-6 text-center">Criação de conta</h1>
      <div className="bg-[#8C1AFF] w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-16 px-6 shadow-lg">
        <h2 className="text-white text-4xl font-bold mb-10 font-mono tracking-wider select-none">
          MyWallet
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirme a senha"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#7c1fd1]"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-white mt-8 text-center text-sm font-semibold">
          Já tem uma conta?{' '}
          <Link href="/" className="underline hover:text-gray-200 transition">Entre agora!</Link>
        </p>
      </div>
    </div>
  );
} 