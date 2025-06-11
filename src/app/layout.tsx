import "./globals.css";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Doutor Agenda - Sistema de Agendamento",
    template: "Doutor Agenda - %s",
  },
  keywords: [
    "agendamento de consultas",
    "gestão de clínic",
    "controle de agenda de médicos e pacientes",
  ],
  description: "O seu sistema de gestão de agendamento de consultas",
  authors: [{ name: "Fabio Diniz", url: "" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ReactQueryProvider>
          <Toaster position="bottom-center" richColors theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
