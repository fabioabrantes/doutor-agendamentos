import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import ClinicForm from "./_components/form";

export default async function ClinicFormPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }
  return (
    <div>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para continuar.
            </DialogDescription>
          </DialogHeader>

          <ClinicForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
