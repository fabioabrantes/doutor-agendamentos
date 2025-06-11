import "../globals.css";

import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/app-sidebar";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Doutor Agenda - Sistema de Agendamento",
    template: "Doutor Agenda - %s",
  },
  keywords: [
    "agendamento de consultas",
    "gestão de clínica",
    "controle de agenda de médicos e pacientes",
  ],
  description: "O seu sistema de gestão de agendamento de consultas",
  authors: [
    { name: "Fábio Diniz", url: "" },
  ],
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
