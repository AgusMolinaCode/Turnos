import React from "react";
import Link from "next/link";
import { getTurno } from "@/lib/actions/turno.actions";
import { Abogados } from "@/constants";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const turnoId = (searchParams?.turnoId as string) || "";
  const turno = await getTurno(turnoId);
  const profesional = Abogados.find(
    (abogado) => abogado.name === turno.primaryProfessional
  );

  if (turno.status === "pending") {
    turno.status = "pendiente";
  }

  const formattedDate = format(
    new Date(turno.schedule),
    "d 'de' MMMM 'de' yyyy, HH:mm",
    { locale: es }
  );
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">¡Turno exitoso!</h1>
        <p className="mt-4 text-gray-600">
          Tu turno ha sido registrado exitosamente.
        </p>
        <p className="mt-2 text-gray-600">
          Gracias por confiar en nosotros. Te esperamos en la fecha y hora
          acordada.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Volver al inicio
        </Link>
        <Link
          href={`/clientes/${userId}/nuevo-turno`}
          className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Solicitar otro turno
        </Link>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">
            Detalles del turno
          </h2>
          <div className="mt-4 text-left">
            <p>
              <span className="font-bold">Profesional:</span>{" "}
              {profesional?.name}
            </p>
            <p>
              <span className="font-bold">Fecha:</span> {formattedDate}
            </p>
            <p>
              <span className="font-bold">Estado:</span> {turno.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
