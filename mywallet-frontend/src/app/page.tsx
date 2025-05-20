"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "./api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await signIn({ email, password });
      localStorage.setItem("token", token);
      if (typeof window !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      router.push("/home");
    } catch (err: any) {
      setError(err?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#8C1AFF] w-full max-w-xs sm:max-w-md rounded-xl flex flex-col items-center py-16 px-6 shadow-lg">
        <h2 className="text-white text-4xl font-bold mb-10 font-mono tracking-wider select-none">
          MyWallet
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {error && <div className="bg-red-100 text-red-700 rounded p-2 text-center text-sm mb-2">{error}</div>}
          <input
            type="email"
            placeholder="E-mail"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none bg-[#A259FF] text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="rounded-lg px-4 py-3 text-lg outline-none border-none bg-[#A259FF] text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#A259FF] text-white font-bold text-lg py-3 rounded-lg transition hover:bg-[#7c1fd1] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
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
