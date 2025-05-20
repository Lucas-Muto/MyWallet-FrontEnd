import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "MyWallet - Controle Financeiro",
  description: "Gerencie suas entradas e saídas de forma simples e visual. MyWallet, seu controle financeiro pessoal online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8C11BE" />
        <meta name="background-color" content="#FAF6FE" />
      </head>
      <body className={`${poppins.variable} font-sans bg-[#FAF6FE]`}>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
