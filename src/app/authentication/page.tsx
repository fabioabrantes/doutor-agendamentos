import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

export const metadata: Metadata = {
  title: "Autenticação",
  keywords: [
    "agendamento de consultas",
    "gestão de clínic",
    "controle de agenda de médicos e pacientes",
  ],
  description: "O seu sistema de gestão de agendamento de consultas",
  authors: [{ name: "fabio diniz", url: "" }],
};
export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center md:flex-row">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Image
          src="/logo-dark.svg"
          alt="Logo Dr Agenda"
          width={200}
          height={40}
          className="mb-8 block dark:hidden"
        />
        <Image
          src="/logo-light.svg"
          alt="Logo Dr Agenda"
          width={200}
          height={40}
          className="mb-8 hidden dark:block"
        />
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden h-screen w-full content-end bg-[url('/bg.jpg')] bg-cover bg-center pb-4 lg:block">
        <p className="mt-4 text-center text-sm text-white">
          Ao continuar, você concorda com os{" "}
          <a
            href="/terms"
            className="hover:text-primary/80 text-white underline"
          >
            Termos de Serviço
          </a>{" "}
          e a{" "}
          <a
            href="/privacy"
            className="hover:text-primary/80 text-white underline"
          >
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
