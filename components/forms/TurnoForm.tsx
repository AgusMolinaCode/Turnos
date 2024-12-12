"use client";

import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getTurnoFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, NotebookTabs } from "lucide-react";
import { Abogados } from "@/constants";
import { actualizarTurno, crearTurno } from "@/lib/actions/turno.actions";
import { SelectItem } from "../ui/select";

export const TurnoForm = ({
  userId,
  clienteId,
  type = "create",
  turno,
  setOpen,
}: {
  userId: string;
  clienteId: string;
  type: "create" | "cancel" | "schedule";
  turno?: Turno;
  setOpen?: (open: boolean) => void;
  status?: Status;
  cancelationReason?: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const TurnoFormValidation = getTurnoFormValidation(type);

  const form = useForm<z.infer<typeof TurnoFormValidation>>({
    resolver: zodResolver(TurnoFormValidation),
    defaultValues: {
      primaryProfessional: turno?.primaryProfessional || "",
      schedule: turno ? new Date(turno?.schedule!) : new Date(Date.now()),
      description: turno?.description || "",
      notes: turno?.notes || "",
      cancelationReason: turno?.cancelationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof TurnoFormValidation>) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && clienteId) {
        const clienteData = {
          userId,
          cliente: clienteId,
          primaryProfessional: values.primaryProfessional,
          schedule: new Date(values.schedule),
          description: values.description || "",
          notes: values.notes || "",
          status: status as Status,
        };
        const turno = await crearTurno(clienteData);

        if (turno) {
          form.reset();
          router.push(
            `/clientes/${userId}/nuevo-turno/success?turnoId=${turno.$id}`
          );
        }
      } else {
        const turnoToUpdate = {
          userId,
          turnoId: turno?.$id!,
          turno: {
            $id: turno?.$id!,
            userId,
            cliente: turno?.cliente!,
            primaryProfessional: values?.primaryProfessional,
            schedule: new Date(values?.schedule),
            status: status as Status,
            description: values?.description || turno?.description || "",
            cancelationReason: values?.cancelationReason || null,
          },
          type,
        };

        const updateTurno = await actualizarTurno(turnoToUpdate);

        if (updateTurno) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancelar Turno";
      break;
    case "schedule":
      buttonLabel = "Agendar Turno";
      break;
    default:
      buttonLabel = "Pedir Turno";
      break;
  }

  return (
    <Card className="max-w-[640px] mx-auto bg-white/90 dark:bg-black/50 backdrop-blur-md border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl flex items-center gap-2 font-bold text-dark-800">
            <NotebookTabs />{" "}
            {type === "create"
              ? "Crear Turno"
              : type === "cancel"
              ? "Cancelar Turno"
              : "Agendar Turno"}
          </h2>
          <p className="text-gray-500 font-normal mt-3">
            Completa todos los datos para{" "}
            {type === "create"
              ? "crear"
              : type === "cancel"
              ? "cancelar"
              : "agendar"}{" "}
            tu turno
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            {type === "create" && (
              <section className="mb-12 space-y-4">
                <h1 className="header">Nuevo Turno</h1>
                <p className="text-dark-700">
                  Solicita un nuevo turno en 10 segundos.
                </p>
              </section>
            )}
            {type !== "cancel" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="primaryProfessional"
                  label="Profesional"
                  placeholder="Selecciona un profesional"
                >
                  {Abogados.map((abogado, i) => (
                    <SelectItem key={abogado.name + i} value={abogado.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={abogado.image}
                          width={32}
                          height={32}
                          alt="abogado"
                          className="rounded-full border border-dark-500"
                        />
                        <p>{abogado.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Fecha y Hora"
                  icon={Calendar}
                  iconAlt="calendar"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  label="Razón para el turno"
                  icon={NotebookTabs}
                  iconAlt="notebook"
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Notas"
                  icon={NotebookTabs}
                  iconAlt="notebook"
                />
              </div>
            )}

            {type === "cancel" && (
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancelationReason"
                label="Motivo de cancelación"
                icon={NotebookTabs}
                iconAlt="notebook"
              />
            )}

            <SubmitButton
              isLoading={isLoading}
              className={`${
                type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
              } w-full`}
            >
              {buttonLabel}
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
