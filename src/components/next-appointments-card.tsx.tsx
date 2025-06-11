import { eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export default async function NextAppointmentsCard(){
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.clinic?.id) {
    // Caso não exista uma clínica associada ao usuário, exibe uma mensagem padrão
    return (
      <div className="relative">
        <div className="absolute inset-0 rotate-6 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
        <div className="relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Próximas Consultas
              </h3>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Nenhuma consulta encontrada.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Busca as consultas agendadas para a clínica do usuário
  const [appointments] = await Promise.all([
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, session.user.clinic.id),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return (
    <div className="relative">
      <div className="absolute inset-0 rotate-6 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
      <div className="relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Próximas Consultas
            </h3>
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>

          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-blue-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                  {appointment.patient
                    ? appointment.patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : ""}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {appointment.patient?.name}
                  </p>
                  <p className="text-sm text-gray-600">{`Dr. ${appointment.doctor?.name}`}</p>
                </div>
                <div className="font-semibold text-blue-600">
                  {appointment.date.toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  {appointment.date.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
